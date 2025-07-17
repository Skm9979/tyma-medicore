const mongoose = require('mongoose');

const HealthDataSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  location: { type: String, required: true },
  disease: { type: String, required: true },
  cases: { type: Number, required: true },
  symptoms: { type: [String], default: [] },
  extra: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.model('HealthData', HealthDataSchema); 