import express from "express";
import Booking from "../models/Booking.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Create booking
router.post("/", authMiddleware, async (req, res) => {
  try {
    const student = req.user.id;
    const { teacherProfile, date, time, durationMinutes = 60, price } = req.body;
    if (!teacherProfile || !date || !time) return res.status(400).json({ message: "Missing fields" });

    const booking = new Booking({ student, teacherProfile, date, time, durationMinutes, price });
    await booking.save();
    res.status(201).json({ booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get bookings for current student
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ student: req.user.id }).populate("teacherProfile");
    res.json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get bookings for teacher (teacher's profile owner)
router.get("/teacher", authMiddleware, async (req, res) => {
  try {
    // we assume req.user.role === "teacher" and have teacherProfile linked by user
    const bookings = await Booking.find().populate("teacherProfile student");
    // optionally filter by teacherProfile.user == req.user.id
    res.json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
