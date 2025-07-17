import React, { useState } from 'react';
import { Box, Button, Typography, Paper, LinearProgress } from '@mui/material';
import axios from 'axios';

const DataUpload = ({ onDataAdded }) => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setMessage('');
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const text = evt.target.result;
      const lines = text.split('\n').filter(Boolean);
      const headers = lines[0].split(',').map(h => h.trim());
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',').map(cell => cell.trim());
        if (row.length !== headers.length) continue;
        const entry = {};
        headers.forEach((h, idx) => {
          entry[h] = row[idx];
        });
        // Convert fields
        entry.cases = Number(entry.cases);
        if (entry.symptoms) entry.symptoms = entry.symptoms.split(';').map(s => s.trim());
        try {
          await axios.post(`${process.env.REACT_APP_API_URL}/healthdata`, entry);
        } catch {}
      }
      setUploading(false);
      setMessage('Upload complete!');
      onDataAdded();
    };
    reader.readAsText(file);
  };

  return (
    <Paper sx={{ p: 3 }} elevation={2}>
      <Typography variant="subtitle1" fontWeight={700}>Upload CSV Data</Typography>
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ mt: 1 }}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Select CSV File'}
        <input
          type="file"
          accept=".csv"
          hidden
          onChange={handleFile}
        />
      </Button>
      {uploading && <LinearProgress sx={{ mt: 2 }} />}
      {message && <Typography color="success.main" sx={{ mt: 1 }}>{message}</Typography>}
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        CSV columns: date,location,disease,cases,symptoms (symptoms separated by ";")
      </Typography>
    </Paper>
  );
};

export default DataUpload; 