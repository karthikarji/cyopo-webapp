const cache = new Map<string, Promise<any>>();

/**
 * Deduplicates in-flight GET requests.
 * If the same URL+params is called twice before the response arrives,
 * the second call reuses the first promise instead of firing a new request.
 * Cache entry is cleared automatically when the request completes (success or error).
 */
export function deduplicateRequest<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  if (cache.has(key)) {
    return cache.get(key) as Promise<T>;
  }
  const promise = fetcher().finally(() => cache.delete(key));
  cache.set(key, promise);
  return promise;
}
