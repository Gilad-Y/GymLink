import User from "../Models/user";
import Column from "../Models/column";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Assuming you are using bcrypt for password hashing

// User CRUD operations
// User CRUD operations
export const createUser = async (userData: any) => {
  // Check if a user with the same email already exists
  const existingUser = await User.findOne({ email: userData.email }).exec();
  if (existingUser) {
    return { error: "User with the same email already exists" };
  }
  const user = new User(userData);
  user.password = userData._password;

  if (userData._id) {
    user._id = userData._id; // Use the provided _id if it exists
  }

  if (userData.role === "coach") {
    const coach = await user.save();
    await User.findByIdAndUpdate(
      userData.belongsTo,
      { $push: { coaches: coach._id } },
      { new: true }
    ).exec();
    return coach._id;
  }

  const newUser = await user.save();
  return newUser._id;
};

export const getUserById = async (userId: string) => {
  return await User.findById(userId).populate("coaches").exec();
};

export const updateUserById = async (userId: string, updateData: any) => {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10); // Hash the password if it's being updated
  }
  // const user = {
  //   email: updateData.email,
  //   firstName: updateData.firstName,
  //   lastName: updateData.lastName,
  //   password: updateData.password,
  //   role: updateData.role,
  //   belongsTo: updateData.belongsTo,
  //   coaches: updateData.coaches,
  //   trainees: updateData.trainees,
  // };
  console.log("Updating user with data:", updateData);
  const id = new mongoose.Types.ObjectId(userId);
  return await User.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

export const deleteUserById = async (userId: string) => {
  const id = new mongoose.Types.ObjectId(userId);
  return await User.findByIdAndDelete(id).exec();
};

// Login logic
export const loginUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      throw new Error("Invalid email");
    }

    const isMatch =
      !!user.password && (await bcrypt.compare(password, user.password));
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
  // const coach = new User(coachData);
  // coach.belongsTo = new mongoose.Types.ObjectId(userId);
  // await coach.save();
  // return await User.findByIdAndUpdate(
  //   userId,
  //   { $push: { coaches: coach._id } },
  //   { new: true }
  // ).exec();
  return new mongoose.Types.ObjectId();
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
export const createTrainee = async (traineeData: any) => {
  traineeData.belongsTo = new mongoose.Types.ObjectId(traineeData.belongsTo);
  traineeData._id = new mongoose.Types.ObjectId();

  await User.findByIdAndUpdate(traineeData.belongsTo, {
    $push: { trainees: traineeData },
  }).exec();

  return;
};

export const getTraineeById = async (userId: string) => {
  const user = await User.findById(userId).exec();
  return user?.trainees ?? [];
};

export const updateTraineeById = async (userId: string, trainees: any[]) => {
  // Update the entire trainees array for the given user
  const traineeToSave = trainees.map((trainee) => {
    delete trainee.id;
  });

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId }, // Find user by ID
    { $set: { trainees } }, // Replace the entire trainees array
    { new: true, runValidators: true } // Return updated document
  ).exec();

  return updatedUser;
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
  try {
    const id = new mongoose.Types.ObjectId(userId); // Convert userId to ObjectId
    const users = await User.find({ belongsTo: id }).exec(); // Find all users with belongsTo matching the given ID
    return users;
  } catch (error) {
    console.error("Error fetching users by belongsTo:", error);
    return [];
  }
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
