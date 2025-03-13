import express, { Request, Response, NextFunction } from "express";

// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}
import dotenv from "dotenv";
import { google } from "googleapis";
import jwt from "jsonwebtoken";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    tokens?: {
      access_token: string;
      refresh_token?: string;
      expiry_date?: number;
    };
  }
}

dotenv.config();
const router = express.Router();

// Set up the OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.REACT_APP_GOOGLE_CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL // Ensure this is set in your .env file
);

// Scopes needed for Google Calendar access
const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/calendar.readonly",
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
});

// Function to calculate the start and end of a given month
const getMonthRange = (year: number, month: number) => {
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0);

  return {
    startOfMonth: startOfMonth.toISOString(),
    endOfMonth: endOfMonth.toISOString(),
  };
};

// Middleware to verify JWT token
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log("Authorization Header:", req.headers["authorization"]);
  const token = req.header("Authorization")?.split(" ")[1]; // Get token from Authorization header
  console.log("Token:", token);
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user; // Attach user to request object
    next(); // Continue to next middleware/route handler
  });
};

// Route to handle Google OAuth callback and fetch the token
router.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code as string;

  try {
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.access_token) {
      throw new Error("Access token is missing in response");
    }

    oauth2Client.setCredentials(tokens);

    req.session.tokens = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token ?? undefined, // Convert null to undefined
      expiry_date: tokens.expiry_date ?? undefined, // Convert null to undefined
    };

    req.session.save(() => {
      res.redirect("/calendar");
    });
  } catch (error) {
    console.error("Error during Google OAuth callback:", error);
    res.status(500).send("Authentication failed");
  }
});

// Route to fetch calendar events for a specific month
router.get("/", authenticateJWT, async (req: Request, res: Response) => {
  if (!req.session.tokens) {
    return res.status(401).json({ message: "User is not authenticated" });
  }

  let tokens = req.session.tokens;
  oauth2Client.setCredentials(tokens);

  try {
    // Refresh token if expired
    if (tokens.expiry_date && tokens.expiry_date < Date.now()) {
      if (!tokens.refresh_token) {
        return res.status(401).json({ message: "Refresh token missing" });
      }

      // Refresh token properly
      const { token, res: refreshResponse } =
        await oauth2Client.getAccessToken();

      if (!refreshResponse) {
        return res
          .status(500)
          .json({ message: "Failed to refresh access token" });
      }

      // Update tokens in session
      tokens = {
        access_token: token || tokens.access_token,
        refresh_token: tokens.refresh_token, // Google doesn't return a new refresh token
        expiry_date: refreshResponse.data.expiry_date ?? undefined, // Handle expiry date
      };

      req.session.tokens = tokens;
      req.session.save();
      oauth2Client.setCredentials(tokens);
    }

    const { startOfMonth, endOfMonth } = getMonthRange(
      new Date().getFullYear(),
      new Date().getMonth() + 1
    );

    const calendar = google.calendar("v3");
    const response = await calendar.events.list({
      calendarId: "primary",
      auth: oauth2Client,
      timeMin: startOfMonth,
      timeMax: endOfMonth,
      singleEvents: true,
      orderBy: "startTime",
    });

    res.json(response.data.items || []);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error retrieving events" });
  }
});

// Route to initiate Google login flow
router.get("/auth/google", (req, res) => {
  res.redirect(authUrl);
});

export default router;
