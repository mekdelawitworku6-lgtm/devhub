import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./User";

export interface IPost extends Document {
  title: string;
  content: string;
  author: IUser["_id"];
  createdAt: Date;
}

const PostSchema: Schema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post: Model<IPost> = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;