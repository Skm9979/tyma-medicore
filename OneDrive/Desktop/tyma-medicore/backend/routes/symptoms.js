const express = require('express');
const router = express.Router();
const symptomController = require('../controllers/symptomController');
const { authMiddleware, requireRole } = require('./auth');

// User: Submit a symptom report
router.post('/', authMiddleware, symptomController.submitReport);

// User: Get their own reports
router.get('/mine', authMiddleware, symptomController.getMyReports);

// Admin/Official: Get all reports
router.get('/', authMiddleware, requireRole('admin'), symptomController.getAllReports);
router.get('/all', authMiddleware, requireRole('official'), symptomController.getAllReports);

module.exports = router; 