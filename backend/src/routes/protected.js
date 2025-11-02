import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// test protected
router.get("/me", authMiddleware, async (req, res) => {
  // req.user is from token payload
  const user = await User.findById(req.user.id).select("-password");
  res.json({ user });
});

export default router;
