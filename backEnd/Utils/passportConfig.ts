import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

// Setup Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you can handle the user information from the Google profile.
      // For now, we just pass it to the done() function.
      // You could also save the user to a database here.
      console.log("Google profile:", profile);
      return done(null, { profile, accessToken });
    }
  )
);

// Serialize user into session
passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});
export { passport };
