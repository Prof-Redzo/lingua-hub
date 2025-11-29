import express from "express";
import Wishlist from "../models/Wishlist.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Toggle (add/remove)
router.post("/toggle", authMiddleware, async (req, res) => {
  try {
    const user = req.user.id;
    const { teacherProfile } = req.body;
    if (!teacherProfile) return res.status(400).json({ message: "Missing teacherProfile" });

    const existing = await Wishlist.findOne({ user, teacherProfile });
    if (existing) {
      await existing.deleteOne();
      return res.json({ removed: true });
    } else {
      const item = new Wishlist({ user, teacherProfile });
      await item.save();
      return res.json({ added: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's wishlist
router.get("/", authMiddleware, async (req, res) => {
  try {
    const list = await Wishlist.find({ user: req.user.id }).populate("teacherProfile");
    res.json({ list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
