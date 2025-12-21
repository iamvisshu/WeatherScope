'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemePreference = 'day' | 'night' | 'system';

type ThemeContextValue = {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'weather_scope_theme';
const TRANSITION_CLASS = 'theme-transition';
const TRANSITION_MS = 300;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize to 'system' to ensure server and client render the same initial markup
  const [theme, setThemeState] = useState<ThemePreference>('system');
  const [mounted, setMounted] = useState(false);

  // On mount, read persisted preference and update theme (avoids hydration mismatch)
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored) setThemeState(stored as ThemePreference);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    // Apply theme whenever it changes (only runs on client)
    if (!mounted) return; // don't apply until after mount to avoid flicker
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme, mounted]);

  const setTheme = (t: ThemePreference) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

function applyTheme(theme: ThemePreference) {
  const root = document.documentElement;

  // Add transition class for smooth theme changes
  root.classList.add(TRANSITION_CLASS);
  window.setTimeout(() => root.classList.remove(TRANSITION_CLASS), TRANSITION_MS);

  if (theme === 'system') {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) root.classList.add('dark');
    else root.classList.remove('dark');
    return;
  }

  if (theme === 'night') root.classList.add('dark');
  if (theme === 'day') root.classList.remove('dark');
}
