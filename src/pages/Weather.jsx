import React from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { CloudSun, Thermometer, Droplet, Wind, Sparkles, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export const Weather = () => {
  const { weather, recommendations, loading } = useWeather();

  if (loading) {
    return <div className="p-12 text-center">Loading Weather Microclimate Engine...</div>;
  }

  return (
    <div className="space-y-8 pb-12">
      
      {/* Weather Hero Card */}
      <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/10 via-transparent to-teal-900/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Live Location Ambient Climate
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">{weather?.city}</h1>
            <p className="text-xs text-slate-500 capitalize">{weather?.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
              <CloudSun size={36} />
            </div>
            <div>
              <p className="text-4xl font-extrabold text-slate-900 dark:text-white">{weather?.temp}°C</p>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{weather?.weather}</p>
            </div>
          </div>
        </div>

        {/* Vital Climate Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-3">
            <Droplet className="text-blue-500" size={24} />
            <div>
              <p className="text-[10px] text-slate-400">Relative Humidity</p>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">{weather?.humidity}%</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-3">
            <Wind className="text-teal-500" size={24} />
            <div>
              <p className="text-[10px] text-slate-400">Wind Velocity</p>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">{weather?.wind} m/s</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-3">
            <Thermometer className="text-amber-500" size={24} />
            <div>
              <p className="text-[10px] text-slate-400">Transpiration Index</p>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">Moderate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Botanical Care Recommendations */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          AI Smart Recommendations for Today <Sparkles className="text-emerald-500" size={20} />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map(rec => (
            <div key={rec.id} className="glass-card p-6 rounded-3xl space-y-3 border border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                {rec.type === 'danger' && <ShieldAlert className="text-rose-500" size={20} />}
                {rec.type === 'warning' && <AlertTriangle className="text-amber-500" size={20} />}
                {rec.type === 'info' && <Droplet className="text-blue-500" size={20} />}
                {rec.type === 'success' && <CheckCircle2 className="text-emerald-500" size={20} />}
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{rec.title}</h3>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                Action: {rec.action}
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {rec.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
