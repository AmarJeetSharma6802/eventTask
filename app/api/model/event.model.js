import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  category: String, 
  date: Date,       
  location: String,
  image: String,
  sourceUrl: { type: String, unique: true },
});

export default mongoose.models.Event ||
  mongoose.model("Event", eventSchema);
