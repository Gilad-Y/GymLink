import User from "../Models/userModal";
import Column from "../Models/column";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Assuming you are using bcrypt for password hashing

// User CRUD operations
export const createUser = async (userData: any) => {
  // Check if a user with the same email already exists
  const existingUser = await User.findOne({ email: userData.email }).exec();
  if (existingUser) {
    throw new Error("Email is already in use");
  }

  const user = new User(userData);
  user.password = await bcrypt.hash(user.password, 10); // Hash the password before saving
  return await user.save();
};

export const getUserById = async (userId: string) => {
  return await User.findById(userId).populate("coaches").exec();
};

export const updateUserById = async (userId: string, updateData: any) => {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10); // Hash the password if it's being updated
  }
  return await User.findByIdAndUpdate(userId, updateData, { new: true }).exec();
};

export const deleteUserById = async (userId: string) => {
  return await User.findByIdAndDelete(userId).exec();
};

// Login logic
export const loginUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      throw new Error("Invalid email");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Re-throw the original error for proper handling
  }
};

// Coach CRUD operations
export const createCoach = async (userId: string, coachData: any) => {
  const coach = new User(coachData);
  coach.belongsTo = new mongoose.Types.ObjectId(userId);
  await coach.save();
  return await User.findByIdAndUpdate(
    userId,
    { $push: { coaches: coach._id } },
    { new: true }
  ).exec();
};

export const getCoachById = async (coachId: string) => {
  return await User.findById(coachId).exec();
};

export const updateCoachById = async (coachId: string, updateData: any) => {
  return await User.findByIdAndUpdate(coachId, updateData, {
    new: true,
  }).exec();
};

export const deleteCoachById = async (coachId: string) => {
  const coach = await User.findById(coachId).exec();
  if (coach) {
    await User.findByIdAndUpdate(coach.belongsTo, {
      $pull: { coaches: coachId },
    }).exec();
    return await User.findByIdAndDelete(coachId).exec();
  }
  return null;
};

// Trainee CRUD operations
export const createTrainee = async (userId: string, traineeData: any) => {
  const trainee = new User(traineeData);
  trainee.belongsTo = new mongoose.Types.ObjectId(userId);
  await trainee.save();
  return await User.findByIdAndUpdate(
    userId,
    { $set: { [`trainees.${trainee._id}`]: traineeData } },
    { new: true }
  ).exec();
};

export const getTraineeById = async (userId: string, traineeId: string) => {
  const user = await User.findById(userId).exec();
  return user?.trainees?.get(traineeId.toString());
};

export const updateTraineeById = async (
  userId: string,
  traineeId: string,
  updateData: any
) => {
  return await User.findByIdAndUpdate(
    userId,
    { $set: { [`trainees.${traineeId}`]: updateData } },
    { new: true }
  ).exec();
};

export const deleteTraineeById = async (userId: string, traineeId: string) => {
  return await User.findByIdAndUpdate(
    userId,
    { $unset: { [`trainees.${traineeId}`]: "" } },
    { new: true }
  ).exec();
};

// Get all trainees of a user
export const getAllTrainees = async (userId: string) => {
  const user = await User.findById(userId).exec();
  return user && user.trainees ? Array.from(user.trainees.values()) : [];
};

// Get all trainees of a user's coach
export const getAllTraineesOfCoach = async (userId: string) => {
  const user = await User.findById(userId).populate("coaches").exec();
  if (user && user.coaches.length > 0) {
    const coachId = mongoose.isValidObjectId(user.coaches[0])
      ? user.coaches[0]
      : (user.coaches[0] as any)._id;
    const coach = await User.findById(coachId).exec();
    return coach && coach.trainees ? Array.from(coach.trainees.values()) : [];
  }
  return [];
};

// Get all coaches of a user
export const getAllCoaches = async (userId: string) => {
  const user = await User.findById(userId).populate("coaches").exec();
  return user ? user.coaches : [];
};

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
