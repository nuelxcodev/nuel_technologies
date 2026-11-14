# Nuel Technologies website

Next.js 14 (App Router) + TypeScript + Tailwind CSS. No runtime dependencies beyond Next and React.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Optional: set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` (Vercel > Settings > Environment Variables) so the sitemap, canonical URL and social tags use your real domain.

## Data comes from the Nuel API

The website never touches the database. Open roles, team members and projects are fetched server-side from the Nuel API
(`/api/public/jobs`, `/team`, `/projects`) and refreshed at most once a minute, so edits made in the admin dashboard appear without a redeploy.

1. Deploy the **nuel-api** project first (see its README) and note its address.
2. Copy `.env.example` to `.env.local` and set `API_URL` and `API_KEY` (the key must match `WEBSITE_API_KEY` in the API).
3. On Vercel add the same two variables under Settings > Environment Variables, then redeploy once.

Without `API_URL` the site shows sample content from `data/seed.json`, so it still runs locally.
With `API_URL` set, an empty list means an empty section. If the API is down when a page refreshes, the last good version keeps being served; a production build fails if the API cannot be reached, so deploy the API first.

Manage content with the **nuel-admin** desktop app. Field reference: jobs (`title`, `department`, `type`, `location`, `level`, `summary`, `responsibilities[]`, `requirements[]`, `open`), team (`name`, `role`, `bio`, `photo`, `order`, `published`), projects (`title`, `description`, `category`, `tags[]`, `client`, `industry`, `year`, `duration`, `link`, `image`, `order`, `published`, `review{quote,name,role,company,rating}`).

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
