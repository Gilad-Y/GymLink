import express, { NextFunction, Request, Response } from "express";
import * as columnLogic from "../Logic/columnLogic";
const router = express.Router();
// Column CRUD operations
router.post(
  "/addColumn",
  async (request: Request, response: Response, next: NextFunction) => {
    const column = request.body;
    response.status(201).json(await columnLogic.createColumn(column));
  }
);

router.get(
  "/column/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    response.status(200).json(await columnLogic.getColumnById(id));
  }
);

router.put(
  "/column/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const updateData = request.body;
    response
      .status(200)
      .json(await columnLogic.updateColumnById(id, updateData));
  }
);

router.delete(
  "/column/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    response.status(200).json(await columnLogic.deleteColumnById(id));
  }
);
export default router;
