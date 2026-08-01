# Incentitours Website

Marketing site for [Incentitours](https://incentitours.com.mx/) built with **Astro** + React islands: full-bleed hero, Playfair headings, fade-up on scroll, and a WhatsApp FAB. Static HTML per route for SEO and AI crawlers.

## Develop

Requires Node.js 20+.

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## SEO / AI SEO

- Per-page meta, Open Graph, canonical URLs
- JSON-LD: TravelAgency, TouristDestination, TouristTrip, BreadcrumbList
- Sitemap via `@astrojs/sitemap`
- `public/robots.txt`, `public/llms.txt`, `public/llms-full.txt`

## Content sources

- Destinations, packages, services, about, testimonials, and contact details live in `src/data.ts`
- Visual/motion reference: thelodgeatcreel.com

## WhatsApp

FAB and package CTAs open WhatsApp using the number in `src/data.ts` (`CONTACT.whatsapp`).
