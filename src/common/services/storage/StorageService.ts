/**
 * StorageService
 * Abstracts localStorage so nothing in the app touches it directly.
 * If we ever switch to sessionStorage or IndexedDB, only this file changes.
 */

const StorageService = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.warn(`StorageService: failed to set key "${key}"`);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      console.warn(`StorageService: failed to remove key "${key}"`);
    }
  },

  clear(): void {
    try {
      localStorage.clear();
    } catch {
      console.warn("StorageService: failed to clear storage");
    }
  },

  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  },
};

export default StorageService;
