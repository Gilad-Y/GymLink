import express from "express";
import passport from "passport";
import axios from "axios";
import session from "express-session";
import User from "../Models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
declare module "express-session" {
  interface Session {
    tokens: {
      access_token: string; // Store the token as access_token
      refresh_token?: string; // Optional, if you're handling refresh tokens
      expiry_date?: number; // Optional, to track expiry date
    };
  }
}

const router = express.Router();

export const authenticateJWT = (req: any, res: any, next: any) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).send("Authentication required");
  }

  jwt.verify(token, process.env.JWT_SECRET || "", (err: any, user: any) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }

    req.user = user; // Attach the decoded user data to the request object
    next();
  });
};

// Route to start Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // Request access to Google profile and email
  })
);

router.post("/google-login", async (req, res) => {
  try {
    const { token } = req.body;

    // Verify the Google token (You may use google-auth-library)
    const { OAuth2Client } = require("google-auth-library");
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ message: "Invalid Google token" });
    }
    console.log("Google payload:", payload);

    const { sub, email, givenName, familyName } = payload;

    // Check if user already exists
    let user = await User.findOne({ email: email });

    if (!user) {
      // Create new user
      user = new User({
        googleId: sub,
        email: email,
        firstName: givenName,
        lastName: familyName,
        role: "admin",
      });
      await user.save();
    } else {
      // Update existing user with Google ID if not already set
      user.googleId = sub;
      await user.save();
    }

    // Generate JWT token for authentication
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Save the token to session (use access_token to match the type declaration)
    req.session.tokens = { access_token: jwtToken }; // Correct session key
    req.session.save(); // Ensure session is saved

    const { password, ...userWithoutPassword } = user.toObject();
    res.json({ token: jwtToken, user: userWithoutPassword });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Callback route that Google will redirect to after authentication
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to a protected route or home.
    res.redirect("/dashboard"); // Redirect to the dashboard after login
  }
);

// Logout route
router.get("/logout", authenticateJWT, (req: any, res: any) => {
  console.log("Logging out user:", req.user);

  // Perform any actions based on user data
  // For example, you can invalidate the JWT on the client side, if necessary

  res.status(200).send({ message: "Logged out successfully" });
});

export default router;
