import express, { NextFunction, Request, Response } from "express";
import * as emailLogic from "../Logic/eMailLogic";

const router = express.Router();
router.get(
  "/test",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await emailLogic.sendTestLead());
  }
);
router.get(
  "/sendPasswordLinkToCoach",
  async (request: Request, response: Response, next: NextFunction) => {
    const data = request.query;
    console.log(data);
    response.status(200).json(await emailLogic.sendEmailToNewCoach(data));
  }
);

export default router;
