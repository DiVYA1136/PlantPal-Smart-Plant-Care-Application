import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sprout, 
  ShieldCheck, 
  Zap, 
  Droplet, 
  Activity, 
  CloudSun, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3,
  Heart
} from 'lucide-react';

export const Home = () => {
  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 rounded-3xl bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent border border-emerald-500/10">
        <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800"
          >
            <Sparkles size={14} /> AI-Powered SaaS Houseplant Assistant
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
          >
            Never Let Your Houseplants <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400">Fade Again</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Track growth milestones, compute micro-climate watering routines, diagnose leaf diseases with AI vision, and maintain an exportable botanical care passport.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 group transition-all"
            >
              Launch Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-base transition-all text-center"
            >
              Sign In Demo
            </Link>
          </motion.div>
        </div>

        {/* Feature Teaser Cards */}
        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <div className="glass-card p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Droplet size={24} />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Smart Watering Engine</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Dynamically calculates watering intervals per plant species based on indoor humidity and outdoor temperature.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Activity size={24} />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">AI Leaf Diagnostics</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Detect Powdery Mildew, Root Rot, or Spider Mites instantly from photo uploads with actionable remedies.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <BarChart3 size={24} />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Growth & PDF Passports</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Chart leaf growth, height trends, and generate clean PDF documentation for plant care handovers.
            </p>
          </div>
        </div>
      </section>

      {/* Product Interactive Demo CTA */}
      <section className="glass-card p-10 rounded-3xl border border-emerald-500/20 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Ready to elevate your plant collection?</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Explore all features live without creating an account. Demo mode is pre-loaded with sample plants and analytics.
        </p>
        <Link
          to="/plants"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/20 transition-all"
        >
          Explore Collection Catalog <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
};
