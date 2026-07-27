# Bang Jamin — Frontend Engineer (Mid) take-home

A recreation of [bangjamin.com](https://bangjamin.com) — 5 pages, faithful to the
original, with a small number of deliberate improvements that are each written
up in [`DECISIONS.md`](./DECISIONS.md).

Bang Jamin is an OJK-supervised digital insurance platform (PT Arkano Advance
Technology). The brief: recreate 5 pages, improve where it makes sense, and
document the reasoning.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000  → redirects to /id
```

`/` redirects to `/id`. Both `/id` and `/en` are real, fully translated routes —
use the **ID / EN toggle in the header**.

Optional: `NEXT_PUBLIC_SITE_URL` sets the origin used for `canonical` / `hreflang`
tags. It defaults to `http://localhost:3000`, so nothing needs configuring to run
this locally.

| script              | what it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | dev server on **port 3000**                   |
| `npm run build`     | production build                              |
| `npm run typecheck` | `tsc --noEmit`                                |
| `npm run lint`      | eslint (must be **0 warnings**)               |
| `npm run format:check` | prettier check                             |

All must be green before any commit.

**No test suites.** This is a visual recreation: it's verified by measuring the
rendered page against the live site (computed styles + geometry diffed node by
node at 1440/1280/1024/768/390), not by assertions. `@playwright/test` stays as a
devDependency because that measurement harness drives it.

## Stack

Next.js 16 (App Router) · TypeScript (strict) · Tailwind v4 · React Query ·
React Hook Form + Zod · self-hosted **Chillax** (display) + **Mulish**
(body) — Bang Jamin's real typefaces.

**This is a server app, not a static export.** The purchase flow is backed by
real Next.js Route Handlers under `app/api/*`, which `output: 'export'` cannot
serve. That's a deliberate deviation from my usual static-site default.

## What's built

All five pages are built, in both locales.

| page                        | route                        | status |
| --------------------------- | ---------------------------- | ------ |
| Landing                     | `/[locale]`                  | ✅ done |
| Purchase step 1 (quote)     | `/[locale]/purchase/category`| ✅ done |
| Purchase step 2 (insurers)  | `/[locale]/purchase/insurance-list` | ✅ done |
| Claim                       | `/[locale]/claim`            | ✅ done |
| About                       | `/[locale]/about`            | ✅ done |

Plus `DECISIONS.md` — the write-up the brief asks for.

The two purchase pages are a real flow: step 1 calculates and stores a quote,
then hands step 2 a quotation id to price the plan comparison against.

## Mock API

The purchase flow talks to real route handlers, not a stubbed client. Each has
artificial latency (so loading states are genuine) and an honest error path.

| endpoint | notes |
| -------- | ----- |
| `GET /api/mv-types` | 5 vehicle categories |
| `GET /api/regions` | 58 plate codes → OJK region tier 1/2/3 |
| `GET /api/brands?wheelerType=` | curated brands per wheeler type |
| `GET /api/models?brandId=&year=&search=&page=` | paginated + search |
| `POST /api/premium` | the quote; returns their exact response shape, and stores it |
| `GET /api/insurers?quotationId=` | plan offers priced off a stored quote |
| `GET /api/workshops?search=&type=&page=` | partner network, paginated + filtered |
| `POST /api/claim` | claim intake; validates, then always 404s — no policy database to verify against, see DECISIONS §3.4 |
| `POST /api/contact` | landing-page contact form sink |

Seed data in `lib/mock/` was derived from Bang Jamin's own public API (raw pulls
kept in `data-raw/` for provenance). Nothing is stored or sent anywhere.

**Two parts of the workshop network are synthetic, and say so.**
`lib/mock/workshops.ts` splits into `PULLED` — real partner garages from their
`workshop-v2` endpoint — and `SYNTHESISED`, generated rows that exist so the
list is long enough to demonstrate infinite scroll (78 rows, 13 pages). The
generated ones are marked rather than disguised: `synth-N` ids, `Jl. Raya Contoh`
addresses, and patterned phone numbers that cannot belong to a real business.
`WORKSHOP_TOTAL` (1,987) is their real published network size.

## Assets

`public/brand/` holds Bang Jamin's own images (logo, illustrations, testimonial
photos, OJK badge…), used so the recreation is visually faithful. **If this code
is ever repurposed for anything else, those must be removed or replaced.**

## Fidelity method

Sections were matched by **measuring**, not eyeballing: dump computed styles for
the whole subtree from both the live site and localhost, diff node by node, and
hover the real element to record its actual state change. The same approach
drove the accessibility work — every text node's contrast was computed against
its real painted background rather than judged by eye (see `DECISIONS.md` §3.2).
