import React from 'react';

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[300px]">
      <div className="relative w-14 h-14">
        <div className="w-14 h-14 rounded-full border-4 border-emerald-200 dark:border-emerald-950 animate-ping opacity-75" />
        <div className="absolute inset-0 w-14 h-14 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin" />
      </div>
      <p className="mt-4 text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
        Loading Botanical Assistant...
      </p>
    </div>
  );
};
