import express from "express";
const router = express.Router();

// FAKE INFO
const teachers = [
  {
    id: "t1",
    name: "Amira Hadžić",
    email: "amira.hadzic@example.com",
    subject: "Njemački jezik",
    experience: 12,
    bio: "Profesorica njemačkog sa dugogodišnjim iskustvom i ljubavlju prema modernim metodama učenja."
  },
  {
    id: "t2",
    name: "Marko Kovač",
    email: "marko.kovac@example.com",
    subject: "Matematika",
    experience: 8,
    bio: "Stručnjak za algebru i geometriju, poznat po jasnom i jednostavnom objašnjavanju kompleksnih tema."
  },
  {
    id: "t3",
    name: "Selma Dedić",
    email: "selma.dedic@example.com",
    subject: "Engleski jezik",
    experience: 5,
    bio: "Mladi profesor koji koristi interaktivne metode i moderne digitalne alate u nastavi."
  }
];

// GET teacher details
router.get("/:id", (req, res) => {
  const teacher = teachers.find(t => t.id === req.params.id);

  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }

  res.json({ teacher });
});

export default router;
