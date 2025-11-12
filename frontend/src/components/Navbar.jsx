import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static" color="primary" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              letterSpacing: 0.5,
            }}
          >
            Lingua - Hub
          </Typography>
        </Box>

        {/* Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Početna
          </Button>
          <Button color="inherit" component={Link} to="/search">
            Pronađi učitelja
          </Button>
          <Button color="inherit" component={Link} to="/about">
            O nama
          </Button>
        </Box>

        {/* Login / Register */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button color="inherit" component={Link} to="/login">
            Prijava
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/register"
          >
            Registracija
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
