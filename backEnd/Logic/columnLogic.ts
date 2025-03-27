import mongoose from "mongoose";
import Column from "../Models/column";
import User from "../Models/user";

export const createColumn = async (columnData: any) => {
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
    options: columnData.options ?? [],
    isPrivate: columnData.isPrivate,
    stats: columnData.stats ?? null,
  });

  const savedColumn = await column.save();
  return savedColumn;
};

// Get columns by user ID
export const getColumnsByUserId = async (
  userId: string | mongoose.Types.ObjectId
) => {
  userId = new mongoose.Types.ObjectId(userId);
  const columns = await Column.find({ createdBy: userId })
    .populate("createdBy")
    .exec();

  return columns;
};

// Get a column by ID
export const getColumnById = async (columnId: string) => {
  return await Column.findById(columnId).populate("createdBy").exec();
};

// Update a column by ID
export const updateColumnById = async (columnId: string, updateData: any) => {
  try {
    if (!mongoose.isValidObjectId(columnId)) {
      throw new Error("Invalid column ID");
    }

    const _id = new mongoose.Types.ObjectId(columnId);

    const updatedColumn = await Column.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true }
    );

    return updatedColumn;
  } catch (error) {
    console.error("Error updating column:", error);
    throw error;
  }
};

// Delete a column by ID
export const deleteColumnById = async (columnId: string) => {
  return await Column.findByIdAndDelete(columnId).exec();
};
export const updateUseForColumns = async (userId: string, data: any) => {
  const _id = new mongoose.Types.ObjectId(userId);

  // Remove useFor from all columns created by the user
  await Column.updateMany({ createdBy: _id }, { $unset: { useFor: "" } });

  // Assign useFor to specific columns provided in data prop
  for (const key in data) {
    if (data.hasOwnProperty(key) && data[key] !== "") {
      await Column.findByIdAndUpdate(data[key], { useFor: key }).exec();
    }
  }
  return;
};
export const getPreferences = async (userId: string) => {
  try {
    if (!mongoose.isValidObjectId(userId)) {
      throw new Error("Invalid userId format");
    }

    const _id = new mongoose.Types.ObjectId(userId);

    // Full query
    const columns = await Column.find({
      createdBy: _id,
      useFor: { $exists: true, $ne: "" },
    }).exec();

    return columns;
  } catch (error) {
    console.error("Error fetching preferences:", error);
    throw error;
  }
};
