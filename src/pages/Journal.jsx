import React, { useState } from 'react';
import { usePlants } from '../contexts/PlantContext';
import { BookOpen, Plus, Sparkles, Image as ImageIcon, Calendar } from 'lucide-react';
import { Modal } from '../components/Modal';
import { toast } from 'react-toastify';

export const Journal = () => {
  const { journals, plants, addJournalEntry } = usePlants();
  const [modalOpen, setModalOpen] = useState(false);
  const [entryData, setEntryData] = useState({
    plantId: plants[0]?.id || '',
    plantName: plants[0]?.plantName || 'Monstera Deliciosa',
    mood: '😊 Thriving',
    healthStatus: 'Excellent',
    content: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entryData.content.trim()) {
      toast.error('Please enter journal content.');
      return;
    }
    const selectedPlant = plants.find(p => p.id === entryData.plantId);
    addJournalEntry({
      ...entryData,
      plantName: selectedPlant ? selectedPlant.plantName : entryData.plantName
    });
    toast.success('Journal entry recorded!');
    setModalOpen(false);
    setEntryData({
      plantId: plants[0]?.id || '',
      plantName: plants[0]?.plantName || 'Monstera Deliciosa',
      mood: '😊 Thriving',
      healthStatus: 'Excellent',
      content: '',
      image: ''
    });
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-emerald-500/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            Botanical Journal & Observations <BookOpen className="text-emerald-500" size={28} />
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Keep a daily diary of repotting, feeding, pruning, and health notes.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all self-start sm:self-auto"
        >
          <Plus size={16} /> New Entry
        </button>
      </div>

      {/* Journal Cards Timeline */}
      <div className="space-y-4">
        {journals.map((j) => (
          <div 
            key={j.id} 
            className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 dark:border-slate-800/80 hover:shadow-lg transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-lg">{j.mood.split(' ')[0]}</span>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{j.plantName}</h3>
                  <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Calendar size={12} /> {new Date(j.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 self-start sm:self-auto">
                {j.healthStatus}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {j.content}
            </p>

            {j.image && (
              <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img src={j.image} alt="Journal" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Entry Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="New Journal Note">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Plant</label>
            <select
              value={entryData.plantId}
              onChange={(e) => setEntryData({ ...entryData, plantId: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
            >
              {plants.map(p => (
                <option key={p.id} value={p.id}>{p.plantName}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mood</label>
              <select
                value={entryData.mood}
                onChange={(e) => setEntryData({ ...entryData, mood: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
              >
                <option value="😊 Thriving">😊 Thriving</option>
                <option value="🌿 New Leaf">🌿 New Leaf</option>
                <option value="🤔 Needs Attention">🤔 Needs Attention</option>
                <option value="🪴 Repotted">🪴 Repotted</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Health Status</label>
              <select
                value={entryData.healthStatus}
                onChange={(e) => setEntryData({ ...entryData, healthStatus: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
              >
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Moderate">Moderate</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Journal Note *</label>
            <textarea
              value={entryData.content}
              onChange={(e) => setEntryData({ ...entryData, content: e.target.value })}
              rows="4"
              placeholder="Describe watering observations, fertilizing dosage, or leaf texture..."
              required
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Photo Attachment URL (Optional)</label>
            <input
              type="url"
              value={entryData.image}
              onChange={(e) => setEntryData({ ...entryData, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
          >
            Save Journal Note
          </button>
        </form>
      </Modal>

    </div>
  );
};
