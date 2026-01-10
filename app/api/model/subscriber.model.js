import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  email: String,
  eventUrl: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Subscriber ||
  mongoose.model("Subscriber", subscriberSchema);
