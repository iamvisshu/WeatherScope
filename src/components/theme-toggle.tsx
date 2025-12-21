'use client';

import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const setSystem = () => setTheme('system');
  const setLight = () => setTheme('day');
  const setDark = () => setTheme('night');

  const isSystem = theme === 'system';
  const isLight = theme === 'day';
  const isDark = theme === 'night';

  // Avoid rendering the interactive controls until client has mounted to prevent any hydration mismatch
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="inline-flex items-center rounded-md bg-popover/50 dark:bg-popover/50 p-0.5" aria-hidden>
        <div className="px-3 py-1 rounded-l-md text-sm font-medium opacity-40">
          <Monitor className="w-4 h-4 inline-block mr-2 align-text-bottom" />
          <span className="hidden md:inline">System</span>
        </div>
        <div className="px-3 py-1 text-sm font-medium opacity-40">
          <Sun className="w-4 h-4 inline-block mr-2 align-text-bottom" />
          <span className="hidden md:inline">Light</span>
        </div>
        <div className="px-3 py-1 rounded-r-md text-sm font-medium opacity-40">
          <Moon className="w-4 h-4 inline-block mr-2 align-text-bottom" />
          <span className="hidden md:inline">Dark</span>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={100}>
      <div className="inline-flex items-center rounded-md bg-popover/50 dark:bg-popover/50 p-0.5" role="tablist" aria-label="Theme selector">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={setSystem}
              aria-pressed={isSystem}
              className={`px-3 py-1 rounded-l-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring ${isSystem ? 'bg-accent text-primary-foreground' : 'hover:bg-accent/10 dark:hover:bg-accent/20'}`}
              title="System – follow OS preference"
            >
              <Monitor className="w-4 h-4 inline-block mr-2 align-text-bottom" />
              <span className="align-middle hidden md:inline">System</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="text-sm">System — follow OS preference</div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={setLight}
              aria-pressed={isLight}
              className={`px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring ${isLight ? 'bg-accent text-primary-foreground' : 'hover:bg-accent/10 dark:hover:bg-accent/20'}`}
              title="Light – force light theme"
            >
              <Sun className="w-4 h-4 inline-block mr-2 align-text-bottom text-yellow-500" />
              <span className="align-middle hidden md:inline">Light</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="text-sm">Light — force light theme</div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={setDark}
              aria-pressed={isDark}
              className={`px-3 py-1 rounded-r-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring ${isDark ? 'bg-accent text-primary-foreground' : 'hover:bg-accent/10 dark:hover:bg-accent/20'}`}
              title="Dark – force dark theme"
            >
              <Moon className="w-4 h-4 inline-block mr-2 align-text-bottom text-blue-300" />
              <span className="align-middle hidden md:inline">Dark</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="text-sm">Dark — force dark theme</div>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
