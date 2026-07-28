import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePlants } from '../contexts/PlantContext';
import { 
  Droplet, 
  Sun, 
  Heart, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles,
  Thermometer,
  FileDown
} from 'lucide-react';
import { exportPlantReportPDF } from '../utils/pdfExport';

export const PlantCard = ({ plant }) => {
  const { toggleFavorite, waterPlant, addToRecentlyViewed } = usePlants();

  const isDueToday = plant.nextWaterDate && new Date(plant.nextWaterDate) <= new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass-card rounded-3xl overflow-hidden flex flex-col group border border-slate-100 dark:border-slate-800/80 hover:shadow-xl hover:shadow-emerald-950/10 transition-all"
    >
      {/* Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={plant.image || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80'}
          alt={plant.plantName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(plant.id)}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:text-rose-500 dark:hover:text-rose-400 transition-colors shadow-md"
        >
          <Heart size={18} className={plant.favorite ? 'fill-rose-500 text-rose-500' : ''} />
        </button>

        {/* Category Pill */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600/90 text-white backdrop-blur-md shadow-sm">
          {plant.category || 'Indoor'}
        </span>

        {/* Plant Title Overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-extrabold text-lg leading-snug drop-shadow-sm">{plant.plantName}</h3>
          <p className="text-xs font-medium text-emerald-200 italic opacity-90 truncate">{plant.species}</p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Care Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <Droplet size={14} className="text-blue-500" />
            <div>
              <p className="text-slate-400 text-[10px]">Watering</p>
              <p className="font-semibold text-slate-700 dark:text-slate-200">Every {plant.waterFrequency}d</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <Sun size={14} className="text-amber-500" />
            <div>
              <p className="text-slate-400 text-[10px]">Sunlight</p>
              <p className="font-semibold text-slate-700 dark:text-slate-200 truncate">{plant.sunlight || 'Bright'}</p>
            </div>
          </div>
        </div>

        {/* Watering Status Bar */}
        <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={16} className={isDueToday ? 'text-rose-500 animate-pulse' : 'text-emerald-600 dark:text-emerald-400'} />
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Next Watering</p>
              <p className={`text-xs font-bold ${isDueToday ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'}`}>
                {isDueToday ? 'Needs Water Today!' : new Date(plant.nextWaterDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <button
            onClick={() => waterPlant(plant.id)}
            title="Mark Watered Today"
            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 active:scale-95 transition-transform"
          >
            <CheckCircle2 size={16} />
          </button>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
          <button
            onClick={() => exportPlantReportPDF(plant)}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
            title="Export Care Passport PDF"
          >
            <FileDown size={14} /> Passport PDF
          </button>

          <Link
            to={`/plants/${plant.id}`}
            onClick={() => addToRecentlyViewed(plant)}
            className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:gap-1.5 transition-all"
          >
            View Details <ChevronRight size={14} />
          </Link>
        </div>

      </div>
    </motion.div>
  );
};
