import express from "express";
import TeacherProfile from "../models/TeacherProfile.js";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

/**
 * GET /api/teachers
 */
router.get("/", async (req, res) => {
  try {
    const teachers = await TeacherProfile.find().populate("user", "name email username");
    res.json({ teachers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/teachers/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const teacher = await TeacherProfile.findById(req.params.id)
      .populate("user", "name email username");

    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    res.json({ teacher });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/teachers/user/:userId
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const teacher = await TeacherProfile.findOne({ user: req.params.userId })
      .populate("user", "name email username");

    if (!teacher) {
      return res.status(404).json({ message: "Teacher profile not found" });
    }

    res.json({ teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/teachers
 * teacher profile - protected 
 * Body: { languages: [..], bio, hourlyRate, availability }
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { languages = [], bio = "", hourlyRate = 0, availability = [] } = req.body;

    // check if profile already exists
    const existing = await TeacherProfile.findOne({ user: userId });
    if (existing) return res.status(400).json({ message: "Profile already exists" });

    const profile = new TeacherProfile({
      user: userId,
      languages,
      bio,
      hourlyRate,
      availability,
    });

    await profile.save();
    res.status(201).json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
