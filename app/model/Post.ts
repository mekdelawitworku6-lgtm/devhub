import mongoose, { Schema } from "mongoose";
import "./User"; // ⭐ ensures User model is registered

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);