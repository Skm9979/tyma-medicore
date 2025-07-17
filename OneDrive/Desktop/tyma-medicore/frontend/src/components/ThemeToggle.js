import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeToggle = ({ mode, setMode }) => (
  <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
    <IconButton color="inherit" onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  </Tooltip>
);

export default ThemeToggle; 