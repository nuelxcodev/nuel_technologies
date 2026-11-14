# Nuel Technologies website

Next.js 14 (App Router) + TypeScript + Tailwind CSS. No runtime dependencies beyond Next and React.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Optional: set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` (Vercel > Settings > Environment Variables) so the sitemap, canonical URL and social tags use your real domain.

## Where to edit things

| What | File |
| --- | --- |
| Contact details, WhatsApp number, navigation | `lib/site.ts` |
| **Job postings** (add, edit, close) | `lib/jobs.ts` |
| Team members and photos | `lib/team.ts` (+ images in `public/team/`) |
| All written copy: about, services, process, FAQ, benefits, projects, planner options | `lib/content.ts` |
| Brand colours (dark and light) | `app/globals.css` (CSS variables at the top) |
| Fonts, SEO metadata | `app/layout.tsx` |

### Job postings
Add an object to the `jobs` array in `lib/jobs.ts`. Set `open: false` or delete it to take it down.
When no job is open, the Careers section automatically shows an "open application" card, and the hero badge switches from "We're hiring" back to "Now taking new projects".
`getOpenJobs()` is async so you can later swap it for a CMS, database or API call without changing any UI.

### Sample content to replace before launch
`lib/team.ts` (names and bios), `lib/content.ts` > `projects`, `benefits`, `faqs` pricing and timeline wording, and the job listings in `lib/jobs.ts`.

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
