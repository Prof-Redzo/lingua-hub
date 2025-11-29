import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import api from "../services/api";

export default function ContactModal({ open, onClose, teacherProfileId }) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!content) return;
    setLoading(true);
    try {
      await api.post("/api/messages", { toTeacher: teacherProfileId, subject, content });
      setSubject(""); setContent("");
      onClose();
      alert("Poruka poslana!");
    } catch (err) {
      console.error(err);
      alert("Greška pri slanju poruke.");
    } finally { setLoading(false); }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Pošalji poruku učitelju</DialogTitle>
      <DialogContent>
        <TextField label="Naslov" fullWidth margin="normal" value={subject} onChange={(e)=>setSubject(e.target.value)} />
        <TextField label="Poruka" fullWidth multiline rows={4} margin="normal" value={content} onChange={(e)=>setContent(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zatvori</Button>
        <Button onClick={handleSend} disabled={loading} variant="contained">Pošalji</Button>
      </DialogActions>
    </Dialog>
  );
}
