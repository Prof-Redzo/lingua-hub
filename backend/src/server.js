import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import protectedRoutes from "./routes/protected.js";

const app = express();
app.use(cors());
app.use(express.json());

// connect db
await connectDB(process.env.MONGO_URI);

// routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

// basic root
app.get("/", (req, res) => res.send("lingoConnect backend is running"));

// start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
