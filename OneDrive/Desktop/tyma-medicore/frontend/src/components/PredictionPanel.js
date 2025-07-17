import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, CircularProgress, Box } from '@mui/material';

const PredictionPanel = ({ predictions, loading }) => (
  <Paper sx={{ p: 3 }} elevation={2}>
    <Typography variant="h6" fontWeight={700} mb={2}>AI Outbreak Predictions</Typography>
    {loading ? (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
        <CircularProgress />
      </Box>
    ) : predictions && predictions.length ? (
      <List>
        {predictions.map((pred, idx) => (
          <ListItem key={idx} divider>
            <ListItemText
              primary={`${pred.disease} in ${pred.location}`}
              secondary={`Cases: ${pred.cases} | Risk: ${pred.risk}`}
            />
          </ListItem>
        ))}
      </List>
    ) : (
      <Typography color="text.secondary">No predictions available.</Typography>
    )}
  </Paper>
);

export default PredictionPanel; 