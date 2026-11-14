const need = (k) => {
  const v = process.env[k];
  if (!v) { console.error(`Missing environment variable: ${k} (see .env.example)`); process.exit(1); }
  return v;
};

export const config = {
  port: Number(process.env.PORT) || 4000,
  mongoUri: need("MONGODB_URI"),
  dbName: process.env.MONGODB_DB || "nuel",
  jwtSecret: need("JWT_SECRET"),
  apiKey: need("WEBSITE_API_KEY"),
  publicUrl: (process.env.PUBLIC_API_URL || `http://localhost:${process.env.PORT || 4000}`).replace(/\/+$/, ""),
};

if (config.jwtSecret.length < 32) { console.error("JWT_SECRET must be at least 32 characters."); process.exit(1); }
