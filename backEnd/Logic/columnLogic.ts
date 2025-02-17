import mongoose from "mongoose";
import Column from "../Models/column";
import User from "../Models/user";

export const createColumn = async (columnData: any) => {
  console.log("Received columnData:", columnData);

  if (!mongoose.isValidObjectId(columnData.createdBy)) {
    throw new Error("Invalid user ID");
  }

  const existingUser = await User.findById(columnData.createdBy);
  if (!existingUser) {
    throw new Error("User not found");
  }

  const column = new Column({
    title: columnData.title,
    dataType: columnData.dataType,
    createdBy: existingUser._id,
    data: columnData.data ?? null,
  });

  console.log("Column before saving:", column);
  return await column.save();
};

// Get columns by user ID
export const getColumnsByUserId = async (
  userId: string | mongoose.Types.ObjectId
) => {
  userId = new mongoose.Types.ObjectId(userId);
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
