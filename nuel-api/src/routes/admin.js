import { Router } from "express";
import multer from "multer";
import { ObjectId } from "mongodb";
import { requireAuth, wrap } from "../auth.js";
import { config } from "../config.js";
import { bucket, getDb } from "../db.js";
import { collections, slugify } from "../schemas.js";

export const out = ({ _id, ...rest }) => ({ id: String(_id), ...rest });
const oid = (id) => (ObjectId.isValid(id) && String(new ObjectId(id)) === id ? new ObjectId(id) : null);

// Identify images by their first bytes, never by the filename or the browser-supplied type.
function sniff(b) {
  if (b.length < 12) return null;
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "image/png";
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (b.toString("ascii", 0, 4) === "GIF8") return "image/gif";
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") return "image/webp";
  return null;
}

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 4 * 1024 * 1024, files: 1 } });

export function adminRouter() {
  const r = Router();
  r.use(requireAuth);

  for (const [name, { schema, sort }] of Object.entries(collections)) {
    const col = () => getDb().collection(name);

    r.get(`/${name}`, wrap(async (_req, res) => {
      res.json({ items: (await col().find().sort(sort).toArray()).map(out) });
    }));

    r.post(`/${name}`, wrap(async (req, res) => {
      const data = schema.parse(req.body);
      const now = new Date();
      const doc = { ...data, slug: slugify(data.title ?? data.name), createdAt: now, updatedAt: now };
      if (name === "jobs" && !doc.posted) doc.posted = now;
      const { insertedId } = await col().insertOne(doc);
      res.status(201).json(out({ _id: insertedId, ...doc }));
    }));

    r.put(`/${name}/:id`, wrap(async (req, res) => {
      const _id = oid(req.params.id);
      if (!_id) return res.status(400).json({ error: "Invalid id." });
      const data = schema.partial().parse(req.body);
      const updated = await col().findOneAndUpdate({ _id }, { $set: { ...data, updatedAt: new Date() } }, { returnDocument: "after" });
      if (!updated) return res.status(404).json({ error: "Not found." });
      res.json(out(updated));
    }));

    r.delete(`/${name}/:id`, wrap(async (req, res) => {
      const _id = oid(req.params.id);
      if (!_id) return res.status(400).json({ error: "Invalid id." });
      const { deletedCount } = await col().deleteOne({ _id });
      if (!deletedCount) return res.status(404).json({ error: "Not found." });
      res.json({ ok: true });
    }));
  }

  r.post("/upload", upload.single("file"), wrap(async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file received." });
    const type = sniff(req.file.buffer);
    if (!type) return res.status(400).json({ error: "Only PNG, JPEG, WebP or GIF images are allowed." });
    const stream = bucket().openUploadStream(`${Date.now()}`, { metadata: { contentType: type } });
    stream.end(req.file.buffer);
    await new Promise((ok, fail) => stream.on("finish", ok).on("error", fail));
    res.status(201).json({ url: `${config.publicUrl}/api/files/${stream.id}` });
  }));

  return r;
}
