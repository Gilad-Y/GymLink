import Trainee from "../Models/trainee";

// Function to fetch all trainees
export const getAllTrainees = async (userId: string) => {
  try {
    const trainees = await Trainee.find({ belongsTo: userId }).populate(
      "belongsTo"
    );
    return trainees;
  } catch (error) {
    console.error("Error fetching trainees:", error);
    throw new Error("Error fetching trainees");
  }
};

// Function to add a new trainee
export const addTrainee = async (traineeData: any) => {
  const belongsTo = traineeData.belongsTo;
  delete traineeData.belongsTo;
  const newTraineeToSave = { data: traineeData, belongsTo: belongsTo };

  try {
    const newTrainee = new Trainee(newTraineeToSave);
    await newTrainee.save();
    return newTrainee._id;
  } catch (error) {
    console.error("Error adding trainee:", error);
    throw new Error("Error adding trainee");
  }
};

// Function to edit a trainee
export const editTrainee = async (traineeId: string, updateData: any) => {
  const belongsTo = updateData.belongsTo;
  delete updateData.belongsTo;
  const newTraineeToSave = { data: updateData, belongsTo: belongsTo };

  try {
    const updatedTrainee = await Trainee.findByIdAndUpdate(
      traineeId,
      newTraineeToSave
    );
    return updatedTrainee;
  } catch (error) {
    console.error("Error editing trainee:", error);
    throw new Error("Error editing trainee");
  }
};

// Function to delete a trainee
export const deleteTrainee = async (traineeId: string) => {
  try {
    await Trainee.findByIdAndDelete(traineeId);
  } catch (error) {
    console.error("Error deleting trainee:", error);
    throw new Error("Error deleting trainee");
  }
};
