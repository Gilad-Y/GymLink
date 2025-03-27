import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function (this: any) {
      return !this.googleId;
    }, // Works in TS
  },
  googleId: { type: String, unique: true, sparse: true }, // Store Google ID
  role: { type: String, enum: ["admin", "coach"], required: true },
  brand: { type: Schema.Types.Mixed },
  coaches: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
  trainees: [
    {
      type: Object,
      default: [],
    },
  ],
  belongsTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  profile: { type: String },
  stats: [{ type: String, default: ["members", "expiring soon", "expired"] }],
});

// Static methods for CRUD operations

// Create a new user
userSchema.statics.createUser = async function (userData) {
  const user = new this(userData);
  return await user.save();
};

// Get a user by ID
userSchema.statics.getUserById = async function (userId) {
  return await this.findById(userId).populate("coaches").exec();
};

// Update a user by ID
userSchema.statics.updateUserById = async function (userId, updateData) {
  return await this.findByIdAndUpdate(userId, updateData, { new: true }).exec();
};

// Delete a user by ID
userSchema.statics.deleteUserById = async function (userId) {
  return await this.findByIdAndDelete(userId).exec();
};

// Create a new coach
userSchema.statics.createCoach = async function (userId, coachData) {
  const coach = new this(coachData);
  coach.belongsTo = userId;
  await coach.save();
  return await this.findByIdAndUpdate(
    userId,
    { $push: { coaches: coach._id } },
    { new: true }
  ).exec();
};

// Get a coach by ID
userSchema.statics.getCoachById = async function (coachId) {
  return await this.findById(coachId).exec();
};

// Update a coach by ID
userSchema.statics.updateCoachById = async function (coachId, updateData) {
  return await this.findByIdAndUpdate(coachId, updateData, {
    new: true,
  }).exec();
};

// Delete a coach by ID
userSchema.statics.deleteCoachById = async function (coachId) {
  const coach = await this.findById(coachId).exec();
  if (coach) {
    await this.findByIdAndUpdate(coach.belongsTo, {
      $pull: { coaches: coachId },
    }).exec();
    return await this.findByIdAndDelete(coachId).exec();
  }
  return null;
};

// Create a new trainee
userSchema.statics.createTrainee = async function (userId, traineeData) {
  const trainee = new this(traineeData);
  trainee.belongsTo = userId;
  await trainee.save();
  return await this.findByIdAndUpdate(
    userId,
    { $set: { [`trainees.${trainee._id}`]: traineeData } },
    { new: true }
  ).exec();
};

// Get a trainee by ID
userSchema.statics.getTraineeById = async function (userId, traineeId) {
  const user = await this.findById(userId).exec();
  return user?.trainees.get(traineeId.toString());
};

// Update a trainee by ID
userSchema.statics.updateTraineeById = async function (
  userId,
  traineeId,
  updateData
) {
  return await this.findByIdAndUpdate(
    userId,
    { $set: { [`trainees.${traineeId}`]: updateData } },
    { new: true }
  ).exec();
};

// Delete a trainee by ID
userSchema.statics.deleteTraineeById = async function (userId, traineeId) {
  return await this.findByIdAndUpdate(
    userId,
    { $unset: { [`trainees.${traineeId}`]: "" } },
    { new: true }
  ).exec();
};

// Get all trainees of a user
userSchema.statics.getAllTrainees = async function (userId) {
  const user = await this.findById(userId).exec();
  return user ? Array.from(user.trainees.values()) : [];
};

// Get all trainees of a user's coach
userSchema.statics.getAllTraineesOfCoach = async function (userId) {
  const user = await this.findById(userId).populate("coaches").exec();
  if (user && user.coaches.length > 0) {
    const coach = await this.findById(user.coaches[0]._id).exec();
    return coach ? Array.from(coach.trainees.values()) : [];
  }
  return [];
};

// Get all coaches of a user
userSchema.statics.getAllCoaches = async function (userId) {
  const user = await this.findById(userId).populate("coaches").exec();
  return user ? user.coaches : [];
};

module.exports = mongoose.model("User", userSchema);
export default mongoose.model("User", userSchema);
