import mongoose from "mongoose";

const teacherProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  languages: [{ type: String }],
  bio: String,
  hourlyRate: Number,
  availability: [
    {
      day: String,
      from: String,
      to: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("TeacherProfile", teacherProfileSchema);
