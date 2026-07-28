import React from 'react';
import { motion } from 'framer-motion';
import { usePlants } from '../contexts/PlantContext';
import { useWeather } from '../contexts/WeatherContext';
import { PlantCard } from '../components/PlantCard';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { 
  Sprout, 
  Droplet, 
  Calendar, 
  Activity, 
  PlusCircle, 
  CloudSun, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const Dashboard = () => {
  const { plants, totalPlants, plantsNeedingWaterToday, upcomingReminders, waterPlant } = usePlants();
  const { weather, recommendations } = useWeather();

  // Weekly watering bar chart data
  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Plants Watered',
        data: [2, 4, 1, 5, 3, 2, 4],
        backgroundColor: '#16a34a',
        borderRadius: 8,
      }
    ]
  };

  // Monthly growth line chart data
  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Avg Leaf Growth (cm)',
        data: [12, 16, 21, 28],
        borderColor: '#0d9488',
        backgroundColor: 'rgba(13, 148, 136, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  // Health Score Breakdown Doughnut
  const doughnutData = {
    labels: ['Thriving (Excellent)', 'Good', 'Needs Attention'],
    datasets: [
      {
        data: [plants.filter(p => p.favorite).length + 2, Math.max(plants.length - 1, 1), 1],
        backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b'],
        borderWidth: 0,
      }
    ]
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-emerald-500/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            Welcome back, Caregiver! <Sparkles className="text-emerald-500" size={24} />
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here is your daily indoor botanical overview & smart schedule for today.
          </p>
        </div>

        <Link
          to="/plants/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all self-start md:self-auto"
        >
          <PlusCircle size={18} /> Add New Plant
        </Link>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Sprout size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Collection</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{totalPlants} Plants</h3>
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Droplet size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Watering Needed Today</p>
            <h3 className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">{plantsNeedingWaterToday.length} Tasks</h3>
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Upcoming (3 Days)</p>
            <h3 className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{upcomingReminders.length} Due Soon</h3>
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Health Index</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">96% Thriving</h3>
          </div>
        </div>

      </div>

      {/* Weather Recommendation Banner */}
      {weather && (
        <div className="glass-card p-6 rounded-3xl border-l-4 border-l-emerald-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <CloudSun size={28} />
            </div>
            <div>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                Ambient Climate: {weather.city} ({weather.temp}°C, {weather.humidity}% Humidity)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {recommendations[0]?.desc || 'Perfect ambient balance for leaf transpiration today.'}
              </p>
            </div>
          </div>

          <Link
            to="/weather"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
          >
            Full Weather Insights <ArrowUpRight size={14} />
          </Link>
        </div>
      )}

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="glass-card p-6 rounded-3xl lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Weekly Care Schedule</h3>
            <span className="text-xs font-semibold text-slate-400">Activity Frequency</span>
          </div>
          <div className="h-64">
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-4">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Collection Health Breakdown</h3>
          <div className="h-56 flex items-center justify-center">
            <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

      </div>

      {/* Today's Tasks & Urgent Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Urgent Task List */}
        <div className="glass-card p-6 rounded-3xl lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              Today's Care Tasks <span className="px-2 py-0.5 rounded-full text-xs bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">{plantsNeedingWaterToday.length}</span>
            </h3>
            <Link to="/plants" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">View All</Link>
          </div>

          {plantsNeedingWaterToday.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
              <CheckCircle2 size={32} className="mx-auto text-emerald-500 mb-2" />
              <p className="font-bold text-sm text-slate-800 dark:text-slate-200">All plants are hydrated!</p>
              <p className="text-xs text-slate-400 mt-1">No urgent watering scheduled for today.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {plantsNeedingWaterToday.map(plant => (
                <div key={plant.id} className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={plant.image} alt={plant.plantName} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{plant.plantName}</h4>
                      <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">Overdue / Scheduled for Today</p>
                    </div>
                  </div>
                  <button
                    onClick={() => waterPlant(plant.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
                  >
                    <Droplet size={14} /> Watered
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Growth Trend */}
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Monthly Foliage Expansion</h3>
          <div className="h-56">
            <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

      </div>

      {/* Featured Plant Collection Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Recent Favorites</h2>
          <Link to="/plants" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">See Catalog</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.slice(0, 3).map(plant => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </div>

    </div>
  );
};
