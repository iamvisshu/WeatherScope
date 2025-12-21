'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Thermometer } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

interface FeelsLikeProps {
  value: number;
  unit?: 'C' | 'F';
}

export function FeelsLike({ value, unit = 'C' }: FeelsLikeProps) {
  const ariaLabel = `Feels like ${Math.round(value)} degrees ${unit === 'C' ? 'Celsius' : 'Fahrenheit'}`;
  const reduceMotion = useReducedMotion();
  const [pulse, setPulse] = React.useState(false);

  React.useEffect(() => {
    if (reduceMotion) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(t);
  }, [value, reduceMotion]);

  return (
    <TooltipProvider delayDuration={120}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2" role="group" aria-label={ariaLabel}>
            <motion.span
              className="inline-flex"
              aria-hidden
              animate={reduceMotion ? {} : { y: pulse ? -3 : 0, scale: pulse ? 1.06 : 1 }}
              transition={reduceMotion ? {} : { type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Thermometer className="w-4 h-4 text-muted-foreground" />
            </motion.span>
            <span className="text-sm text-muted-foreground">Feels like <span className="font-semibold">{Math.round(value)}°{unit}</span></span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <div className="max-w-xs text-sm">The "feels like" temperature (apparent temperature) accounts for humidity and wind; it represents how the air temperature feels to the human body.</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
