import express from "express";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
dotenv.config();

const router = express.Router();
router.post("/", async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  const redirectUrl = "http://localhost:3000";
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUrl
  );
  const authorizedUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/userinfo.profile openid"],
    prompt: "consent",
  });
  res.json({ url: authorizedUrl });
});
export default router;
