'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WindIndicatorProps {
  speed: number; // km/h
  direction?: number; // degrees (0 = north)
}

export function WindIndicator({ speed, direction = 0 }: WindIndicatorProps) {
  const rotate = (direction + 180) % 360; // point arrow to wind direction

  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-inner">
        <svg className="w-8 h-8 text-slate-800 dark:text-slate-100" viewBox="0 0 24 24">
          <motion.g
            initial={false}
            animate={{ rotate: rotate }}
            transition={{ type: 'spring', stiffness: 110, damping: 14 }}
            style={{ transformOrigin: '12px 12px' }}
          >
            <path d="M4 12h12l-3-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 12h12l-3 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </svg>
      </div>
      <div className="text-center mt-2">
        <div className="font-semibold text-sm text-slate-700 dark:text-slate-300">Wind</div>
        <div className="text-base font-bold text-slate-900 dark:text-white">{Math.round(speed)} km/h</div>
      </div>
    </div>
  );
}
