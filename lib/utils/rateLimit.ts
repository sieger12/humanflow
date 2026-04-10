// In-memory rate limiter — per serverless instance.
// For production with multiple instances, replace with Upstash Redis / Vercel KV.

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}
