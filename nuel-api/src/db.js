import { GridFSBucket, MongoClient } from "mongodb";
import { config } from "./config.js";

let client;
let db;

export async function connect() {
  client = new MongoClient(config.mongoUri, { maxPoolSize: 10, serverSelectionTimeoutMS: 8000 });
  await client.connect();
  db = client.db(config.dbName);
  await db.collection("admins").createIndex({ email: 1 }, { unique: true });
  await Promise.all(["jobs", "team", "projects"].map((c) => db.collection(c).createIndex({ slug: 1 })));
  return db;
}

export const getDb = () => db;
export const bucket = () => new GridFSBucket(db, { bucketName: "uploads" });
export const closeDb = () => client?.close();
