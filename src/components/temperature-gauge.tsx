'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TemperatureGaugeProps {
  value: number; // temperature in °C
  min?: number;
  max?: number;
  size?: number; // pixels
}

export function TemperatureGauge({ value, min = -10, max = 40, size = 145 }: TemperatureGaugeProps) {
  const clamped = Math.max(min, Math.min(max, value));
  const ratio = (clamped - min) / (max - min);
  const angle = 220 * ratio - 110; // -110deg (min) -> +110deg (max)

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <svg
        width={size}
        height={size * 0.72}
        viewBox="0 0 150 108"
        className="block overflow-visible"
        aria-label={`Temperature gauge: ${Math.round(value)}°C`}
      >
        <defs>
          <linearGradient id="tempGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>

        {/* Gauge Background Track */}
        <path
          d="M 28 88 A 50 50 0 1 1 122 88"
          fill="none"
          stroke="currentColor"
          className="text-slate-200 dark:text-slate-800"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* Dynamic Colored Temperature Arc */}
        <path
          d="M 28 88 A 50 50 0 1 1 122 88"
          fill="none"
          stroke="url(#tempGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray="192"
          strokeDashoffset={192 - 192 * ratio}
        />

        {/* Gauge Scale End Labels */}
        <text x="24" y="103" textAnchor="middle" className="text-[10px] font-semibold fill-slate-400 dark:fill-slate-500">
          -10°
        </text>
        <text x="126" y="103" textAnchor="middle" className="text-[10px] font-semibold fill-slate-400 dark:fill-slate-500">
          40°
        </text>

        {/* Traditional Speedometer Needle starting from bottom center pivot */}
        <motion.g
          initial={false}
          animate={{ rotate: angle }}
          transition={useReducedMotion() ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 18 }}
          style={{ transformOrigin: '75px 72px' }}
        >
          <line
            x1="75"
            y1="72"
            x2="75"
            y2="30"
            stroke="currentColor"
            className="text-slate-900 dark:text-white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="75" cy="72" r="5" fill="currentColor" className="text-slate-900 dark:text-white" />
          <circle cx="75" cy="72" r="2" fill="currentColor" className="text-white dark:text-slate-900" />
        </motion.g>
      </svg>
      <div className="text-center mt-1">
        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Temperature</div>
        <div className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{Math.round(value)}°C</div>
      </div>
    </div>
  );
}
