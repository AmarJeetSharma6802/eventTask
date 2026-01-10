import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  category: String, // Technology, Design, Business, Workshop
  date: Date,       // IMPORTANT (future events filter)
  location: String,
  image: String,
  sourceUrl: { type: String, unique: true },
});

export default mongoose.models.Event ||
  mongoose.model("Event", eventSchema);
