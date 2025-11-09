import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      setMessage(`Dobrodošli, ${res.user.name}!`);
      setTimeout(() => navigate("/"), 1500); 
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Greška pri registraciji.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom align="center">
        Registracija
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Ime"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          name="password"
          label="Lozinka"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Registruj se
        </Button>
      </Box>
      {message && (
        <Typography sx={{ mt: 2 }} color="text.secondary" align="center">
          {message}
        </Typography>
      )}
    </Container>
  );
}
