import { Router, Request, Response } from "express";

const botRouter = Router();

botRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello from botRouter!");
});

botRouter.post("/message", (req: Request, res: Response) => {
  const { message } = req.body;
  res.send(`Received message: ${message}`);
});

export default botRouter;
