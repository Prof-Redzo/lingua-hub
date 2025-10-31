import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register form data:", form);
    alert("Registracija uspješna! (Ovdje će ići API poziv)");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Registracija
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Kreiraj nalog da bi mogao učiti ili predavati jezik.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Ime i prezime"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Lozinka"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <TextField
            select
            label="Uloga"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <MenuItem value="student">Učenik</MenuItem>
            <MenuItem value="teacher">Učitelj</MenuItem>
          </TextField>

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Registruj se
          </Button>
        </Box>

        <Typography sx={{ mt: 2 }}>
          Već imaš nalog?{" "}
          <a href="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
            Prijavi se
          </a>
        </Typography>
      </Paper>
    </Container>
  );
}
