# Nuel Technologies platform

```
 nuel-admin (Electron)  --->  nuel-api (Express)  --->  MongoDB
                                    ^
 nuel-technologies (Next.js) --------+   (read-only, published content)
```

| Folder | What it is | Deploy to |
| --- | --- | --- |
| `nuel-technologies/` | Public website (Next.js + Tailwind). Reads from the API only. | Vercel |
| `nuel-api/` | Express server: login, validation, image uploads, read-only public feed. The only thing that talks to MongoDB. | Render, Railway, Fly.io or a VPS (HTTPS) |
| `nuel-admin/` | Desktop dashboard for adding jobs, team members and projects. Installs on your computer. | Build an installer with `npm run dist` |

## Setup order
1. **API:** `cd nuel-api`, `npm install`, copy `.env.example` to `.env` and fill it in, `npm run create-admin -- you@company.com "long-password"`, `npm run dev`. Then deploy it over HTTPS.
2. **Admin:** `cd nuel-admin`, `npm install`, `npm start`. Sign in with the API address and the admin you created. Add your jobs, team and projects.
3. **Website:** set `API_URL` and `API_KEY` (same value as the API's `WEBSITE_API_KEY`) in Vercel and redeploy.

Each folder has its own README.
