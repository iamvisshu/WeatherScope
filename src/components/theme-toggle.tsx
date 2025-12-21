'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Mounted state to avoid hydration mismatch
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const isDark = theme === 'night' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = () => {
    setTheme(isDark ? 'day' : 'night');
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-full bg-white/20 backdrop-blur-sm border-2 border-gray-300 dark:border-gray-500 hover:bg-white/40 dark:bg-black/20 dark:hover:bg-black/40 transition-all shadow-sm">
      {isDark ? (
        <Moon className="h-[1.2rem] w-[1.2rem] text-blue-200" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
