import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';

const initialState = {
  date: '',
  location: '',
  disease: '',
  cases: '',
  symptoms: '',
};

const DataInputForm = ({ onDataAdded }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/healthdata`, {
        ...form,
        cases: Number(form.cases),
        symptoms: form.symptoms.split(',').map(s => s.trim()).filter(Boolean),
      });
      setForm(initialState);
      onDataAdded();
    } catch (err) {
      // handle error
    }
    setLoading(false);
  };

  return (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Typography variant="h6" mb={2} fontWeight={700}>Add Health Data</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Disease"
          name="disease"
          value={form.disease}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Cases"
          name="cases"
          type="number"
          value={form.cases}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Symptoms (comma separated)"
          name="symptoms"
          value={form.symptoms}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>
    </Paper>
  );
};

export default DataInputForm; 