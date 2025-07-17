import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const symptomOptions = [
  'Fever',
  'Cough',
  'Fatigue',
  'Headache',
  'Sore throat',
  'Shortness of breath',
  'Loss of taste/smell',
  'Muscle aches',
  'Nausea',
  'Diarrhea',
  'Other'
];

const ReportSymptoms = () => {
  const { token } = useAuth();
  const [form, setForm] = useState({
    symptoms: [],
    date: new Date().toISOString().slice(0, 10),
    location: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Auto-detect location
  useEffect(() => {
    if (!form.location) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            // Use a free geocoding API (OpenStreetMap Nominatim)
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await res.json();
            const city = data.address.city || data.address.town || data.address.village || '';
            const country = data.address.country || '';
            setForm((prev) => ({ ...prev, location: [city, country].filter(Boolean).join(', ') }));
          } catch {
            // fallback: just use lat/lon
            setForm((prev) => ({ ...prev, location: `${latitude}, ${longitude}` }));
          }
        });
      }
    }
  }, [form.location]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSymptomChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      symptoms: checked
        ? [...prev.symptoms, value]
        : prev.symptoms.filter((s) => s !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setShowToast(false);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/symptoms`,
        { ...form },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Symptom report submitted successfully!');
      setShowToast(true);
      setForm({ symptoms: [], date: new Date().toISOString().slice(0, 10), location: '', notes: '' });
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit report');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Report Your Symptoms</h2>
      {error && showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-3 rounded shadow-lg animate-bounce">
          {error}
        </div>
      )}
      {success && showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded shadow-lg animate-bounce">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4" aria-label="Report Symptoms Form">
        <div>
          <label className="block font-semibold mb-1" htmlFor="symptoms">Symptoms</label>
          <div className="flex flex-wrap gap-2" id="symptoms">
            {symptomOptions.map((symptom) => (
              <label key={symptom} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={symptom}
                  checked={form.symptoms.includes(symptom)}
                  onChange={handleSymptomChange}
                  className="mr-1"
                  aria-checked={form.symptoms.includes(symptom)}
                  aria-label={symptom}
                />
                {symptom}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1" htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={form.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1" htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            value={form.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="City, Country"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1" htmlFor="notes">Notes (optional)</label>
          <textarea
            name="notes"
            id="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Any additional information..."
            aria-label="Notes"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default ReportSymptoms; 