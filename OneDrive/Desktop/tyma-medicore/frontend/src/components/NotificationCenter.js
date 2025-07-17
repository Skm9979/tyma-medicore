import React from 'react';

const NotificationCenter = ({ notifications, onDismiss }) => (
  <div className="fixed top-20 right-6 z-50 w-80 max-w-full">
    {notifications.map((n, idx) => (
      <div key={idx} className={`mb-4 p-4 rounded shadow-lg flex items-center justify-between ${n.type === 'error' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
        <span>{n.message}</span>
        <button onClick={() => onDismiss(idx)} className="ml-4 font-bold text-lg">×</button>
      </div>
    ))}
  </div>
);

export default NotificationCenter; 