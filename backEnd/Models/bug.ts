import mongoose, { Schema } from "mongoose";

const bugSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    ref: "user",
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Bug", bugSchema);
export default mongoose.model("Bug", bugSchema);
