# Nuel Technologies website

Next.js 14 (App Router) + TypeScript + Tailwind CSS. No runtime dependencies beyond Next and React.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Optional: set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` (Vercel > Settings > Environment Variables) so the sitemap, canonical URL and social tags use your real domain.

## Data lives in MongoDB

Open roles, team members and projects are read from MongoDB on the server. Your connection string is never sent to the browser.
Edit documents in MongoDB Atlas (or Compass) and the site updates within about a minute, no redeploy needed.

1. Copy `.env.example` to `.env.local` and fill in `MONGODB_URI` (and `MONGODB_DB`, default `nuel`).
2. On Vercel add the same variables under Settings > Environment Variables, then redeploy once.
3. In Atlas, allow Vercel to connect (Network Access > allow `0.0.0.0/0`, or use the Vercel integration).
4. Optional: `npm run seed` copies the sample documents from `data/seed.json` into your database (never overwrites existing ones).

Without `MONGODB_URI` the site shows the sample data so it still runs locally. With it set, an empty collection means an empty section.

### Collections and fields

**`jobs`** (shown when `open` is not `false`, newest `posted` first; no open jobs shows an "open application" card)
`title`, `department`, `type`, `location`, `level`, `summary`, `responsibilities` (array), `requirements` (array), `posted` (Date), `open` (Boolean)

**`team`** (shown when `published` is not `false`, sorted by `order`; section hidden if empty)
`name`, `role`, `bio`, `photo` (image URL, optional), `order` (Number), `published` (Boolean)

**`projects`** (shown when `published` is not `false`, sorted by `order`; first two are shown, the rest appear with "View more projects")
`title`, `description`, `category`, `tags` (array), `client`, `industry`, `year`, `duration`, `link` (optional), `image` (URL, optional, otherwise abstract art is used), `order`, `published`, and the client's final review:
```json
"review": { "quote": "...", "name": "Jane Doe", "role": "CEO", "company": "Acme", "rating": 5 }
```

## Other things to edit
| What | File |
| --- | --- |
| Contact details, WhatsApp number, navigation | `lib/site.ts` |
| Written copy: about, services, process, FAQ, benefits, planner options | `lib/content.ts` |
| Brand colours (dark and light) | `app/globals.css` (CSS variables at the top) |
| Fonts, SEO metadata | `app/layout.tsx` |

## Features
- Dark and light theme with a smooth cross-fade, remembered per visitor, no flash on load
- Abstract rotating global-network hero (canvas, pauses when off-screen, respects reduced motion)
- Four-step project planner that produces a ready-to-send brief by email or WhatsApp
- Floating WhatsApp button, FAQ and careers accordions with smooth height animation
- Cursor-spotlight cards, scroll reveals, parallax, scroll progress bar
- SEO: metadata, Open Graph, sitemap, robots, Organization and FAQ structured data
- Accessibility: skip link, keyboard focus styles, aria states, reduced-motion support

## Structure
```
app/            layout, page, global styles, sitemap, robots, icon, 404
components/     one file per section + shared pieces (Reveal, Collapse, Icon, ...)
lib/            site info, jobs, team, content
```
Client components are limited to interactive pieces (Header, ThemeToggle, GlobeVisual, Reveal, Counter, Effects, JobBoard, Faq, ProjectWizard, WhatsApp). Everything else renders on the server.
