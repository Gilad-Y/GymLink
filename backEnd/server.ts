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
import emailRouter from "./Routes/eMailRouter";
import { passport } from "./Utils/passportConfig"; // Import passport configuration
import session from "express-session";
import path from "path";
import MongoStore from "connect-mongo";
import botRouter from "./Routes/botRouter";
import eventsRouter from "./Routes/eventsRouter";

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
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

// How we send the data back (JSON, XML, RAW, string)
server.use(express.json());

// Where I will save my files from upload
server.use(express.static("upload"));
server.use("/upload", express.static(path.join(__dirname, "upload")));
// Enable file uploading, and create a path for the files if it does not exist
server.use(fileUpload({ createParentPath: true }));

// File upload route
server.post("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const userId = req.body.userId;
  const folderType = req.body.folderType; // 'profile' or 'brand'

  if (
    !userId ||
    !folderType ||
    (folderType !== "profile" && folderType !== "brand")
  ) {
    return res.status(400).send("Invalid userId or folderType.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.file as fileUpload.UploadedFile;

  // Use the mv() method to place the file somewhere on your server
  const uploadPath = path.join(
    __dirname,
    "upload",
    userId,
    folderType,
    sampleFile.name
  );

  sampleFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send("File uploaded!");
  });
});

// Session middleware
server.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: { secure: false }, // Set to true in production with HTTPS
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
server.use("/api/v1/email", emailRouter);
server.use("/api/v1/bot", botRouter);
server.use("/api/v1/events", eventsRouter);

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
