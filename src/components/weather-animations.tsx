'use client';

import React from 'react';

interface WeatherAnimationsProps {
  condition: string; // e.g., Sunny, Rainy, Snowy
}

export function WeatherAnimations({ condition }: WeatherAnimationsProps) {
  // Subtle background accents based on condition
  if (condition === 'Rainy') {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <div className="animate-rain absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]"></div>
      </div>
    );
  }

  if (condition === 'Snowy') {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-20">
        <div className="animate-snow absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]"></div>
      </div>
    );
  }

  // Default for Sunny/Cloudy: subtle radial sun glow when day
  return null;
}
