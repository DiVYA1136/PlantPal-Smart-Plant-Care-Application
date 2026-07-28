import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Heart, Github, Twitter, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full glass-panel border-t border-slate-200/80 dark:border-slate-800/80 mt-auto py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Sprout size={18} />
            </div>
            <div>
              <span className="font-extrabold text-base text-slate-900 dark:text-white">PlantPal</span>
              <p className="text-xs text-slate-500 dark:text-slate-400">Production-Ready Smart Care SaaS Application</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <Link to="/dashboard" className="hover:text-emerald-600 dark:hover:text-emerald-400">Dashboard</Link>
            <Link to="/plants" className="hover:text-emerald-600 dark:hover:text-emerald-400">My Collection</Link>
            <Link to="/journal" className="hover:text-emerald-600 dark:hover:text-emerald-400">Journal</Link>
            <Link to="/weather" className="hover:text-emerald-600 dark:hover:text-emerald-400">Weather</Link>
            <Link to="/disease-detection" className="hover:text-emerald-600 dark:hover:text-emerald-400">AI Diagnostics</Link>
          </div>

          <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400">
              <Github size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400">
              <Twitter size={18} />
            </a>
            <a href="mailto:support@plantpal.io" className="hover:text-emerald-600 dark:hover:text-emerald-400">
              <Mail size={18} />
            </a>
          </div>

        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-center text-xs text-slate-400 dark:text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} PlantPal SaaS. Built with React, Tailwind CSS, & Firebase.</p>
          <p className="flex items-center gap-1">
            Created for Developer Portfolio <Heart size={12} className="text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
