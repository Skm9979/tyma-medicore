import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const MySymptomReports = () => {
  const { token } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/symptoms/mine`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReports(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch reports');
      }
      setLoading(false);
    };
    fetchReports();
  }, [token]);

  // Prepare data for chart: count of symptoms per day
  const chartData = reports.reduce((acc, r) => {
    const date = new Date(r.date).toLocaleDateString();
    const found = acc.find((item) => item.date === date);
    if (found) {
      found.count += r.symptoms.length;
    } else {
      acc.push({ date, count: r.symptoms.length });
    }
    return acc;
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">My Symptom Reports</h2>
      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2">{error}</div>}
      {loading ? (
        <div>Loading reports...</div>
      ) : reports.length === 0 ? (
        <div className="text-gray-600">No reports submitted yet.</div>
      ) : (
        <>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Symptom Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} label={{ value: 'Symptom Count', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" name="Symptoms" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <table className="min-w-full bg-white rounded shadow overflow-hidden">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Symptoms</th>
                <th className="py-2 px-4 border-b">Location</th>
                <th className="py-2 px-4 border-b">Notes</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r._id}>
                  <td className="py-2 px-4 border-b">{new Date(r.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{r.symptoms.join(', ')}</td>
                  <td className="py-2 px-4 border-b">{r.location}</td>
                  <td className="py-2 px-4 border-b">{r.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MySymptomReports; 