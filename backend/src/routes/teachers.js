import express from "express";

const router = express.Router();

const teachers = [
  {
    _id: "t1",
    name: "Amira",
    email: "amira@example.com",
    subject: "Bosanski & Engleski",
    experience: 7,
    bio: "Iskusna učiteljica bosanskog jezika s individualnim pristupom.",
    languages: ["Bosanski", "Engleski"],
    hourlyRate: 15
  },
  {
    _id: "t2",
    name: "Mark",
    email: "mark@example.com",
    subject: "Njemački",
    experience: 5,
    bio: "Izvorni govornik njemačkog jezika s 5 godina iskustva.",
    languages: ["Njemački"],
    hourlyRate: 20
  },
  {
    _id: "t3",
    name: "Elena",
    email: "elena@example.com",
    subject: "Engleski & Njemački",
    experience: 4,
    bio: "Diplomirana profesorica engleskog jezika, predaje i početnicima.",
    languages: ["Engleski", "Njemački"],
    hourlyRate: 18
  },
];

// GET /api/teachers/:id
router.get("/:id", (req, res) => {
  const teacher = teachers.find((t) => t._id === req.params.id);

  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }

  res.json({ teacher });
});

export default router;
