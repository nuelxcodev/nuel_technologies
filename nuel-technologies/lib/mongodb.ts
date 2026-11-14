import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
export const dbConfigured = Boolean(uri);

declare global {
  // eslint-disable-next-line no-var
  var __mongoClient: Promise<MongoClient> | undefined;
}

export async function getDb(): Promise<Db> {
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!global.__mongoClient) {
    global.__mongoClient = new MongoClient(uri, { maxPoolSize: 5, serverSelectionTimeoutMS: 6000 })
      .connect()
      .catch((e) => { global.__mongoClient = undefined; throw e; });
  }
  return (await global.__mongoClient).db(process.env.MONGODB_DB || "nuel");
}
