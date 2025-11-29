import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Container, Typography, Card, CardContent } from "@mui/material";

export default function TeacherProfile() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    async function fetchTeacher() {
      try {
        const res = await api.get(`/api/teachers/${id}`);
        setTeacher(res.data.teacher);
      } catch (err) {
        console.error("Greška u teacher profilu:", err);
      }
    }

    fetchTeacher();
  }, [id]);

  if (!teacher) return <p>Učitavanje...</p>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {teacher.name}
          </Typography>

          <Typography>Email: {teacher.email}</Typography>
          <Typography>Predmet: {teacher.subject}</Typography>
          <Typography>Iskustvo: {teacher.experience} godina</Typography>

          <Typography sx={{ mt: 2 }}>
            {teacher.bio}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
