import React, { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { login as loginRequest } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginRequest(form);

      // login(user, token)
      login(data.user, data.token);

      navigate("/student");
    } catch (error) {
      console.error("Login error:", error);
      alert("Neuspješna prijava. Provjeri podatke.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Prijava</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Lozinka"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Prijavi se
        </Button>
      </form>
    </Container>
  );
}

export default Login;
