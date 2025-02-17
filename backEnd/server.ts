import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/Config";
import ErrorHandler from "./MiddleWare/route-not-found";
import router from "./Routes/SimpleRouter";
import userRouter from "./Routes/userRouter";
import missionRouter from "./Routes/missionRouter";
import mongoose from "mongoose";

const MONGO_URI =
  

// Create server
const server = express();

// OUR MIDDLEWARE
server.use(bodyParser.urlencoded({ extended: false }));

// CORS = Cross-Origin Resource Sharing
server.use(cors());

// How we send the data back (JSON, XML, RAW, string)
server.use(express.json());

// Where I will save my files from upload
server.use(express.static("upload"));

// Enable file uploading, and create a path for the files if it does not exist
server.use(fileUpload({ createParentPath: true }));

// Using routes => localhost:4000/api/v1/test/checkOK
server.use("/api/v1/test", router);
server.use("/api/v1/user", userRouter);
// server.use("/api/v1/mission", missionRouter);

// Handle errors (Route Not Found)
server.use("*", ErrorHandler);

server.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const error =
    err instanceof Error ? err : new Error("Unknown error occurred");

  console.error(error.stack || "No stack trace available");

  res.status((error as any).status || 500).json({
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
      console.log(
        `For testing use the path http://localhost:${config.webPort}/api/v1/test/checkOK`
      );
      console.log(
        `For testing use the path http://localhost:${config.webPort}/api/v1/test/checkBad`
      );
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
