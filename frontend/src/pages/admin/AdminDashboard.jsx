import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/profile', label: 'Profile', icon: '👤' },
    { path: '/admin/skills', label: 'Skills', icon: '💼' },
    { path: '/admin/education', label: 'Education', icon: '🎓' },
    { path: '/admin/certificates', label: 'Certificates', icon: '🏆' },
    { path: '/admin/stats', label: 'Stats', icon: '📈' },
    { path: '/admin/projects', label: 'Projects', icon: '🚀' },
    { path: '/admin/messages', label: 'Messages', icon: '💬' },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-primary-dark">
      {/* Fixed Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="glass-dark relative flex flex-col h-full border-r border-soft-blue/20 shadow-xl"
      >
        {/* Logo */}
        <div className="p-6 border-b border-soft-blue/20 flex-shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-soft-blue flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-xl font-bold text-primary-dark">NR</span>
              </div>
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-bold text-lg overflow-hidden whitespace-nowrap bg-gradient-to-r from-white to-accent bg-clip-text text-transparent"
                >
                  Admin Panel
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-accent/30 scrollbar-track-secondary-dark/50">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-accent/20 text-white shadow-md'
                      : 'text-light-gray hover:bg-accent/10 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 w-1 h-8 bg-accent rounded-r-full"
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="text-xl flex-shrink-0 relative z-10">{item.icon}</span>
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="overflow-hidden whitespace-nowrap font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {!sidebarOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-secondary-dark text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap shadow-lg border border-soft-blue/20">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-soft-blue/20 flex-shrink-0 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-xl text-light-gray hover:bg-accent/10 transition-all group relative"
          >
            <span className="text-xl flex-shrink-0">🌐</span>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  View Site
                </motion.span>
              )}
            </AnimatePresence>
            {!sidebarOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-secondary-dark text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg border border-soft-blue/20">
                View Site
              </div>
            )}
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-400/20 transition-all w-full group relative"
          >
            <span className="text-xl flex-shrink-0">🚪</span>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
            {!sidebarOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-secondary-dark text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg border border-soft-blue/20">
                Logout
              </div>
            )}
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center shadow-lg z-20 hover:scale-110 transition-transform duration-200 focus:outline-none"
        >
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${sidebarOpen ? '' : 'rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 bg-primary-dark/30">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

