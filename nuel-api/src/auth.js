import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { config } from "./config.js";
import { getDb } from "./db.js";

const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 10); // keeps login timing similar for unknown emails

export const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

export function requireAuth(req, res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : "";
  try {
    req.admin = jwt.verify(token, config.jwtSecret);
    next();
  } catch {
    res.status(401).json({ error: "Please sign in again." });
  }
}

export const login = wrap(async (req, res) => {
  const { email, password } = z.object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(1).max(200) }).parse(req.body);
  const user = await getDb().collection("admins").findOne({ email });
  const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !ok) return res.status(401).json({ error: "Incorrect email or password." });
  const token = jwt.sign({ sub: String(user._id), email: user.email }, config.jwtSecret, { expiresIn: "8h" });
  res.json({ token, email: user.email, expiresIn: 8 * 3600 });
});

export const changePassword = wrap(async (req, res) => {
  const { current, next } = z.object({ current: z.string().min(1).max(200), next: z.string().min(10, "Use at least 10 characters").max(200) }).parse(req.body);
  const col = getDb().collection("admins");
  const user = await col.findOne({ email: req.admin.email });
  if (!user || !(await bcrypt.compare(current, user.passwordHash))) return res.status(400).json({ error: "Current password is incorrect." });
  await col.updateOne({ _id: user._id }, { $set: { passwordHash: await bcrypt.hash(next, 12), updatedAt: new Date() } });
  res.json({ ok: true });
});
