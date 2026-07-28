import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePlants } from '../contexts/PlantContext';
import { PlantCard } from '../components/PlantCard';
import { SearchBar } from '../components/SearchBar';
import { PlusCircle, Flower2, Heart, Sparkles } from 'lucide-react';

export const MyPlants = () => {
  const { plants } = usePlants();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(plants.map(p => p.category).filter(Boolean));
    return Array.from(set);
  }, [plants]);

  // Filtered & Sorted Plant collection
  const filteredPlants = useMemo(() => {
    return plants
      .filter(p => {
        const matchesSearch = 
          p.plantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.species.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
        const matchesFav = !showFavoritesOnly || p.favorite;
        return matchesSearch && matchesCat && matchesFav;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.plantName.localeCompare(b.plantName);
        if (sortBy === 'waterDate') return new Date(a.nextWaterDate) - new Date(b.nextWaterDate);
        if (sortBy === 'favorite') return (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0);
        return 0;
      });
  }, [plants, searchTerm, categoryFilter, sortBy, showFavoritesOnly]);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-emerald-500/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            My Botanical Collection <Flower2 className="text-emerald-500" size={28} />
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage, schedule, and view detailed care profiles for your plant collection.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFavoritesOnly(prev => !prev)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
              showFavoritesOnly
                ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20'
                : 'glass-panel text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Heart size={16} className={showFavoritesOnly ? 'fill-white' : ''} />
            {showFavoritesOnly ? 'Showing Favorites' : 'Filter Favorites'}
          </button>

          <Link
            to="/plants/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all"
          >
            <PlusCircle size={16} /> Add Plant
          </Link>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
      />

      {/* Plant Cards Grid */}
      {filteredPlants.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl text-center space-y-4">
          <Flower2 size={48} className="mx-auto text-slate-300 dark:text-slate-600" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No plants match your search filters</h3>
          <p className="text-xs text-slate-400">Try searching for a different plant name or reset category filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map(plant => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      )}

    </div>
  );
};
