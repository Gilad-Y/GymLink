import mongoose from "mongoose";

const Schema = mongoose.Schema;

const traineeSchema = new Schema({
  data: { type: Schema.Types.Mixed, required: true },
  belongsTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("trainee", traineeSchema);
export default mongoose.model("trainee", traineeSchema);
