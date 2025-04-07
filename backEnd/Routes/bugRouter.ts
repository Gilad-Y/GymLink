import express from "express";
import * as bugLogic from "../Logic/bugLogic";
const router = express.Router();
router.post("/upload", async (req, res) => {
  const bug = req.body;
  const response = await bugLogic.uploadBug(bug);
  res.status(200).json(response);
});
export default router;
