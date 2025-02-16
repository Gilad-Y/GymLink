import Column from "../Models/column";

// Column CRUD operations
export const createColumn = async (columnData: any) => {
  const column = new Column(columnData);
  return await column.save();
};

export const getColumnById = async (columnId: string) => {
  return await Column.findById(columnId).populate("createdBy").exec();
};

export const updateColumnById = async (columnId: string, updateData: any) => {
  return await Column.findByIdAndUpdate(columnId, updateData, {
    new: true,
  }).exec();
};

export const deleteColumnById = async (columnId: string) => {
  return await Column.findByIdAndDelete(columnId).exec();
};
