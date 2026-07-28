import React, { useState } from 'react';
import { MOCK_DISEASES_DB } from '../services/mockData';
import { Activity, Upload, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

export const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleRunDiagnostics = () => {
    if (!imagePreview) {
      toast.error('Please select or upload a leaf photo first.');
      return;
    }

    setAnalyzing(true);
    setTimeout(() => {
      // Pick random simulated disease from database
      const random = MOCK_DISEASES_DB[Math.floor(Math.random() * MOCK_DISEASES_DB.length)];
      setResult(random);
      setAnalyzing(false);
      toast.success('Leaf analysis complete!');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/20 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          <Activity size={16} /> Computer Vision Leaf Scanner
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">AI Plant Disease Diagnostics</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Upload a clear photograph of affected leaves or stems to scan for fungi, pests, and nutrient deficiencies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Upload Box */}
        <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Leaf Image Sample</h3>

          <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-emerald-500 transition-colors flex flex-col items-center justify-center min-h-[220px]">
            {imagePreview ? (
              <img src={imagePreview} alt="Leaf preview" className="w-full h-48 object-cover rounded-xl" />
            ) : (
              <div className="space-y-2">
                <Upload size={36} className="mx-auto text-slate-400" />
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Click to upload leaf photo</p>
                <p className="text-[10px] text-slate-400">Supports PNG, JPG up to 5MB</p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <button
              onClick={handleRunDiagnostics}
              disabled={analyzing}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {analyzing ? (
                <span className="flex items-center gap-2">
                  <Sparkles size={18} className="animate-spin" /> Scanning Neural Net...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Activity size={18} /> Run AI Leaf Analysis
                </span>
              )}
            </button>

            {/* Demo quick sample buttons */}
            <p className="text-[10px] text-center text-slate-400 pt-1">Or test with demo sample:</p>
            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setImagePreview('https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80');
                  setResult(MOCK_DISEASES_DB[0]);
                }}
                className="px-3 py-1 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-100"
              >
                Powdery Mildew Leaf
              </button>
              <button
                type="button"
                onClick={() => {
                  setImagePreview('https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80');
                  setResult(MOCK_DISEASES_DB[1]);
                }}
                className="px-3 py-1 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-100"
              >
                Root Rot Sample
              </button>
            </div>
          </div>
        </div>

        {/* Diagnosis Result Card */}
        <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 dark:border-slate-800/80">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Diagnostic Report</h3>

          {result ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              
              <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-base text-amber-900 dark:text-amber-300">{result.name}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-200 text-amber-900">
                    {result.confidence} Confidence
                  </span>
                </div>
                <p className="text-xs text-amber-800 dark:text-amber-400 font-medium">Severity: {result.severity}</p>
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300 mb-1">Observed Symptoms</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{result.symptoms}</p>
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300 mb-1">Root Causes</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{result.causes}</p>
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300 mb-2">Recommended Treatment Protocol</h4>
                <div className="space-y-2">
                  {result.treatment.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs space-y-2">
              <ShieldCheck size={36} className="mx-auto text-slate-300 dark:text-slate-700" />
              <p>Upload a leaf image and click "Run AI Leaf Analysis" to view diagnostic results.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
