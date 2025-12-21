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
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/60 dark:bg-gray-800/60">
        <svg className="w-8 h-8" viewBox="0 0 24 24">
          <motion.g animate={{ rotate: rotate }} transition={{ type: 'spring', stiffness: 110, damping: 14 }} transformOrigin="12px 12px">
            <path d="M4 12h12l-3-3" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 12h12l-3 3" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </svg>
      </div>
      <div className="text-center">
        <div className="font-semibold">Wind</div>
        <div className="text-sm">{Math.round(speed)} km/h</div>
      </div>
    </div>
  );
}
