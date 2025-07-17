import React from 'react';
import { useAuth } from './AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = ({ children }) => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };
  return (
    <nav className="sticky top-0 z-40 bg-white shadow-md py-3 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">AI</div>
        <span className="text-2xl font-extrabold text-blue-700 tracking-wide">Disease Control Dashboard</span>
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <a href="/report-symptoms" className="text-blue-600 hover:underline font-semibold">Report Symptoms</a>
        <a href="/my-symptoms" className="text-blue-600 hover:underline font-semibold">My Reports</a>
        {user && (user.role === 'admin' || user.role === 'official') && (
          <a href="/all-symptoms" className="text-blue-600 hover:underline font-semibold">All Reports</a>
        )}
        {children}
        {user && (
          <div className="flex items-center space-x-2">
            <span className="text-blue-700 font-semibold">{user.username}</span>
            <button onClick={handleLogout} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold transition">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 