import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Countdown component that updates every second
function CountdownCell({ expiresAt }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const expiry = new Date(expiresAt);
      const diff = expiry - now;

      if (diff <= 0) {
        return 'Expired';
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
      timeLeft === 'Expired' 
        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    }`}>
      {timeLeft}
    </span>
  );
}

export default function Home() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ active: 0, total: 500 });

  useEffect(() => {
    fetchMembers();
    
    // Socket.io for real-time updates
    import('../utils/socket.js').then(({ socket }) => {
      socket.on('member:added', (newMember) => {
        setMembers(prev => [...prev, newMember]);
        setStats(prev => ({ ...prev, active: prev.active + 1 }));
      });

      socket.on('member:removed', ({ id }) => {
        setMembers(prev => prev.filter(m => m._id !== id));
        setStats(prev => ({ ...prev, active: prev.active - 1 }));
      });
    });

    const interval = setInterval(fetchMembers, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/members');
      setMembers(res.data);
      setStats(prev => ({ ...prev, active: res.data.length }));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching members:', err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 dark:from-gray-900 dark:via-red-950 dark:to-black text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            ZAFTAN Studios <span className="text-blue-200 dark:text-red-400">Canva Pro</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Get Canva Pro access at an unbeatable price. Join our team and unlock premium features today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-red-600 dark:text-white dark:hover:bg-red-700 font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-lg transition backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple Pricing
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No hidden fees, cancel anytime
            </p>
          </div>
          
          <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="bg-blue-600 dark:bg-red-600 text-white py-6 text-center">
              <h3 className="text-2xl font-bold">Canva Pro Access</h3>
              <p className="text-blue-100 dark:text-red-100">1 Month Membership</p>
            </div>
            <div className="p-8">
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">₹50</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-2">✓</span> Full Canva Pro Features
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-2">✓</span> 1 Month Access
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-2">✓</span> Team Collaboration
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mr-2">✓</span> Premium Templates
                </li>
              </ul>
              <Link
                to="/contact"
                className="block w-full bg-blue-600 hover:bg-blue-700 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg text-center transition"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Slot Counter */}
      <section className="py-12 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Available Slots
          </h2>
          <div className="inline-flex items-center gap-4 bg-gray-100 dark:bg-gray-800 rounded-full px-8 py-4">
            <div className="text-4xl font-bold text-blue-600 dark:text-red-600">
              {stats.active}/{stats.total}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              slots filled
            </div>
          </div>
          <div className="mt-4 w-full max-w-md mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-600 dark:bg-red-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${(stats.active / stats.total) * 100}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Members Table */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Active Members
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-red-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading members...</p>
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg shadow">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No active members yet</p>
              <p className="text-gray-400 dark:text-gray-500 mt-2">Be the first to join!</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">#</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Time Remaining</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {members.map((member) => (
                      <tr key={member._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                        <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                          {member.serialNumber}
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {member.email}
                        </td>
                        <td className="px-6 py-4">
                          <CountdownCell expiresAt={member.expiresAt} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {members.map((member) => (
                  <div key={member._id} className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">#{member.serialNumber}</span>
                      <CountdownCell expiresAt={member.expiresAt} />
                    </div>
                    <div className="text-gray-900 dark:text-white font-medium break-all">
                      {member.email}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}