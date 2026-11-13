# Nuel Technologies website

Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Edit content

All copy, services, projects, jobs and contact details live in `lib/data.ts`.
Brand colors and animations are in `tailwind.config.ts`.

## Structure

```
app/            layout (fonts, metadata), page, global styles
components/     Header, Hero, Marquee, About, Projects, Jobs, Contact, Footer
                + Reveal, Counter, ScrollProgress, Orbs, Logo, Icon, SectionHead
lib/data.ts     site content and contact info
```

Client components ("use client"): Header, Reveal, Counter, ScrollProgress, Contact. Everything else renders on the server.
The contact form and job buttons open the visitor's email app addressed to consult@nueltechnologies.com. Swap in an API route or a service such as Resend when you want server-side sending.
