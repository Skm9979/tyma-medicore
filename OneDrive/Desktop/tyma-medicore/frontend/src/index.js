import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import getTheme from './theme';
import { AuthProvider, useAuth } from './components/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProtectedRoute from './components/ProtectedRoute';
import EmailVerification from './components/EmailVerification';
import Homepage from './Homepage';
import './index.css';
import './i18n';
import AdminUserManagement from './components/AdminUserManagement';
import ReportSymptoms from './components/ReportSymptoms';
import MySymptomReports from './components/MySymptomReports';
import AllSymptomReports from './components/AllSymptomReports';

const Root = () => {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<AuthRedirect><LoginForm onSuccess={() => window.location.href = '/dashboard'} /></AuthRedirect>} />
            <Route path="/register" element={<AuthRedirect><RegisterForm onSuccess={() => window.location.href = '/dashboard'} /></AuthRedirect>} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/admin/users" element={<ProtectedRoute><AdminUserManagement /></ProtectedRoute>} />
            <Route path="/report-symptoms" element={<ProtectedRoute><ReportSymptoms /></ProtectedRoute>} />
            <Route path="/my-symptoms" element={<ProtectedRoute><MySymptomReports /></ProtectedRoute>} />
            <Route path="/all-symptoms" element={<ProtectedRoute><AllSymptomReports /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><App mode={mode} setMode={setMode} /></ProtectedRoute>} />
            <Route path="/" element={<HomeOrDashboard mode={mode} setMode={setMode} />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

function AuthRedirect({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

function HomeOrDashboard({ mode, setMode }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return <Homepage mode={mode} setMode={setMode} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
); 