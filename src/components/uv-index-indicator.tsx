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

  const ariaLabel = `UV Index: ${uv}, ${getLabel(uv)}.`;

  return (
    <div className="w-full max-w-xs" aria-label={ariaLabel}>
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">UV Index</div>
        <div className="text-sm text-muted-foreground">{uv}</div>
      </div>

      <div
        className="w-full h-3 bg-muted rounded-full overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={11}
        aria-valuenow={uv}
        aria-label={ariaLabel}
      >
        <motion.div
          className={`h-3 rounded-full`} 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
          style={{ background: getUVGradient(uv) }}
          aria-hidden
        />
      </div>

      <div className="text-xs mt-1 text-muted-foreground">{getLabel(uv)}</div>
    </div>
  );
}

function getUVGradient(uv: number) {
  if (uv <= 2) return 'linear-gradient(90deg,#d1fae5,#bbf7d0)';
  if (uv <= 5) return 'linear-gradient(90deg,#fef3c7,#fde68a)';
  if (uv <= 7) return 'linear-gradient(90deg,#ffedd5,#fb923c)';
  if (uv <= 10) return 'linear-gradient(90deg,#fecaca,#ef4444)';
  return 'linear-gradient(90deg,#f5d0fe,#7c3aed)';
}
