import React from 'react';

export const CardSkeleton = () => {
  return (
    <div className="glass-card rounded-3xl overflow-hidden p-4 space-y-4">
      <div className="w-full h-48 rounded-2xl skeleton-anim" />
      <div className="h-6 w-3/4 rounded-lg skeleton-anim" />
      <div className="h-4 w-1/2 rounded-lg skeleton-anim" />
      <div className="grid grid-cols-2 gap-2 pt-2">
        <div className="h-10 rounded-xl skeleton-anim" />
        <div className="h-10 rounded-xl skeleton-anim" />
      </div>
    </div>
  );
};
