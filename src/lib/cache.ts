/**
 * Simple in-memory cache with TTL for WeatherScope (development use only).
 * For production, switch to Redis or another persistent cache.
 */

type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

class SimpleCache {
  private store = new Map<string, CacheEntry<any>>();
  private hits = 0;
  private misses = 0;

  constructor() { }

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    const now = Date.now();
    if (!entry) {
      this.misses += 1;
      return null;
    }
    if (entry.expiresAt < now) {
      this.store.delete(key);
      this.misses += 1;
      return null;
    }
    this.hits += 1;
    return entry.value as T;
  }

  set<T>(key: string, value: T, ttlMs: number) {
    const expiresAt = Date.now() + ttlMs;
    this.store.set(key, { value, expiresAt });
  }

  delete(key: string) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
    this.hits = 0;
    this.misses = 0;
  }

  stats() {
    return { hits: this.hits, misses: this.misses, size: this.store.size };
  }
}

export const cache = new SimpleCache();

// Standard TTL for weather data (5 minutes)
export const DEFAULT_WEATHER_TTL_MS = 1 * 60 * 1000; // 1 minute (reduced for better day/night updates)
