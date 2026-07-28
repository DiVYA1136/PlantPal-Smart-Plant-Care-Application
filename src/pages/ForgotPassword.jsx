import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sprout, Mail, ArrowLeft, Send } from 'lucide-react';
import { toast } from 'react-toastify';

export const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setSent(true);
      toast.success('Password reset link sent to your inbox!');
    } catch (err) {
      toast.error('Failed to send reset email.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card p-8 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-600/30">
            <Sprout size={28} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Reset Password</h1>
          <p className="text-xs text-slate-500">We will email you a secure link to reset your account password</p>
        </div>

        {sent ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-center text-xs space-y-2">
            <p className="font-bold">Reset Email Sent!</p>
            <p>Please check your inbox for instructions.</p>
            <Link to="/login" className="block text-xs font-bold text-emerald-600 underline pt-2">Return to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@plantpal.io"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Send size={18} /> Send Reset Link
            </button>
          </form>
        )}

        <p className="text-center text-xs text-slate-500">
          <Link to="/login" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center justify-center gap-1">
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};
