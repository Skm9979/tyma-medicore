const mongoose = require('mongoose');

const SymptomReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symptoms: { type: [String], required: true },
  date: { type: Date, default: Date.now },
  location: { type: String, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SymptomReport', SymptomReportSchema); 