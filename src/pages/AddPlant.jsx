import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlants } from '../contexts/PlantContext';
import { searchPlantDatabase } from '../services/api';
import { Sprout, Upload, Sparkles, ArrowLeft, CheckCircle2, Search } from 'lucide-react';
import { toast } from 'react-toastify';

export const AddPlant = () => {
  const navigate = useNavigate();
  const { addPlant } = usePlants();

  const [formData, setFormData] = useState({
    plantName: '',
    species: '',
    category: 'Indoor',
    image: '',
    waterFrequency: 7,
    fertilizerFrequency: 30,
    sunlight: 'Bright Indirect Light',
    temperature: '18°C - 26°C',
    humidity: '60%+',
    notes: '',
    height: 20
  });

  const [apiSearchQuery, setApiSearchQuery] = useState('');
  const [apiSearchResults, setApiSearchResults] = useState([]);
  const [searchingApi, setSearchingApi] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApiSearch = async () => {
    if (!apiSearchQuery.trim()) return;
    setSearchingApi(true);
    try {
      const results = await searchPlantDatabase(apiSearchQuery);
      setApiSearchResults(results);
    } catch (err) {
      toast.error('Could not fetch plant database results.');
    } finally {
      setSearchingApi(false);
    }
  };

  const autofillFromApi = (plant) => {
    setFormData(prev => ({
      ...prev,
      plantName: plant.name || prev.plantName,
      species: plant.scientificName || prev.species,
      sunlight: plant.sunlight || prev.sunlight,
      image: plant.imageUrl || prev.image
    }));
    toast.success(`Autofilled template for ${plant.name}`);
    setApiSearchResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.plantName.trim()) {
      toast.error('Please specify a plant name.');
      return;
    }

    try {
      await addPlant(formData);
      toast.success('Plant added successfully to your collection!');
      navigate('/plants');
    } catch (err) {
      toast.error('Failed to add plant.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Catalog
        </button>
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full">
          New Plant Passport
        </span>
      </div>

      {/* External Species Search Banner */}
      <div className="glass-card p-5 rounded-3xl space-y-3 border border-emerald-500/20">
        <div className="flex items-center gap-2">
          <Sparkles className="text-emerald-500" size={18} />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Quick Botanical Database Autofill</h3>
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={apiSearchQuery}
            onChange={(e) => setApiSearchQuery(e.target.value)}
            placeholder="Search Perenual database (e.g. Monstera, Pothos)..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
          <button
            type="button"
            onClick={handleApiSearch}
            disabled={searchingApi}
            className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-1.5"
          >
            <Search size={14} /> {searchingApi ? 'Searching...' : 'Autofill'}
          </button>
        </div>

        {apiSearchResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 max-h-48 overflow-y-auto">
            {apiSearchResults.map(res => (
              <div 
                key={res.id}
                onClick={() => autofillFromApi(res)}
                className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 cursor-pointer hover:scale-[1.02] transition-transform flex items-center gap-3"
              >
                <img src={res.imageUrl} alt={res.name} className="w-10 h-10 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{res.name}</p>
                  <p className="text-[10px] text-slate-500 italic truncate">{res.scientificName}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Add Plant Form */}
      <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800/80">
        
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
          Plant Passport Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Plant Custom Name *</label>
            <input
              type="text"
              name="plantName"
              value={formData.plantName}
              onChange={handleChange}
              placeholder="e.g. Living Room Monstera"
              required
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Scientific Species Name</label>
            <input
              type="text"
              name="species"
              value={formData.species}
              onChange={handleChange}
              placeholder="e.g. Monstera deliciosa"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <option value="Indoor">Indoor Foliage</option>
              <option value="Succulent">Succulent & Cactus</option>
              <option value="Flowering">Flowering Plant</option>
              <option value="Fern">Fern</option>
              <option value="Herb">Herb & Edible</option>
              <option value="Outdoor">Outdoor Garden</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>
        </div>

        {/* Care Frequencies */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Watering (Days)</label>
            <input
              type="number"
              name="waterFrequency"
              value={formData.waterFrequency}
              onChange={handleChange}
              min="1"
              max="90"
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Fertilizer (Days)</label>
            <input
              type="number"
              name="fertilizerFrequency"
              value={formData.fertilizerFrequency}
              onChange={handleChange}
              min="1"
              max="180"
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Initial Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Environmental conditions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Sunlight</label>
            <input
              type="text"
              name="sunlight"
              value={formData.sunlight}
              onChange={handleChange}
              placeholder="e.g. Bright Indirect"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Ideal Temp</label>
            <input
              type="text"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              placeholder="e.g. 18°C - 26°C"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Target Humidity</label>
            <input
              type="text"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              placeholder="e.g. 60%+"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Special Care Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Add repotting dates, misting instructions, or nursery details..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={20} /> Create Plant Passport
        </button>

      </form>

    </div>
  );
};
