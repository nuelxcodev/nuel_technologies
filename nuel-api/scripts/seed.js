// Optional: loads placeholder jobs, team and projects from data/seed.json. Never overwrites existing documents.
import { readFileSync } from "node:fs";
import { closeDb, connect } from "../src/db.js";

const seed = JSON.parse(readFileSync(new URL("../data/seed.json", import.meta.url), "utf8"));
const db = await connect();
for (const [name, docs] of Object.entries(seed)) {
  let added = 0;
  for (const d of docs) {
    const now = new Date();
    const doc = { ...d, createdAt: now, updatedAt: now, ...(d.posted ? { posted: new Date(d.posted) } : {}), ...(name === "jobs" ? { open: true } : { published: true }) };
    const r = await db.collection(name).updateOne({ slug: d.slug }, { $setOnInsert: doc }, { upsert: true });
    if (r.upsertedCount) added++;
  }
  console.log(`${name}: ${added} added, ${docs.length - added} already existed`);
}
await closeDb();
