import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SecurityIcon from "@mui/icons-material/Security";

export default function Home() {
  const [query, setQuery] = useState("");

  const featured = [
    {
      _id: "t1",
      name: "Amira",
      languages: ["Bosnian", "English"],
      hourlyRate: 15,
      bio: "Iskusna učiteljica bosanskog jezika s individualnim pristupom.",
    },
    {
      _id: "t2",
      name: "Mark",
      languages: ["German"],
      hourlyRate: 20,
      bio: "Izvorni govornik njemačkog jezika s 5 godina iskustva.",
    },
  ];

  const filtered = featured.filter(
    (t) =>
      t.languages.join(" ").toLowerCase().includes(query.toLowerCase()) ||
      t.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* HERO SECTION */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: { xs: 8, md: 12 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Uči jezike sa pravim ljudima
          </Typography>
          <Typography variant="h6" color="rgba(255,255,255,0.8)" mb={4}>
            Pronađi učitelje za bosanski, njemački, engleski i više — zakaži sate
            i uči online.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              mb: 3,
              flexWrap: "wrap",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Pretraži po jeziku ili imenu"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                style: { backgroundColor: "white", borderRadius: "6px" },
              }}
              sx={{ width: { xs: "100%", sm: "60%" } }}
            />
            <Button
              variant="contained"
              color="secondary"
              startIcon={<SearchIcon />}
              sx={{ px: 4 }}
            >
              Traži
            </Button>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/search"
              sx={{ mr: 2 }}
            >
              Pronađi učitelja
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/register"
            >
              Postani učitelj
            </Button>
          </Box>
        </Container>
      </Box>

      {/* FEATURES SECTION */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", p: 3 }}>
              <SchoolIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Personalizirano učenje
              </Typography>
              <Typography color="text.secondary">
                Pronađi učitelja koji odgovara tvom nivou i ciljevima.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", p: 3 }}>
              <AccessTimeIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Fleksibilno zakazivanje
              </Typography>
              <Typography color="text.secondary">
                Odaberi vrijeme koje ti odgovara — učitelj prilagođava raspored.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", p: 3 }}>
              <SecurityIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Sigurno plaćanje
              </Typography>
              <Typography color="text.secondary">
                Plaćaj jednostavno i sigurno putem integrisanih servisa.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* FEATURED TEACHERS */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Istaknuti učitelji
        </Typography>

        <Grid container spacing={3}>
          {filtered.map((t) => (
            <Grid item xs={12} md={6} key={t._id}>
              <Card>
                <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    {t.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{t.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Jezici: {t.languages.join(", ")}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      {t.bio}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                  <Typography fontWeight="bold">€{t.hourlyRate}/h</Typography>
                  <Button
                    size="small"
                    component={Link}
                    to={`/teacher/${t._id}`}
                    variant="outlined"
                  >
                    Pogledaj profil
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA FOOTER */}
      <Box sx={{ bgcolor: "#f9f9f9", py: 6, textAlign: "center" }}>
        <Container>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Spreman za početak?
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Registruj se i pronađi svog učitelja već danas.
          </Typography>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/register"
            sx={{ mr: 2 }}
          >
            Stvori račun
          </Button>
          <Button variant="outlined" component={Link} to="/login">
            Prijava
          </Button>
        </Container>
      </Box>
    </>
  );
}
