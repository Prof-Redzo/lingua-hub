import React from "react";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";

export default function AboutPage() {
  return (
    <Container sx={{ mt: 8, mb: 8 }}>
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" component="h1" gutterBottom>
          O nama
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Lingua Hub spaja ljude koji žele učiti i one koji žele podučavati jezike širom svijeta.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom>
              Naša misija
            </Typography>
            <Typography color="text.secondary">
              Naša misija je da učenje jezika učinimo dostupnim svima, bez obzira na mjesto, vrijeme
              ili nivo znanja. Kroz jednostavnu platformu povezujemo učenike i nastavnike koji
              dijele strast prema jezicima i kulturi.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom>
              Kako funkcioniše
            </Typography>
            <Typography color="text.secondary">
              Učenici mogu pronaći učitelje po jeziku, cijeni i rasporedu. Učitelji kreiraju profil,
              postavljaju cijene i dostupnost. Oboje ocjenjuju jedni druge nakon časa, čime zajednica
              postaje pouzdana i motivisana za napredak.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box mt={6} textAlign="center">
        <Typography variant="h5" gutterBottom>
          Zajedno učimo. Zajedno rastemo. 🌍
        </Typography>
      </Box>
    </Container>
  );
}
