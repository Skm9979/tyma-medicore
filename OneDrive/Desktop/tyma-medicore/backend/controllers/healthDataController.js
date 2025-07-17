const HealthData = require('../models/HealthData');
const axios = require('axios');

// Create new health data entry
exports.createHealthData = async (req, res) => {
  try {
    const healthData = new HealthData(req.body);
    await healthData.save();
    // Emit real-time event
    const io = req.app.get('io');
    io.emit('healthdata:new', healthData);
    res.status(201).json(healthData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all health data
exports.getAllHealthData = async (req, res) => {
  try {
    const data = await HealthData.find().sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get prediction from AI service
exports.getPrediction = async (req, res) => {
  try {
    const data = await HealthData.find();
    const aiRes = await axios.post('http://localhost:5001/predict', { data });
    // Emit real-time event
    const io = req.app.get('io');
    io.emit('prediction:update', aiRes.data);
    res.json(aiRes.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 