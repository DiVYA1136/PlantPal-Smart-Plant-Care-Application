import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { PlantProvider } from './contexts/PlantContext';
import { WeatherProvider } from './contexts/WeatherContext';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { MyPlants } from './pages/MyPlants';
import { AddPlant } from './pages/AddPlant';
import { PlantDetails } from './pages/PlantDetails';
import { Journal } from './pages/Journal';
import { Weather } from './pages/Weather';
import { DiseaseDetection } from './pages/DiseaseDetection';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <PlantProvider>
          <WeatherProvider>
            <Router>
              <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
                <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(prev => !prev)} />

                  <main className="flex-1 min-w-0 lg:pl-8 pt-4 lg:pt-0">
                    <Routes>
                      {/* Public routes */}
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />

                      {/* Protected SaaS features */}
                      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                      <Route path="/plants" element={<ProtectedRoute><MyPlants /></ProtectedRoute>} />
                      <Route path="/plants/new" element={<ProtectedRoute><AddPlant /></ProtectedRoute>} />
                      <Route path="/plants/:id" element={<ProtectedRoute><PlantDetails /></ProtectedRoute>} />
                      <Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
                      <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
                      <Route path="/disease-detection" element={<ProtectedRoute><DiseaseDetection /></ProtectedRoute>} />
                      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                      {/* Admin panel */}
                      <Route path="/admin" element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} />
                    </Routes>
                  </main>
                </div>

                <Footer />
                <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />

              </div>
            </Router>
          </WeatherProvider>
        </PlantProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

