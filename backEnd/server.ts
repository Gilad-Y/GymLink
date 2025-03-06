import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/Config";
import ErrorHandler from "./MiddleWare/route-not-found";
import router from "./Routes/SimpleRouter";
import userRouter from "./Routes/userRouter";
import mongoose from "mongoose";
import dotenv from "dotenv";
import columnRouter from "./Routes/columnRouter";
import authRouter from "./Routes/authRouter";
import calendarRouter from "./Routes/calendarRouter";
import traineeRouter from "./Routes/traineeRouter";
import { passport } from "./Utils/passportConfig"; // Import passport configuration
import session from "express-session";

// Load environment variables from .env file
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

// Create server
const server = express();

// OUR MIDDLEWARE
server.use(bodyParser.urlencoded({ extended: false }));

// CORS = Cross-Origin Resource Sharing
server.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  })
);

// How we send the data back (JSON, XML, RAW, string)
server.use(express.json());

// Where I will save my files from upload
server.use(express.static("upload"));

// Enable file uploading, and create a path for the files if it does not exist
server.use(fileUpload({ createParentPath: true }));

// Session middleware
server.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set secure to true if using HTTPS
  })
);

// Initialize Passport and restore authentication state, if any, from the session.
server.use(passport.initialize());
server.use(passport.session());

// Using routes => localhost:4000/api/v1/test/checkOK
server.use("/api/v1/test", router);
server.use("/api/v1/user", userRouter);
server.use("/api/v1/column", columnRouter);
server.use("/auth", authRouter);
server.use("/api/v1/calendar", calendarRouter); // Add calendar routes
server.use("/api/v1/trainee", traineeRouter);

// Handle errors (Route Not Found)
server.use("*", ErrorHandler);

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let error: Error & { status?: number };

  if (err instanceof Error) {
    error = err;
  } else {
    error = new Error("Unknown error occurred");
  }

  console.error(error.stack || "No stack trace available");

  res.status(error.status || 500).json({
    message: error.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? error : {},
  });
});

// Start the server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(config.webPort, () => {
      console.log(`App is listening on port ${config.webPort}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
