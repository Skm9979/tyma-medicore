import { createTheme } from '@mui/material/styles';
import './index.css';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#1976d2', // Unique blue
    },
    secondary: {
      main: '#ff9800', // Orange
    },
    background: {
      default: mode === 'dark' ? '#181c25' : '#f4f6fa',
      paper: mode === 'dark' ? '#23293a' : '#fff',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial',
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 12,
  },
});

export default getTheme; 