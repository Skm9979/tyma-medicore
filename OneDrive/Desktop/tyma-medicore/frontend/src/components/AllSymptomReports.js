import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AllSymptomReports = () => {
  const { user, token } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError('');
      try {
        // Admins use /api/symptoms, officials use /api/symptoms/all
        const url = user.role === 'official' ? `${process.env.REACT_APP_API_URL}/symptoms/all` : `${process.env.REACT_APP_API_URL}/symptoms`;
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReports(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch reports');
      }
      setLoading(false);
    };
    fetchReports();
  }, [token, user]);

  if (!user || (user.role !== 'admin' && user.role !== 'official')) {
    return <div className="p-8 text-center text-red-600 font-bold">Access denied. Admins/Officials only.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">All Symptom Reports</h2>
      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2">{error}</div>}
      {loading ? (
        <div>Loading reports...</div>
      ) : reports.length === 0 ? (
        <div className="text-gray-600">No reports submitted yet.</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Symptoms</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Notes</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r._id}>
                <td className="py-2 px-4 border-b">{r.user?.username || '-'}</td>
                <td className="py-2 px-4 border-b">{new Date(r.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{r.symptoms.join(', ')}</td>
                <td className="py-2 px-4 border-b">{r.location}</td>
                <td className="py-2 px-4 border-b">{r.notes || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllSymptomReports; 