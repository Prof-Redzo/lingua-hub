import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form data:", form);
    alert("Prijava uspješna! (Ovdje će ići API poziv)");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Prijava
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Prijavi se na svoj LingoConnect nalog.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Prijavi se
          </Button>
        </Box>

        <Typography sx={{ mt: 2 }}>
          Nemaš nalog?{" "}
          <a href="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
            Registruj se
          </a>
        </Typography>
      </Paper>
    </Container>
  );
}
