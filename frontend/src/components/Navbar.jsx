import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);

    navigate("/");
  };

  return (
    <AppBar position="static" color="primary" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo */}
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

          <Button color="inherit" component={Link} to="/teachers">
            Pronađi učitelja
          </Button>

          <Button color="inherit" component={Link} to="/about">
            O nama
          </Button>

          {user && (
            <Button color="inherit" component={Link} to="/student">
              Moj panel
            </Button>
          )}
        </Box>

        {/* Right side – login / logout */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {!user ? (
            <>
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
            </>
          ) : (
            <>
              <Typography sx={{ fontSize: 14, mr: 1 }}>
                Prijavljen: <strong>{user.name}</strong>
              </Typography>

              <Button variant="outlined" color="inherit" onClick={handleLogout}>
                Odjava
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
