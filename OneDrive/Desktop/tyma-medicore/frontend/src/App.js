import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import DataInputForm from './components/DataInputForm';
import DataUpload from './components/DataUpload';
import PredictionPanel from './components/PredictionPanel';
import OutbreakMap from './components/OutbreakMap';
import RiskChart from './components/RiskChart';
import axios from 'axios';
import { io } from 'socket.io-client';
import NotificationCenter from './components/NotificationCenter';

// Configure axios base URL
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const SOCKET_URL = process.env.REACT_APP_API_URL;

const App = ({ mode, setMode }) => {
  const [healthData, setHealthData] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastHighRisk, setLastHighRisk] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [notifications, setNotifications] = useState([]);

  // Real-time Socket.IO connection
  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on('healthdata:new', (data) => {
      setHealthData(prev => [data, ...prev]);
      setNotifications(prev => [
        { message: `New health data: ${data.disease} in ${data.location} (${data.cases} cases)`, type: 'info' },
        ...prev
      ]);
    });
    socket.on('prediction:update', (data) => {
      setPredictions(data.predictions || []);
      // High-risk notification logic
      const newHighRisks = (data.predictions || []).filter(p => p.risk === 'High');
      const newOnes = newHighRisks.filter(
        p => !lastHighRisk.some(lr => lr.disease === p.disease && lr.location === p.location)
      );
      if (newOnes.length > 0) {
        setSnackbar({
          open: true,
          message: `High-risk outbreak: ${newOnes.map(n => `${n.disease} in ${n.location}`).join(', ')}`
        });
        setNotifications(prev => [
          { message: `High-risk outbreak: ${newOnes.map(n => `${n.disease} in ${n.location}`).join(', ')}`, type: 'error' },
          ...prev
        ]);
      }
      setLastHighRisk(newHighRisks);
    });
    return () => socket.disconnect();
    // eslint-disable-next-line
  }, [lastHighRisk]);

  const fetchHealthData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/healthdata`);
    setHealthData(res.data);
  };

  const fetchPredictions = async () => {
    setLoading(true);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/healthdata/predict`);
    const preds = res.data.predictions || [];
    setPredictions(preds);
    const newHighRisks = preds.filter(p => p.risk === 'High');
    const newOnes = newHighRisks.filter(
      p => !lastHighRisk.some(lr => lr.disease === p.disease && lr.location === p.location)
    );
    if (newOnes.length > 0) {
      setSnackbar({
        open: true,
        message: `High-risk outbreak: ${newOnes.map(n => `${n.disease} in ${n.location}`).join(', ')}`
      });
    }
    setLastHighRisk(newHighRisks);
    setLoading(false);
  };

  useEffect(() => {
    fetchHealthData();
    fetchPredictions();
    // eslint-disable-next-line
  }, []);

  const handleDataAdded = () => {
    fetchHealthData();
    fetchPredictions();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <Navbar>
        <ThemeToggle mode={mode} setMode={setMode} />
      </Navbar>
      <NotificationCenter notifications={notifications} onDismiss={idx => setNotifications(n => n.filter((_, i) => i !== idx))} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <DataInputForm onDataAdded={handleDataAdded} />
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <DataUpload onDataAdded={handleDataAdded} />
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <PredictionPanel predictions={predictions} loading={loading} />
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <OutbreakMap healthData={healthData} predictions={predictions} />
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4">
              <RiskChart healthData={healthData} predictions={predictions} />
            </div>
          </div>
        </div>
        {snackbar.open && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-red-600 text-white px-6 py-3 rounded shadow-lg animate-bounce">
              {snackbar.message}
              <button className="ml-4 text-white font-bold" onClick={() => setSnackbar({ ...snackbar, open: false })}>×</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App; 