// Loads the sample data from data/seed.json into MongoDB. Safe to re-run: existing documents are never overwritten.
//   npm run seed        (reads MONGODB_URI and MONGODB_DB from .env.local)
import { MongoClient } from "mongodb";
import { readFileSync } from "node:fs";

const uri = process.env.MONGODB_URI;
if (!uri) { console.error("MONGODB_URI is not set. Add it to .env.local first."); process.exit(1); }

const seed = JSON.parse(readFileSync(new URL("../data/seed.json", import.meta.url), "utf8"));
const client = new MongoClient(uri);
try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "nuel");
  for (const [name, docs] of Object.entries(seed)) {
    const col = db.collection(name);
    await col.createIndex({ slug: 1 }, { unique: true });
    let added = 0;
    for (const d of docs) {
      const doc = { ...d, ...(d.posted ? { posted: new Date(d.posted) } : {}), open: d.open ?? (name === "jobs" ? true : undefined) };
      if (doc.open === undefined) delete doc.open;
      const r = await col.updateOne({ slug: d.slug }, { $setOnInsert: doc }, { upsert: true });
      if (r.upsertedCount) added++;
    }
    console.log(`${name}: ${added} added, ${docs.length - added} already existed`);
  }
} finally {
  await client.close();
}
