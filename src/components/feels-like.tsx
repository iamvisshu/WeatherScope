'use client';

import React from 'react';
import { Thermometer } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

interface FeelsLikeProps {
  value: number;
  unit?: 'C' | 'F';
}

export function FeelsLike({ value, unit = 'C' }: FeelsLikeProps) {
  const ariaLabel = `Feels like ${Math.round(value)} degrees ${unit === 'C' ? 'Celsius' : 'Fahrenheit'}`;

  return (
    <TooltipProvider delayDuration={120}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2" role="group" aria-label={ariaLabel}>
            <Thermometer className="w-4 h-4 text-muted-foreground" aria-hidden />
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
