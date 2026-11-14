import { z } from "zod";

const req = (max = 200) => z.string().trim().min(1, "Required").max(max);
const txt = (max = 200, d = "") => z.string().trim().max(max).default(d);
const url = z.string().trim().max(600).refine((v) => v === "" || /^https?:\/\/\S+$/.test(v), "Must start with http:// or https://").default("");
const lines = (n = 30) => z.array(z.string().trim().min(1).max(400)).max(n).default([]);
const flag = z.boolean().default(true);
const order = z.coerce.number().int().min(0).max(9999).default(0);

const review = z.object({
  quote: txt(800), name: txt(100), role: txt(100), company: txt(100),
  rating: z.coerce.number().int().min(0).max(5).default(5),
}).nullable();

/** One entry per collection: validation, sort order, and what the public website is allowed to see. */
export const collections = {
  jobs: {
    schema: z.object({
      title: req(), department: txt(60, "General"), type: txt(40, "Full-time"), location: txt(100, "Remote or on-site"), level: txt(60),
      summary: txt(1500), responsibilities: lines(), requirements: lines(), open: flag, posted: z.coerce.date().optional(),
    }),
    sort: { posted: -1, _id: -1 },
    publicFilter: { open: { $ne: false } },
    label: (d) => d.title,
  },
  team: {
    schema: z.object({ name: req(100), role: req(120), bio: txt(800), photo: url, order, published: flag }),
    sort: { order: 1, _id: 1 },
    publicFilter: { published: { $ne: false } },
    label: (d) => d.name,
  },
  projects: {
    schema: z.object({
      title: req(), description: txt(1500), category: txt(60), tags: lines(12), client: txt(120), industry: txt(80), year: txt(10),
      duration: txt(40), link: url, image: url, art: z.coerce.number().int().min(0).max(3).nullable().optional(), order, published: flag,
      review: review.optional(),
    }),
    sort: { order: 1, _id: -1 },
    publicFilter: { published: { $ne: false } },
    label: (d) => d.title,
  },
};

export const slugify = (t) =>
  `${String(t).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "item"}-${Math.random().toString(16).slice(2, 6)}`;
