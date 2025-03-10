import express, { NextFunction, Request, Response } from "express";
import * as columnLogic from "../Logic/columnLogic";
import Column from "../Models/column";
const router = express.Router();

// Column CRUD operations
router.post(
  "/addColumn",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const column = request.body;
      // console.log("Column data:", column);
      const createdColumnId = await columnLogic.createColumn(column);
      response.status(201).json(createdColumnId);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/user/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.userId;
    response.status(200).json(await columnLogic.getColumnsByUserId(userId));
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
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const updateData = request.body;
    response
      .status(200)
      .json(await columnLogic.updateColumnById(id, updateData));
  }
);

router.delete(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    response.status(200).json(await columnLogic.deleteColumnById(id));
  }
);

export default router;

// Create a new column
export const createColumn = async (columnData: any) => {
  const column = new Column(columnData);
  return await column.save();
};

// Get columns by user ID
export const getColumnsByUserId = async (userId: string) => {
  return await Column.find({ createdBy: userId }).populate("createdBy").exec();
};

// Get a column by ID
export const getColumnById = async (columnId: string) => {
  return await Column.findById(columnId).populate("createdBy").exec();
};

// Update a column by ID
export const updateColumnById = async (columnId: string, updateData: any) => {
  return await Column.findByIdAndUpdate(columnId, updateData, {
    new: true,
  }).exec();
};

// Delete a column by ID
export const deleteColumnById = async (columnId: string) => {
  return await Column.findByIdAndDelete(columnId).exec();
};
