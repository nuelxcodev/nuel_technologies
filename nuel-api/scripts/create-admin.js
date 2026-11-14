// Usage: npm run create-admin -- you@company.com "a-long-password"
import bcrypt from "bcryptjs";
import { closeDb, connect } from "../src/db.js";

const [email, password] = process.argv.slice(2);
if (!email || !password || password.length < 10) { console.error('Usage: npm run create-admin -- email "password-of-10+-characters"'); process.exit(1); }

const db = await connect();
await db.collection("admins").updateOne(
  { email: email.trim().toLowerCase() },
  { $set: { passwordHash: await bcrypt.hash(password, 12), updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
  { upsert: true }
);
console.log(`Admin ready: ${email.trim().toLowerCase()}`);
await closeDb();
