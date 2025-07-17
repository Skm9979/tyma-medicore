const SymptomReport = require('../models/SymptomReport');

// User: Submit a symptom report
exports.submitReport = async (req, res) => {
  try {
    const { symptoms, date, location, notes } = req.body;
    const report = new SymptomReport({
      user: req.user.id,
      symptoms,
      date: date || Date.now(),
      location,
      notes
    });
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// User: Get their own reports
exports.getMyReports = async (req, res) => {
  try {
    const reports = await SymptomReport.find({ user: req.user.id }).sort({ date: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin/Official: Get all reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await SymptomReport.find().populate('user', 'username email role').sort({ date: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 