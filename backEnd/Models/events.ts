import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventsSchema = new Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  title: { type: String, required: true },
  from: { type: Schema.Types.ObjectId, ref: "users", required: true },
  to: { type: Schema.Types.ObjectId, ref: "trainee", required: true },
});

module.exports = mongoose.model("events", eventsSchema);
export default mongoose.model("events", eventsSchema);
