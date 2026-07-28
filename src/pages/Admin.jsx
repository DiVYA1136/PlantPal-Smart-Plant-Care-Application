import React, { useState } from 'react';
import { MOCK_USERS_ADMIN } from '../services/mockData';
import { ShieldCheck, Users, Flower2, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

export const Admin = () => {
  const [usersList, setUsersList] = useState(MOCK_USERS_ADMIN);

  const handleDeleteUser = (uid, name) => {
    if (window.confirm(`Delete user account "${name}"?`)) {
      setUsersList(prev => prev.filter(u => u.uid !== uid));
      toast.info(`User ${name} removed.`);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Admin Header */}
      <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 flex items-center justify-between">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            System Administrator
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">Admin Control Dashboard</h1>
          <p className="text-xs text-slate-500">Monitor SaaS users, system metrics, and global botanical datasets.</p>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-600 text-white">
          <ShieldCheck size={28} />
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400">Total Registered Users</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{usersList.length} Accounts</h3>
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
            <Flower2 size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400">Plants Managed Platform-Wide</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">41 Plants</h3>
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400">System Uptime</p>
            <h3 className="text-xl font-extrabold text-emerald-600">99.98% Healthy</h3>
          </div>
        </div>
      </div>

      {/* Users Management Table */}
      <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 dark:border-slate-800/80 overflow-x-auto">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Platform Users Directory</h3>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold">
              <th className="pb-3 px-2">Name</th>
              <th className="pb-3 px-2">Email</th>
              <th className="pb-3 px-2">Role</th>
              <th className="pb-3 px-2">Plants</th>
              <th className="pb-3 px-2">Joined</th>
              <th className="pb-3 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {usersList.map((u) => (
              <tr key={u.uid} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-2 font-bold text-slate-900 dark:text-white">{u.name}</td>
                <td className="py-3 px-2 text-slate-500">{u.email}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${u.role === 'admin' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-2 font-semibold">{u.plantsCount}</td>
                <td className="py-3 px-2 text-slate-400">{u.joinedDate}</td>
                <td className="py-3 px-2 text-right">
                  {u.role !== 'admin' && (
                    <button
                      onClick={() => handleDeleteUser(u.uid, u.name)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
                      title="Delete User"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
