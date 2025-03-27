import mongoose from "mongoose";

const Schema = mongoose.Schema;

const traineeSchema = new Schema({
  data: { type: Schema.Types.Mixed, required: true },
  belongsTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("trainee", traineeSchema);
export default mongoose.model("trainee", traineeSchema);
