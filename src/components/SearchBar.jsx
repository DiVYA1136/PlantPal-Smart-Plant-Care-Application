import React from 'react';
import { Search, Mic, X, Filter } from 'lucide-react';
import { useVoiceSearch } from '../hooks/useVoiceSearch';

export const SearchBar = ({ 
  searchTerm, 
  setSearchTerm, 
  categoryFilter, 
  setCategoryFilter,
  sortBy,
  setSortBy,
  categories = [] 
}) => {

  const { isListening, startListening } = useVoiceSearch((transcriptText) => {
    setSearchTerm(transcriptText);
  });

  return (
    <div className="w-full glass-card p-4 rounded-3xl mb-6 space-y-3 md:space-y-0 md:flex md:items-center md:gap-4 border border-slate-200/80 dark:border-slate-800/80">
      
      {/* Input box */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by plant name, species (e.g. Monstera)..."
          className="w-full pl-11 pr-20 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />

        <div className="absolute right-3 top-2.5 flex items-center gap-1">
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X size={16} />
            </button>
          )}

          {/* Voice Search Button */}
          <button
            onClick={startListening}
            title="Voice Search"
            className={`p-2 rounded-xl transition-all ${
              isListening
                ? 'bg-rose-500 text-white animate-bounce shadow-md shadow-rose-500/30'
                : 'text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
            }`}
          >
            <Mic size={16} />
          </button>
        </div>
      </div>

      {/* Filter and Sort Dropdowns */}
      <div className="flex items-center gap-3">
        
        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        >
          <option value="All">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Sort Options */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        >
          <option value="name">Sort by Name</option>
          <option value="waterDate">Sort by Water Due</option>
          <option value="favorite">Sort by Favorite</option>
        </select>

      </div>

    </div>
  );
};
