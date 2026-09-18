'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HumidityIndicatorProps {
  humidity: number; // 0-100
}

export function HumidityIndicator({ humidity }: HumidityIndicatorProps) {
  const clamped = Math.max(0, Math.min(100, humidity));
  const percent = clamped;

  return (
    <div className="w-full">
      <div className="flex flex-col mb-2">
        <div className="font-semibold text-sm text-slate-700 dark:text-slate-300">Humidity</div>
        <div className="text-xl font-bold text-slate-900 dark:text-white">{Math.round(clamped)}%</div>
      </div>

      <div className="w-full h-20 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden relative">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 right-0 bg-cyan-500/80 dark:bg-cyan-500/60"
          style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
          aria-hidden
        />
      </div>
      <div className="text-xs mt-1.5 font-medium text-slate-700 dark:text-slate-300">
        Comfort level: <span className="font-semibold text-slate-900 dark:text-slate-100">{comfortLabel(clamped)}</span>
      </div>
    </div>
  );
}

function comfortLabel(h: number) {
  if (h < 30) return 'Low';
  if (h < 60) return 'Comfortable';
  return 'High';
}
