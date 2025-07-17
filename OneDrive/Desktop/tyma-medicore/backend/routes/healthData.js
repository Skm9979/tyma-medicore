const express = require('express');
const router = express.Router();
const healthDataController = require('../controllers/healthDataController');

// POST /api/healthdata - create new entry
router.post('/', healthDataController.createHealthData);

// GET /api/healthdata - get all entries
router.get('/', healthDataController.getAllHealthData);

// GET /api/healthdata/predict - get AI prediction
router.get('/predict', healthDataController.getPrediction);

module.exports = router; 