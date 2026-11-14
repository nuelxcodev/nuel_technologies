import crypto from "node:crypto";
import { Router } from "express";
import { ObjectId } from "mongodb";
import { wrap } from "../auth.js";
import { config } from "../config.js";
import { bucket, getDb } from "../db.js";
import { collections } from "../schemas.js";
import { out } from "./admin.js";

const same = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

/** Read-only endpoints used by the website. Protected by a shared key sent in the x-api-key header. */
export function publicRouter() {
  const r = Router();
  r.use((req, res, next) => (same(req.headers["x-api-key"] ?? "", config.apiKey) ? next() : res.status(401).json({ error: "Invalid API key." })));

  for (const [name, { sort, publicFilter }] of Object.entries(collections)) {
    r.get(`/${name}`, wrap(async (_req, res) => {
      const items = await getDb().collection(name).find(publicFilter, { projection: { slug: 0, createdAt: 0, updatedAt: 0 } }).sort(sort).toArray();
      res.set("Cache-Control", "no-store").json({ items: items.map(out) });
    }));
  }
  return r;
}

/** Uploaded images. Public so <img> tags on the website can load them. */
export const serveFile = wrap(async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(404).end();
  const _id = new ObjectId(id);
  const file = await getDb().collection("uploads.files").findOne({ _id });
  if (!file) return res.status(404).end();
  res.set({ "Content-Type": file.metadata?.contentType || "application/octet-stream", "Cache-Control": "public, max-age=31536000, immutable" });
  bucket().openDownloadStream(_id).on("error", () => res.destroy()).pipe(res);
});
