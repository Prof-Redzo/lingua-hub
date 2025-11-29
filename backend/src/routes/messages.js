import express from "express";
import Message from "../models/Message.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// POST /api/messages
router.post("/", authMiddleware, async (req, res) => {
  try {
    const from = req.user.id;
    const { toTeacher, subject, content } = req.body;
    if (!toTeacher || !content) return res.status(400).json({ message: "Missing fields" });

    const message = new Message({ from, toTeacher, subject, content });
    await message.save();
    res.status(201).json({ message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
