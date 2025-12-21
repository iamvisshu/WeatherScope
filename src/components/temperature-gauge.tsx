'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TemperatureGaugeProps {
  value: number; // temperature in °C
  min?: number;
  max?: number;
  size?: number; // pixels
}

export function TemperatureGauge({ value, min = -10, max = 40, size = 120 }: TemperatureGaugeProps) {
  const clamped = Math.max(min, Math.min(max, value));
  const ratio = (clamped - min) / (max - min);
  const angle = 220 * ratio - 110; // -110deg -> +110deg

  return (
    <div className="w-[120px] h-[120px] flex flex-col items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 120 120" className="block">
        <defs>
          <linearGradient id="tempGrad" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>

        <g transform="translate(60,60)">
          <path d="M -45 20 A 70 70 0 0 1 45 20" fill="none" stroke="#e6eef9" strokeWidth="10" strokeLinecap="round" />
          <path d="M -45 20 A 70 70 0 0 1 45 20" fill="none" stroke="url(#tempGrad)" strokeWidth="10" strokeLinecap="round" strokeDasharray="250" strokeDashoffset={`${250 - 250 * ratio}`} />

          <motion.line
            x1="0"
            y1="0"
            x2="0"
            y2="-45"
            stroke="#111"
            strokeWidth="2"
            strokeLinecap="round"
            initial={false}
            animate={{ rotate: angle }}
            transition={useReducedMotion() ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 18 }}
            style={{ transformOrigin: 'center' }}
          />

          <circle cx="0" cy="0" r="4" fill="#111" />
        </g>
      </svg>
      <div className="text-center">
        <div className="text-sm text-muted-foreground">Temperature</div>
        <div className="font-bold text-lg">{Math.round(value)}°C</div>
      </div>
    </div>
  );
}
