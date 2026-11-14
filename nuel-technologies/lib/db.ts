import seed from "@/data/seed.json";

export type Raw = Record<string, unknown>;

const base = process.env.API_URL?.replace(/\/+$/, "");

/** True when API_URL is not set, so the site shows the sample data from data/seed.json. */
export const usingSamples = !base;

export const str = (v: unknown, d = ""): string => (typeof v === "string" ? v.trim() : typeof v === "number" ? String(v) : d);
export const list = (v: unknown): string[] => (Array.isArray(v) ? v.map((x) => str(x)).filter(Boolean) : []);
export const iso = (v: unknown): string => {
  if (!v) return "";
  const d = new Date(v as string | number | Date);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString();
};
export const idOf = (d: Raw): string => str(d.id) || str(d.slug);

/**
 * Reads published content from the Nuel API (server-side only; the API key never reaches the browser).
 * No API_URL -> sample data. In production an API failure throws, so Next.js keeps serving the last good page
 * instead of publishing an empty one. In development it returns an empty list so you can keep working.
 */
export async function load<T>(name: "jobs" | "team" | "projects", map: (d: Raw) => T, keep: (d: Raw) => boolean = () => true): Promise<T[]> {
  if (!base) return (seed[name] as unknown as Raw[]).filter(keep).map(map);
  try {
    const res = await fetch(`${base}/api/public/${name}`, { headers: { "x-api-key": process.env.API_KEY ?? "" }, next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const data = (await res.json()) as { items?: Raw[] };
    return (data.items ?? []).map(map);
  } catch (e) {
    console.error(`[api] failed to load "${name}":`, e);
    if (process.env.NODE_ENV === "production") throw e;
    return [];
  }
}
