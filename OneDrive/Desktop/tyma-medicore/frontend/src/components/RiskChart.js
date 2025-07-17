import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Line, LineChart } from 'recharts';

const getRisk = (predictions, disease, location) => {
  const found = predictions.find(p => p.disease === disease && p.location === location);
  return found ? found.risk : 'Low';
};

const riskColor = {
  'High': '#e53935',
  'Low': '#43a047',
};

const RiskChart = ({ healthData, predictions }) => {
  const [filter, setFilter] = useState('');
  // Aggregate by disease/location
  const chartData = healthData
    .filter(entry => !filter || entry.disease === filter)
    .map(entry => ({
      name: `${entry.disease} (${entry.location})`,
      cases: entry.cases,
      risk: getRisk(predictions, entry.disease, entry.location),
      date: entry.date ? new Date(entry.date).toLocaleDateString() : '',
    }));
  const diseases = Array.from(new Set(healthData.map(e => e.disease)));

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center mb-2 gap-2">
        <span className="font-semibold text-gray-700">Filter by disease:</span>
        <select
          className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="">All</option>
          {diseases.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-bold text-blue-700 mb-2">Cases by Disease & Location</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" angle={-20} textAnchor="end" interval={0} height={60} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cases" name="Cases" isAnimationActive label={{ position: 'top' }}>
                {chartData.map((entry, idx) => (
                  <cell key={`cell-${idx}`} fill={riskColor[entry.risk] || '#8884d8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-bold text-blue-700 mb-2">Cases Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData.sort((a, b) => new Date(a.date) - new Date(b.date))}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cases" stroke="#1976d2" strokeWidth={2} dot isAnimationActive />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RiskChart; 