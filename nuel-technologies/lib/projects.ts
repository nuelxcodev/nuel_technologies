import { cache } from "react";
import { idOf, list, load, str, type Raw } from "./db";
import type { Project, Review } from "./types";

const toReview = (v: unknown): Review | null => {
  if (!v || typeof v !== "object") return null;
  const r = v as Raw;
  const quote = str(r.quote ?? r.text);
  if (!quote) return null;
  return { quote, name: str(r.name), role: str(r.role), company: str(r.company), rating: Math.max(0, Math.min(5, Math.round(Number(r.rating) || 0))) };
};

const toProject = (d: Raw): Project => ({
  id: idOf(d),
  title: str(d.title),
  description: str(d.description ?? d.text),
  category: str(d.category),
  tags: list(d.tags),
  client: str(d.client),
  industry: str(d.industry),
  year: str(d.year),
  duration: str(d.duration),
  link: str(d.link),
  image: str(d.image),
  art: Number.isFinite(Number(d.art)) && d.art !== undefined && d.art !== null && d.art !== "" ? Number(d.art) : null,
  review: toReview(d.review),
});

/** Projects from the `projects` collection (documents where `published` is not false), sorted by `order`. */
export const getProjects = cache(() =>
  load("projects", { published: { $ne: false } }, { order: 1, _id: -1 }, toProject, (d) => d.published !== false)
);
