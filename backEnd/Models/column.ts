import mongoose, { Schema } from "mongoose";

const columnSchema = new Schema({
  title: { type: String, required: true },
  dataType: { type: String, required: true },
  data: { type: Schema.Types.Mixed, required: true },
  createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

// Static methods for CRUD operations

// Create a new column
columnSchema.statics.createColumn = async function (columnData: any) {
  const column = new this(columnData);
  return await column.save();
};

// Get a column by ID
columnSchema.statics.getColumnById = async function (
  columnId: mongoose.Types.ObjectId
) {
  return await this.findById(columnId).populate("createdBy").exec();
};

// Update a column by ID
columnSchema.statics.updateColumnById = async function (
  columnId: mongoose.Types.ObjectId,
  updateData: any
) {
  return await this.findByIdAndUpdate(columnId, updateData, {
    new: true,
  }).exec();
};

// Delete a column by ID
columnSchema.statics.deleteColumnById = async function (
  columnId: mongoose.Types.ObjectId
) {
  return await this.findByIdAndDelete(columnId).exec();
};

const Column = mongoose.models.Column || mongoose.model("Column", columnSchema);
export default Column;
