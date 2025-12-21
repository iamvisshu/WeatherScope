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
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">Humidity</div>
        <div className="text-sm text-muted-foreground">{Math.round(clamped)}%</div>
      </div>

      <div className="w-full h-20 bg-muted rounded-lg overflow-hidden relative">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 right-0 bg-cyan-400/80 dark:bg-cyan-600/40"
          style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
          aria-hidden
        />
      </div>
      <div className="text-xs mt-1 text-muted-foreground">Comfort level: {comfortLabel(clamped)}</div>
    </div>
  );
}

function comfortLabel(h: number) {
  if (h < 30) return 'Low';
  if (h < 60) return 'Comfortable';
  return 'High';
}
