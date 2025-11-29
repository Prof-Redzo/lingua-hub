// src/server.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import protectedRoutes from "./routes/protected.js";
import teachersRoutes from "./routes/teachers.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import messagesRoutes from "./routes/messages.js";
import bookingsRoutes from "./routes/bookings.js";
import wishlistRoutes from "./routes/wishlist.js";

const app = express();
app.use(cors());
app.use(express.json());

// connect db
await connectDB(process.env.MONGO_URI);

// routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/teachers", teachersRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/wishlist", wishlistRoutes);

// basic root
app.get("/", (req, res) => res.send("Lingua-Hub backend is running"));

// start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
