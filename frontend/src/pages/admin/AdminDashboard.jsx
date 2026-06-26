import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('add');
  const [members, setMembers] = useState([]);
  const [expiredMembers, setExpiredMembers] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, expired: 0 });
  const [formData, setFormData] = useState({ email: '', days: 30 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admins/manage');
      return;
    }
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [membersRes, expiredRes, statsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/members'),
        axios.get('http://localhost:5000/api/members/expired'),
        axios.get('http://localhost:5000/api/admin/stats', { headers })
      ]);
      setMembers(membersRes.data);
      setExpiredMembers(expiredRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post('http://localhost:5000/api/members', formData);
      setMessage('✅ Member added successfully!');
      setFormData({ email: '', days: 30 });
      fetchData();
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Error adding member'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (id) => {
    if (!confirm('Are you sure you want to remove this member?')) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      fetchData();
    } catch (err) {
      console.error('Error deleting member:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admins/manage');
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Admin Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 dark:bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">Z</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">ZAFTAN Studios</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Members</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalMembers || 0}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Active Members</div>
            <div className="text-3xl font-bold text-green-600">{stats.activeMembers || 0}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Expired Members</div>
            <div className="text-3xl font-bold text-red-600">{stats.expiredMembers || 0}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('add')}
              className={`flex-1 py-4 px-6 font-medium text-center transition ${
                activeTab === 'add'
                  ? 'text-blue-600 dark:text-red-500 border-b-2 border-blue-600 dark:border-red-500 bg-blue-50 dark:bg-red-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Add Member
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`flex-1 py-4 px-6 font-medium text-center transition ${
                activeTab === 'manage'
                  ? 'text-blue-600 dark:text-red-500 border-b-2 border-blue-600 dark:border-red-500 bg-blue-50 dark:bg-red-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Manage Members ({members.length})
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex-1 py-4 px-6 font-medium text-center transition ${
                activeTab === 'notifications'
                  ? 'text-blue-600 dark:text-red-500 border-b-2 border-blue-600 dark:border-red-500 bg-blue-50 dark:bg-red-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Notifications ({expiredMembers.length})
            </button>
          </div>

          <div className="p-6">
            {/* Add Member Tab */}
            {activeTab === 'add' && (
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Add New Member</h3>
                
                {message && (
                  <div className={`mb-6 p-4 rounded-lg ${
                    message.startsWith('✅') 
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200' 
                      : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200'
                  }`}>
                    {message}
                  </div>
                )}

                <form onSubmit={handleAddMember} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Member Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-red-500 outline-none transition"
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration (Days)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="365"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-red-500 outline-none transition"
                      value={formData.days}
                      onChange={(e) => setFormData({...formData, days: parseInt(e.target.value)})}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-red-600 dark:hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition"
                  >
                    {loading ? 'Adding...' : 'Add Member'}
                  </button>
                </form>
              </div>
            )}

            {/* Manage Members Tab */}
            {activeTab === 'manage' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Active Members</h3>
                
                {members.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">No active members</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">#</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Added</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Expires</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {members.map((member) => (
                          <tr key={member._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-4 py-3 text-gray-900 dark:text-white">{member.serialNumber}</td>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{member.email}</td>
                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                              {new Date(member.addedAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                              {new Date(member.expiresAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleDeleteMember(member._id)}
                                className="text-red-600 hover:text-red-700 font-medium text-sm transition"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Expired Members</h3>
                
                {expiredMembers.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">No expired members</p>
                ) : (
                  <div className="space-y-4">
                    {expiredMembers.map((member) => (
                      <div key={member._id} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{member.email}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Expired on {new Date(member.expiresAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium">
                          REMOVE FROM CANVA
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}