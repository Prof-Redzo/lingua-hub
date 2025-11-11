import React from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user")); 

  return (
    <Container sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Dobrodošao, {user?.name || "učenik"}! 👋
          </Typography>
          <Typography>
            Ovo je tvoj panel učenika. Ovdje ćeš moći vidjeti učitelje, termine i svoje lekcije.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default StudentDashboard;
