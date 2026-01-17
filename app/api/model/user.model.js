import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    emailOtp: String,
    emailOtpExpires: Date,

    refreshToken: String,
  },
  { timestamps: true }
);

const realForm =
  mongoose.models.realForm ||
  mongoose.model("realForm", userSchema);

export default realForm;
