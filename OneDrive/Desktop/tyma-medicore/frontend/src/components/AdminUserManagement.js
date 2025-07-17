import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AdminUserManagement = () => {
  const { user, token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch users');
      }
      setLoading(false);
    };
    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setError('');
    setSuccess('');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/auth/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(u => u._id !== id));
      setSuccess('User deleted successfully.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete user');
    }
  };

  if (!user || user.role !== 'admin') {
    return <div className="p-8 text-center text-red-600 font-bold">Access denied. Admins only.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">User Management</h2>
      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-2">{success}</div>}
      {loading ? (
        <div>Loading users...</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Email Verified</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className={u._id === user.id ? 'bg-gray-100' : ''}>
                <td className="py-2 px-4 border-b">{u.username}</td>
                <td className="py-2 px-4 border-b">{u.email}</td>
                <td className="py-2 px-4 border-b">{u.role}</td>
                <td className="py-2 px-4 border-b">{u.isEmailVerified ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border-b">
                  {u._id !== user.id && (
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  )}
                  {u._id === user.id && <span className="text-gray-400">(You)</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserManagement; 