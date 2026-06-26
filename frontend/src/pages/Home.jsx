// ============================================================
// FILE: frontend/src/pages/Home.jsx
// CHANGE: All API URLs now use VITE_API_URL environment variable
// ============================================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  CheckCircle,
  Clock,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Sparkles,
} from "lucide-react";

// STEP 1: Define the API URL using environment variable
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Home = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({ active: 0, total: 50 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
    fetchStats();
  }, []);

  // STEP 2: Fetch members using API_URL
  const fetchMembers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/members`);
      if (response.ok) {
        const data = await response.json();
        setMembers(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Error fetching members:", err);
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Fetch stats using API_URL
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/members/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: "Premium Templates",
      desc: "Access 100,000+ premium templates",
    },
    {
      icon: Zap,
      title: "Brand Kit",
      desc: "Upload your logos, colors, and fonts",
    },
    {
      icon: Globe,
      title: "Background Remover",
      desc: "One-click background removal",
    },
    {
      icon: Shield,
      title: "100GB Cloud Storage",
      desc: "Store all your designs securely",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              ZAFTAN Studios <br />
              <span className="text-yellow-300">Canva Pro</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
              Get Canva Pro access at an unbeatable price. Join our team and
              unlock premium features today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                Get Started
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("pricing")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center justify-center gap-2 bg-white/20 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-white dark:fill-gray-900"
            />
          </svg>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple Pricing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No hidden fees, cancel anytime
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
                <h3 className="text-xl font-semibold mb-2">Canva Pro Access</h3>
                <p className="text-white/80 text-sm">1 Month Membership</p>
              </div>
              <div className="p-8">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ₹50
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    Full Canva Pro Features
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    1 Month Access
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    Team Collaboration
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    Premium Templates
                  </li>
                </ul>
                <button
                  onClick={() => navigate("/contact")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What's Included
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Everything you need to create stunning designs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-fit mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Slot Counter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Available Slots
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Users className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              <span className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white">
                {stats.active}/{stats.total}
              </span>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              slots filled
            </p>
            <div className="mt-6 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((stats.active / stats.total) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Active Members Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Active Members
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Loading members...
              </p>
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No active members yet
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Be the first to join!
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Time Remaining
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {members.map((member, index) => {
                      const daysLeft = Math.ceil(
                        (new Date(member.expiresAt) - new Date()) /
                          (1000 * 60 * 60 * 24)
                      );
                      return (
                        <tr
                          key={member._id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                            {member.email}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                daysLeft <= 7
                                  ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                  : daysLeft <= 15
                                  ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                                  : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                              }`}
                            >
                              <Clock size={12} />
                              {daysLeft > 0
                                ? `${daysLeft} days left`
                                : "Expired"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden divide-y divide-gray-200 dark:divide-gray-700">
                {members.map((member, index) => {
                  const daysLeft = Math.ceil(
                    (new Date(member.expiresAt) - new Date()) /
                      (1000 * 60 * 60 * 24)
                  );
                  return (
                    <div
                      key={member._id}
                      className="p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          #{index + 1} {member.email}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          daysLeft <= 7
                            ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                            : daysLeft <= 15
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                            : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        }`}
                      >
                        <Clock size={12} />
                        {daysLeft > 0 ? `${daysLeft}d` : "Expired"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;