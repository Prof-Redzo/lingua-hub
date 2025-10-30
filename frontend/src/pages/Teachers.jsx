import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Button,
  Box,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Teachers() {
  const [query, setQuery] = React.useState("");

  const teachers = [
    {
      _id: "t1",
      name: "Amira",
      languages: ["Bosanski", "Engleski"],
      hourlyRate: 15,
      bio: "Iskusna učiteljica bosanskog jezika s individualnim pristupom.",
    },
    {
      _id: "t2",
      name: "Mark",
      languages: ["Njemački"],
      hourlyRate: 20,
      bio: "Izvorni govornik njemačkog jezika s 5 godina iskustva.",
    },
    {
      _id: "t3",
      name: "Elena",
      languages: ["Engleski", "Njemački"],
      hourlyRate: 18,
      bio: "Diplomirana profesorica engleskog jezika, predaje i početnicima.",
    },
  ];

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.languages.join(" ").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Pronađi učitelja
      </Typography>

      {/* Search bar */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 4,
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
          sx={{ flex: 1, minWidth: "250px" }}
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

      {/* Teacher cards */}
      <Grid container spacing={3}>
        {filtered.map((t) => (
          <Grid item xs={12} sm={6} md={4} key={t._id}>
            <Card>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main" }}>{t.name[0]}</Avatar>
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
                <Button variant="outlined" color="primary">
                  Kontaktiraj
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filtered.length === 0 && (
        <Typography sx={{ mt: 4 }} color="text.secondary">
          Nema rezultata za pretragu „{query}“.
        </Typography>
      )}
    </Container>
  );
}
