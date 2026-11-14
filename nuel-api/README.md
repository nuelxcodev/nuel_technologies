# Nuel API

Express server that sits between MongoDB and the two apps:

```
Admin dashboard (Electron) --JWT--> /api/admin/*  --\
                                                     >-- Nuel API --> MongoDB
Website (Next.js, server-side) --x-api-key--> /api/public/*  --/
```

## Run
```bash
npm install
cp .env.example .env        # fill it in
npm run create-admin -- you@company.com "a-long-password"
npm run dev                 # http://localhost:4000
npm run seed                # optional placeholder content
```

## Endpoints
| Method | Path | Who | Purpose |
| --- | --- | --- | --- |
| GET | `/health` | anyone | status check |
| POST | `/api/auth/login` | anyone (10 tries / 15 min) | returns an 8 hour token |
| POST | `/api/auth/password` | admin | change password |
| GET | `/api/public/{jobs,team,projects}` | website (`x-api-key`) | published content only |
| GET | `/api/files/:id` | anyone | uploaded images |
| GET/POST | `/api/admin/{jobs,team,projects}` | admin | list / create |
| PUT/DELETE | `/api/admin/{jobs,team,projects}/:id` | admin | update / delete |
| POST | `/api/admin/upload` | admin | upload an image (PNG, JPEG, WebP, GIF, max 4 MB, stored in MongoDB) |

## Security notes
- Passwords are bcrypt-hashed; tokens expire after 8 hours; login is rate limited.
- All input is validated with zod; uploads are identified by file signature, not file name.
- Only `jobs` with `open != false` and `team` / `projects` with `published != false` are ever returned to the website.
- Deploy behind HTTPS (Render, Railway, Fly.io, a VPS with Caddy/Nginx). Never expose `.env`.
