import { cache } from "react";
import { idOf, iso, list, load, str, type Raw } from "./db";
import type { Job } from "./types";

const toJob = (d: Raw): Job => ({
  id: idOf(d),
  title: str(d.title),
  department: str(d.department, "General"),
  type: str(d.type, "Full-time"),
  location: str(d.location, "Remote or on-site"),
  level: str(d.level),
  summary: str(d.summary),
  responsibilities: list(d.responsibilities),
  requirements: list(d.requirements),
  posted: iso(d.posted ?? d.createdAt),
});

/** Open roles from the `jobs` collection (documents where `open` is not false), newest first. Deduped per request. */
export const getOpenJobs = cache(() =>
  load("jobs", { open: { $ne: false } }, { posted: -1 }, toJob, (d) => d.open !== false)
);
