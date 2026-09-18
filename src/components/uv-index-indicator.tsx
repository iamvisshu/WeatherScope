'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface UVIndexProps {
  uv: number;
}

export function UVIndexIndicator({ uv }: UVIndexProps) {
  const level = Math.max(0, Math.min(11, uv));
  const percent = (level / 11) * 100;
  const reduceMotion = useReducedMotion();

  const getLabel = (uv: number) => {
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    if (uv <= 10) return 'Very High';
    return 'Extreme';
  };

  const getLabelColor = (uv: number) => {
    if (uv <= 2) return 'text-emerald-700 dark:text-emerald-400';
    if (uv <= 5) return 'text-amber-700 dark:text-amber-400';
    if (uv <= 7) return 'text-orange-700 dark:text-orange-400';
    if (uv <= 10) return 'text-red-700 dark:text-red-400';
    return 'text-purple-700 dark:text-purple-400';
  };

  const ariaLabel = `UV Index: ${uv}, ${getLabel(uv)}.`;

  return (
    <div className="w-full max-w-xs" aria-label={ariaLabel}>
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-sm text-slate-700 dark:text-slate-300">UV Index</div>
        <div className="text-base font-bold text-slate-900 dark:text-white">{uv}</div>
      </div>

      <div
        className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={11}
        aria-valuenow={uv}
        aria-label={ariaLabel}
      >
        <motion.div
          className="h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
          style={{ background: getUVGradient(uv) }}
          aria-hidden
        />
      </div>

      <div className={`text-xs mt-1.5 font-semibold ${getLabelColor(uv)}`}>{getLabel(uv)}</div>
    </div>
  );
}

function getUVGradient(uv: number) {
  if (uv <= 2) return 'linear-gradient(90deg, #34d399, #10b981)';
  if (uv <= 5) return 'linear-gradient(90deg, #fbbf24, #f59e0b)';
  if (uv <= 7) return 'linear-gradient(90deg, #fb923c, #ea580c)';
  if (uv <= 10) return 'linear-gradient(90deg, #f87171, #dc2626)';
  return 'linear-gradient(90deg, #c084fc, #9333ea)';
}
