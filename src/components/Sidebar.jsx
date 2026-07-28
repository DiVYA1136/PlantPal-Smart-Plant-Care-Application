import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
  X,
  Sparkles
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();

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
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-full w-64 glass-panel border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between lg:hidden mb-6">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-emerald-600 dark:text-emerald-400">PlantPal</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={20} />
            </button>
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

        {/* Bottom User Card */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={currentUser?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt="User Avatar"
              className="w-9 h-9 rounded-full object-cover border border-emerald-500/30"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {currentUser?.displayName || 'Alex Rivers'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {currentUser?.email || 'alex@plantpal.io'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              logout();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>
    </>
  );
};
