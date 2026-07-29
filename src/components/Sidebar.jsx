import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  LayoutDashboard, 
  Flower2, 
  PlusCircle, 
  BookOpen, 
  CloudSun, 
  Activity, 
  User, 
  ShieldCheck, 
  LogOut,
  LogIn,
  X,
  Sprout,
  Sun,
  Moon
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const links = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/plants', label: 'My Plants', icon: Flower2 },
    { path: '/plants/new', label: 'Add New Plant', icon: PlusCircle },
    { path: '/journal', label: 'Plant Journal', icon: BookOpen },
    { path: '/weather', label: 'Weather Care', icon: CloudSun },
    { path: '/disease-detection', label: 'AI Diagnostics', icon: Activity },
    { path: '/profile', label: 'Profile Settings', icon: User }
  ];

  if (currentUser?.role === 'admin') {
    links.push({ path: '/admin', label: 'Admin Console', icon: ShieldCheck });
  }

  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  if (isAuthPage) return null;

  return (
    <>
      {/* Mobile Top Header Bar with Mobile Menu Toggle */}
      <div className="lg:hidden sticky top-0 z-30 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Sprout className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">PlantPal</span>
        </Link>
        <button
          onClick={onClose}
          className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={24} /> : <div className="space-y-1.5 w-6"><div className="h-0.5 w-6 bg-current rounded"></div><div className="h-0.5 w-6 bg-current rounded"></div><div className="h-0.5 w-6 bg-current rounded"></div></div>}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 glass-panel border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 overflow-y-auto flex-1">
          {/* Header Brand */}
          <div className="flex items-center justify-between mb-6 pt-2 px-1">
            <Link to="/" onClick={onClose} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  PlantPal
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 font-medium">Smart Care Assistant</span>
              </div>
            </Link>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 bg-slate-100 dark:bg-slate-800/60 transition-colors"
                title="Toggle Theme"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={onClose}
                className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Navigation Menu
            </p>
            {links.map((link) => {
              const Icon = link.icon;
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Auth / Sign In Section */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          {currentUser ? (
            <div className="space-y-2">
              <div className="px-2 py-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {currentUser.displayName || 'Logged In User'}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {currentUser.email}
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  logout();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all text-center"
            >
              <LogIn size={16} /> Sign In
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

