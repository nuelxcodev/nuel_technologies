import type { Document, Filter, Sort } from "mongodb";
import seed from "@/data/seed.json";
import { dbConfigured, getDb } from "./mongodb";

export type Raw = Record<string, unknown>;

/** True when no MONGODB_URI is set, so the site shows the sample data from data/seed.json. */
export const usingSamples = !dbConfigured;

export const str = (v: unknown, d = ""): string => (typeof v === "string" ? v.trim() : typeof v === "number" ? String(v) : d);
export const list = (v: unknown): string[] => (Array.isArray(v) ? v.map((x) => str(x)).filter(Boolean) : typeof v === "string" && v.trim() ? v.split(",").map((x) => x.trim()).filter(Boolean) : []);
export const iso = (v: unknown): string => {
  if (!v) return "";
  const d = new Date(v as string | number | Date);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString();
};
export const idOf = (d: Raw): string => str(d.slug) || str(d.id) || (d._id != null ? String(d._id) : "");

/** Reads a collection. No MONGODB_URI -> sample data. Database error -> empty list (and a server log). */
export async function load<T>(name: "jobs" | "team" | "projects", query: Filter<Document>, sort: Sort, map: (d: Raw) => T, keep: (d: Raw) => boolean = () => true): Promise<T[]> {
  if (!dbConfigured) return (seed[name] as unknown as Raw[]).filter(keep).map(map);
  try {
    const db = await getDb();
    const docs = await db.collection(name).find(query).sort(sort).toArray();
    return docs.map((d) => map(d as unknown as Raw));
  } catch (e) {
    console.error(`[db] failed to read "${name}":`, e);
    return [];
  }
}
