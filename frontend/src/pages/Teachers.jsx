import React, { useState } from "react";
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
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";

// IMPORT MODALS
import ContactModal from "../components/ContactModal";
import BookingModal from "../components/BookingModal";

export default function Teachers() {
  const [query, setQuery] = useState("");

  // -----------------------------
  // MODAL STATES
  // -----------------------------
  const [contactOpen, setContactOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeTeacher, setActiveTeacher] = useState(null);

  // -----------------------------
  // WISHLIST (localStorage)
  // -----------------------------
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlistTeachers");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleWishlist = (id) => {
    let updated;
    if (wishlist.includes(id)) {
      updated = wishlist.filter((t) => t !== id);
    } else {
      updated = [...wishlist, id];
    }
    setWishlist(updated);
    localStorage.setItem("wishlistTeachers", JSON.stringify(updated));
  };

  // -----------------------------
  // FAKE TEACHERS DATA
  // -----------------------------
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

  // -----------------------------
  // SEARCH FILTER
  // -----------------------------
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
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* LEFT SECTION */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                </Box>

                {/* ❤️ Wishlist Button */}
                <IconButton onClick={() => toggleWishlist(t._id)}>
                  {wishlist.includes(t._id) ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </CardContent>

              <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                <Typography fontWeight="bold">€{t.hourlyRate}/h</Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  {/* DETALJI */}
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to={`/teachers/${t._id}`}
                  >
                    Detalji
                  </Button>

                  {/* KONTAKT */}
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setActiveTeacher(t);
                      setContactOpen(true);
                    }}
                  >
                    Kontaktiraj
                  </Button>

                  {/* REZERVACIJA */}
                  <Button
                    variant="contained"
                    onClick={() => {
                      setActiveTeacher(t);
                      setBookingOpen(true);
                    }}
                  >
                    Rezerviši
                  </Button>
                </Box>
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

      {/* -----------------------------
          MODALS
      ----------------------------- */}
      {activeTeacher && (
        <ContactModal
          open={contactOpen}
          onClose={() => setContactOpen(false)}
          teacherProfileId={activeTeacher._id}
        />
      )}

      {activeTeacher && (
        <BookingModal
          open={bookingOpen}
          onClose={() => setBookingOpen(false)}
          teacherProfileId={activeTeacher._id}
          price={activeTeacher.hourlyRate}
        />
      )}
    </Container>
  );
}
