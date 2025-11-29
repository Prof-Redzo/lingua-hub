import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import api from "../services/api";

export default function BookingModal({ open, onClose, teacherProfileId, price }) {
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs().hour(12).minute(0));
  const [duration, setDuration] = useState(60);
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    setLoading(true);
    try {
      const payload = {
        teacherProfile: teacherProfileId,
        date: date.format("YYYY-MM-DD"),
        time: time.format("HH:mm"),
        durationMinutes: duration,
        price: price,
      };
      await api.post("/api/bookings", payload);
      onClose();
      alert("Rezervacija poslana!");
    } catch (err) {
      console.error(err);
      alert("Greška pri rezervaciji.");
    } finally { setLoading(false); }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Rezerviši čas</DialogTitle>
        <DialogContent>
          <DatePicker label="Datum" value={date} onChange={(newVal)=>setDate(newVal)} renderInput={(params)=><TextField {...params} fullWidth sx={{mt:2}} />} />
          <TimePicker label="Vrijeme" value={time} onChange={(newVal)=>setTime(newVal)} renderInput={(params)=><TextField {...params} fullWidth sx={{mt:2}} />} />
          <TextField select label="Trajanje (min)" value={duration} onChange={(e)=>setDuration(Number(e.target.value))} fullWidth sx={{mt:2}}>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={45}>45</MenuItem>
            <MenuItem value={60}>60</MenuItem>
          </TextField>
          <TextField label="Cijena (preporučeno)" value={price ? `€${price}` : ""} fullWidth sx={{mt:2}} InputProps={{ readOnly: true }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Zatvori</Button>
          <Button onClick={handleBook} disabled={loading} variant="contained">Potvrdi rezervaciju</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
