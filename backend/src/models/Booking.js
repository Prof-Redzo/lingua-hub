import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  teacherProfile: { type: mongoose.Schema.Types.ObjectId, ref: "TeacherProfile", required: true },
  date: { type: String, required: true }, // ISO date e.g. "2025-12-01"
  time: { type: String, required: true }, // "14:30"
  durationMinutes: { type: Number, default: 60 },
  price: Number,
  status: { type: String, enum: ["pending","confirmed","cancelled","completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
