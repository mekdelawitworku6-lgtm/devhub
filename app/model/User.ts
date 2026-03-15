import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);