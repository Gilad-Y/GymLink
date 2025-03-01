import express from "express";
import dotenv from "dotenv";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    tokens: any;
  }
}

const router = express.Router();
dotenv.config();

// Set up the OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.REACT_APP_GOOGLE_CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL
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

console.log("Authorize this app by visiting:", authUrl);

// Function to calculate the start and end of a given month
const getMonthRange = (year: number, month: number) => {
  const startOfMonth = new Date(year, month - 1, 1); // Month is 0-indexed in JavaScript
  const endOfMonth = new Date(year, month, 0); // 0th day gives the last day of the previous month

  return {
    startOfMonth: startOfMonth.toISOString(),
    endOfMonth: endOfMonth.toISOString(),
  };
};

// Route to handle Google OAuth callback and fetch the token
router.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code as string;

  try {
    // Get the access token using the code
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Save the token in session or database (you can store tokens for future use)
    req.session.tokens = tokens;
    req.session.save(() => {
      // Redirect to some page or show a success message
      res.redirect("/calendar");
    });
  } catch (error) {
    console.error("Error during Google OAuth callback:", error);
    res.status(500).send("Authentication failed");
  }
});

// Middleware to verify JWT token
const authenticateJWT = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from the "Bearer <token>" format

  if (!token) {
    return res.status(401).send("No token provided");
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.user = user;
    next();
  });
};

// Route to fetch calendar events for a specific month
router.get("/", authenticateJWT, async (req, res) => {
  // Extract the Authorization header
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // Extract the token from the Authorization header (format: Bearer <token>)
  const token = authHeader.split(" ")[1]; // The token is after "Bearer "

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  } else {
    console.log(token); // Logging token for debugging (optional)
  }

  // If the user is authenticated via session token
  if (!req.session.tokens) {
    return res.status(401).send("User is not authenticated");
  }

  // Set the credentials for oauth2Client using the session tokens
  oauth2Client.setCredentials(req.session.tokens);

  // Check if the access token has expired and refresh it if necessary
  if (req.session.tokens.expiry_date < Date.now()) {
    try {
      // Refresh the access token using the refresh token stored in session
      oauth2Client.setCredentials({
        refresh_token: req.session.tokens.refresh_token,
      });
      const { credentials } = await oauth2Client.refreshAccessToken();
      req.session.tokens = credentials; // Update session with refreshed token
      req.session.save(); // Save the session
    } catch (error) {
      console.error("Error refreshing token:", error);
      return res.status(401).send("Failed to refresh token");
    }
  }

  // If token is still valid, fetch calendar events
  const now = new Date();
  const { startOfMonth, endOfMonth } = getMonthRange(
    now.getFullYear(),
    now.getMonth() + 1
  );

  try {
    const calendar = google.calendar("v3");
    const response = await calendar.events.list({
      calendarId: "primary",
      auth: oauth2Client,
      timeMin: startOfMonth,
      timeMax: endOfMonth,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Error retrieving events");
  }
});

// Route to initiate Google login flow
router.get("/auth/google", (req, res) => {
  res.redirect(authUrl); // Redirect the user to Google for authentication
});

export default router;
