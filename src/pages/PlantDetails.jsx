import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlants } from '../contexts/PlantContext';
import { exportPlantReportPDF } from '../utils/pdfExport';
import { Modal } from '../components/Modal';
import { Line } from 'react-chartjs-2';
import { 
  Droplet, 
  Sun, 
  Thermometer, 
  Wind, 
  Calendar, 
  Heart, 
  FileDown, 
  Trash2, 
  Plus, 
  ArrowLeft, 
  Sparkles,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'react-toastify';

export const PlantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { plants, waterPlant, toggleFavorite, deletePlant, addGrowthEntry } = usePlants();

  const plant = plants.find(p => p.id === id);

  const [growthModalOpen, setGrowthModalOpen] = useState(false);
  const [newLog, setNewLog] = useState({ height: '', health: 'Excellent', notes: '' });

  if (!plant) {
    return (
      <div className="p-12 text-center glass-card rounded-3xl space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Plant not found</h2>
        <button onClick={() => navigate('/plants')} className="text-xs font-bold text-emerald-600 underline">
          Return to Collection
        </button>
      </div>
    );
  }

  const isDueToday = plant.nextWaterDate && new Date(plant.nextWaterDate) <= new Date();

  // Growth chart line setup
  const growthData = {
    labels: (plant.growthHistory || []).map(g => g.date),
    datasets: [
      {
        label: 'Height (cm)',
        data: (plant.growthHistory || []).map(g => g.height),
        borderColor: '#16a34a',
        backgroundColor: 'rgba(22, 163, 74, 0.1)',
        tension: 0.3,
        fill: true,
      }
    ]
  };

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newLog.height) {
      toast.error('Please specify height in cm.');
      return;
    }
    addGrowthEntry(plant.id, {
      date: new Date().toISOString().split('T')[0],
      height: Number(newLog.height),
      health: newLog.health,
      notes: newLog.notes
    });
    toast.success('Growth milestone logged!');
    setGrowthModalOpen(false);
    setNewLog({ height: '', health: 'Excellent', notes: '' });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove ${plant.plantName} from your collection?`)) {
      deletePlant(plant.id);
      toast.info('Plant removed.');
      navigate('/plants');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top action header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/plants')}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft size={16} /> Back to My Collection
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => exportPlantReportPDF(plant)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl glass-panel text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <FileDown size={16} /> Download Passport PDF
          </button>

          <button
            onClick={handleDelete}
            className="p-2 rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400 hover:bg-rose-200 transition-colors"
            title="Delete Plant"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Hero Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Plant Image & Quick Actions */}
        <div className="glass-card rounded-3xl overflow-hidden p-4 space-y-4 border border-slate-200/80 dark:border-slate-800/80">
          <div className="relative h-80 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={plant.image || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80'}
              alt={plant.plantName}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => toggleFavorite(plant.id)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg"
            >
              <Heart size={20} className={plant.favorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'} />
            </button>
          </div>

          <button
            onClick={() => {
              waterPlant(plant.id);
              toast.success(`Marked ${plant.plantName} as watered today!`);
            }}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            <Droplet size={18} /> Water Plant Today
          </button>
        </div>

        {/* Plant Information & Specs */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800/80">
          
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {plant.category || 'Indoor'}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">{plant.plantName}</h1>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 italic">{plant.species}</p>
          </div>

          {/* Environmental Care Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <Droplet size={18} className="text-blue-500 mb-1" />
              <p className="text-[10px] text-slate-400">Water Every</p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{plant.waterFrequency} Days</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <Sun size={18} className="text-amber-500 mb-1" />
              <p className="text-[10px] text-slate-400">Sunlight</p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{plant.sunlight || 'Indirect'}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <Thermometer size={18} className="text-rose-500 mb-1" />
              <p className="text-[10px] text-slate-400">Temperature</p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{plant.temperature || '18-25°C'}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <Wind size={18} className="text-teal-500 mb-1" />
              <p className="text-[10px] text-slate-400">Humidity</p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{plant.humidity || '60%+'}</p>
            </div>
          </div>

          {/* Schedule status banner */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar size={20} className={isDueToday ? 'text-rose-500 animate-bounce' : 'text-emerald-600'} />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Next Scheduled Watering</p>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {plant.nextWaterDate ? new Date(plant.nextWaterDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
            {isDueToday && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-500 text-white animate-pulse">
                Action Required Today
              </span>
            )}
          </div>

          {/* Custom Notes */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Caregiver Instructions</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl">
              {plant.notes || 'No extra notes recorded for this plant yet.'}
            </p>
          </div>

        </div>

      </div>

      {/* Growth History & Chart */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800/80">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              Growth Analytics & Height Tracker <Sparkles className="text-emerald-500" size={18} />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Record growth progress over time.</p>
          </div>

          <button
            onClick={() => setGrowthModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all self-start"
          >
            <Plus size={16} /> Log Growth Entry
          </button>
        </div>

        {plant.growthHistory && plant.growthHistory.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-64">
              <Line data={growthData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>

            {/* Growth logs list */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {plant.growthHistory.map((log) => (
                <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span>{log.date}</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{log.height} cm</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">{log.notes}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
            <p className="text-xs text-slate-400">No growth milestones logged yet. Click "Log Growth Entry" to start charting height!</p>
          </div>
        )}

      </div>

      {/* Log Growth Modal */}
      <Modal isOpen={growthModalOpen} onClose={() => setGrowthModalOpen(false)} title="Log Growth Milestone">
        <form onSubmit={handleAddLog} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Height (cm) *</label>
            <input
              type="number"
              value={newLog.height}
              onChange={(e) => setNewLog({ ...newLog, height: e.target.value })}
              placeholder="e.g. 35"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Health Status</label>
            <select
              value={newLog.health}
              onChange={(e) => setNewLog({ ...newLog, health: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
            >
              <option value="Excellent">Excellent (Thriving)</option>
              <option value="Good">Good (Healthy)</option>
              <option value="Moderate">Moderate (Needs monitoring)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Notes / Milestone</label>
            <input
              type="text"
              value={newLog.notes}
              onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })}
              placeholder="e.g. Fed liquid nitrogen fertilizer"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
          >
            Save Growth Log
          </button>
        </form>
      </Modal>

    </div>
  );
};
