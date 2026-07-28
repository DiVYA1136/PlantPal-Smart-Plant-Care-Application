import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { User, Mail, ShieldCheck, Sun, Moon, Bell, Save, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

export const Profile = () => {
  const { currentUser, updateUserProfileData, isDemoMode } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const [displayName, setDisplayName] = useState(currentUser?.displayName || 'Alex Rivers');
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfileData({
        displayName,
        photoURL
      });
      toast.success('Profile details updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      
      {/* Profile Header */}
      <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 flex flex-col sm:flex-row items-center gap-6">
        <img
          src={photoURL}
          alt="Avatar"
          className="w-24 h-24 rounded-2xl object-cover border-2 border-emerald-500 shadow-lg shadow-emerald-500/20"
        />
        <div className="text-center sm:text-left space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{displayName}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{currentUser?.email}</p>
          <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Role: {currentUser?.role?.toUpperCase() || 'USER'}
            </span>
            {isDemoMode && (
              <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Demo Profile Mode
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800/80">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Account Settings
        </h2>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Avatar Image URL</label>
          <input
            type="url"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        {/* Preferences Toggle */}
        <div className="pt-4 space-y-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon size={20} className="text-emerald-400" /> : <Sun size={20} className="text-amber-500" />}
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Dark Mode Interface</p>
                <p className="text-[10px] text-slate-400">Toggle dark visual aesthetic theme</p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-emerald-600' : 'bg-slate-300'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${darkMode ? 'left-6.5' : 'left-0.5'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-blue-500" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Watering Reminder Digest</p>
                <p className="text-[10px] text-slate-400">Receive morning task updates for plants due today</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setEmailNotifications(prev => !prev)}
              className={`w-12 h-6 rounded-full transition-colors relative ${emailNotifications ? 'bg-emerald-600' : 'bg-slate-300'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${emailNotifications ? 'left-6.5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
        >
          <Save size={18} /> Save Settings
        </button>
      </form>

    </div>
  );
};
