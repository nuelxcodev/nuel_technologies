import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { MulterError } from "multer";
import { ZodError } from "zod";
import { changePassword, login, requireAuth } from "./auth.js";
import { config } from "./config.js";
import { closeDb, connect, getDb } from "./db.js";
import { adminRouter } from "./routes/admin.js";
import { publicRouter, serveFile } from "./routes/public.js";

const app = express();
app.set("trust proxy", 1);
app.disable("x-powered-by");
// Images must be embeddable from the website's domain.
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(rateLimit({ windowMs: 60_000, limit: 600, standardHeaders: true, legacyHeaders: false }));
app.use(express.json({ limit: "200kb" }));

app.get("/health", async (_req, res) => {
  try { await getDb().command({ ping: 1 }); res.json({ ok: true }); } catch { res.status(503).json({ ok: false }); }
});

app.post("/api/auth/login", rateLimit({ windowMs: 15 * 60_000, limit: 10, standardHeaders: true, legacyHeaders: false, message: { error: "Too many attempts. Try again in a few minutes." } }), login);
app.post("/api/auth/password", requireAuth, changePassword);
app.get("/api/auth/me", requireAuth, (req, res) => res.json({ email: req.admin.email }));

app.get("/api/files/:id", serveFile);
app.use("/api/public", publicRouter());
app.use("/api/admin", adminRouter());

app.use((_req, res) => res.status(404).json({ error: "Not found." }));
app.use((err, _req, res, _next) => {
  if (err instanceof ZodError) return res.status(400).json({ error: "Please check the highlighted fields.", issues: err.issues.map((i) => ({ path: i.path.join("."), message: i.message })) });
  if (err instanceof MulterError) return res.status(400).json({ error: err.code === "LIMIT_FILE_SIZE" ? "Image is too large (max 4 MB)." : "Upload failed." });
  if (err?.type === "entity.parse.failed") return res.status(400).json({ error: "Invalid JSON." });
  console.error(err);
  res.status(500).json({ error: "Server error." });
});

await connect();
const server = app.listen(config.port, () => console.log(`Nuel API listening on :${config.port}`));
for (const s of ["SIGINT", "SIGTERM"]) process.on(s, () => server.close(async () => { await closeDb(); process.exit(0); }));
