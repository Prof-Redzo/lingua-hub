import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  teacherProfile: { type: mongoose.Schema.Types.ObjectId, ref: "TeacherProfile", required: true },
  createdAt: { type: Date, default: Date.now },
});

wishlistSchema.index({ user: 1, teacherProfile: 1 }, { unique: true });

export default mongoose.model("Wishlist", wishlistSchema);
