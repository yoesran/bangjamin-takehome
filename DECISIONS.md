# Decisions

What I built, the choices behind it, and what I knowingly left out.

**All five pages are built** — Landing · Purchase step 1 (quote) · Purchase step
2 (compare plans) · Claim · About — in both locales.

---

## 1. Approach

The brief was "recreate 5 pages, improve where it makes sense, document it." I
treated faithful recreation as the baseline and made every addition justify
itself here.

**Fidelity by measurement, not by eye.** Matching sections visually kept missing
things, so I switched method: dump the computed styles of a whole section from
both the live site and my build, diff them node by node, and hover the real
element to record its actual state change instead of guessing from CSS. Every
page went through that, at several widths and in both locales.

It's also how I found things I'd otherwise have shipped wrong — their breakpoint
is `xl` (1280) not `lg`; the coloured panel behind each feature illustration is
baked into the image, so wrapping it in a coloured box double-draws it; the
testimonial cards use four distinct colours, not an alternating pair.

I used the same approach for accessibility: rather than eyeballing contrast, I
walked every text node and computed its ratio against its real painted
background. That found problems no amount of looking would have.

## 2. Stack

Next.js 16 (App Router), TypeScript strict, Tailwind v4, React Query, React Hook
Form + Zod. Bang Jamin's own typefaces (Chillax + Mulish), self-hosted.

**One deliberate deviation: a server app, not a static export.** My usual default
for a marketing site is `output: 'export'`, but the purchase flow needed real
endpoints (see §4) and static export can't serve route handlers.

## 3. What I added

### 3.1 Working i18n (the piece I'd point at first)

Every route is locale-prefixed (`/id`, `/en`) and both are fully translated, with
an ID/EN toggle in the header that preserves the current path.

The dictionaries use a single-source-of-truth parity guard: `id` defines the key
shape and `en` is typed as `Dictionary`, so a missing **or extra** key fails the
build. No codegen step.

Translating visible copy is only half of it — each page also generates its own
`<title>`, description and `hreflang` alternates per locale. Two things fell out
of doing that properly:

- **Metadata can't live in the layout.** A layout's `generateMetadata` only
  receives its own params, so it can't know the pathname, and a canonical of
  `/en` would declare all five pages duplicates of the home page. So
  `lib/i18n/metadata.ts` takes the path the page already knows.
- **`hreflang` is the machine-readable half of the switcher** — it tells a
  crawler that `/id/about` and `/en/about` are translations, not duplicates.

### 3.2 Accessibility

Every field is labelled, the custom dropdowns are proper listbox comboboxes
(arrow keys, Enter, Escape, `aria-selected`, visible focus), errors are announced
via `aria-invalid` plus `aria-describedby` pointing at the message, dialogs trap
focus and restore it to whatever opened them, and tap targets clear 24px.

One detail worth spelling out, because the obvious implementation is subtly
useless: arrow keys have to *announce* the option they land on, not just
highlight it. That needs `aria-activedescendant`, which is invalid on a
`<button>`'s implicit role — so the trigger claims `role="combobox"` explicitly
(the APG select-only pattern). On the searchable variants focus moves into the
filter input when the popup opens, so it's that input, not the now-blurred
trigger, that carries the attribute.

On colour, I fixed everything that was mine to fix — body greys, muted text,
validation errors, success states and accent text on light backgrounds all now
clear WCAG AA, with two new tokens (`grey60`, `primary-strong`) so "muted" and
"accent" stay visually muted and accented without being unreadable.

**Two failures I left alone deliberately.** White on the hero coral measures
2.40:1 and white on the primary orange 3.40:1. Both are Bang Jamin's own brand
colours, and changing them means changing the brand — a hero that isn't their
coral is no longer their hero. In a real engagement I'd raise the hero first: a
slightly deeper coral clears the bar while still reading as the same colour. It
felt right to flag that rather than decide it unilaterally.

### 3.3 Honest loading and failure states

The cascading dropdowns get real skeletons, an error state with retry, and
disabled-until-ready gating. Submits check the response rather than assuming
success — an earlier version of the contact form reported success the moment the
request settled either way, which meant a failed POST still said "message
received."

### 3.4 Two extensions, labelled as such

- **A browsable workshop network.** The API exposes ~1,987 partner garages;
  comparing plans without seeing where you can get repaired is half a decision.
  It opens from each plan and pages on scroll.
- **A claim step 2.** Their `/claim` is step "1/2" with a picker; I built the
  form it implies. It has **no success state on purpose** — there's no policy
  database here, so it returns a real 404 and says the policy wasn't found. A
  fabricated reference number would be a promise the system can't keep.

Smaller: `type="tel"` rather than `type="number"` for phone entry, since number
strips leading zeros and shows spinners.

## 4. The mock API

The purchase flow talks to real Next.js route handlers (`app/api/*`) seeded from
Bang Jamin's public API, with artificial latency and real error paths.

I chose route handlers over a client-side mock (MSW, stubbed promises) because
the point is to demonstrate *integration*: fetch boundaries, response envelopes,
error handling, pagination, cache keys. A stubbed client shows none of that.

The premium comes from a documented formula in `lib/premium.ts` — a flat
discount, a depreciating sum insured, and a rate banded by the region tier the
plate code maps to. The constants and the observations behind them are written
into the file.

**The quote is stateless.** Step 1 encodes the vehicle reference into the
`quotationId` it returns, and step 2 decodes it and recomputes. An earlier
version kept quotes in a module-scope `Map`, which works on one process and
breaks the moment there's more than one — a deployed funnel would lose quotes
between requests. Recomputing from a pure function removed the problem and the
storage along with it. In production this token would be signed.

## 5. Memoization — where I used it, and where I didn't

**The default is not to memoize.** Most `useMemo` in application code buys
nothing and costs readability plus a comparison every render. Reaching for it by
reflex is a stronger signal of *not* understanding it than leaving it out.

**Where it earns its place:** `components/purchase/vehicle-form.tsx`.

My first draft justified it by saying the form re-renders on every keystroke.
**Then I measured, and that was wrong.** React Hook Form's `register` keeps those
inputs uncontrolled, so typing re-renders the component **zero** times — I
instrumented the child and typed ten characters to confirm it. Memoizing for that
reason would have been cargo-culting a benefit that doesn't exist.

What *does* re-render it is a watched select changing and a query resolving.
Picking a category fires several in sequence:

| picking Category | child renders |
| --- | --- |
| without `React.memo` | **22** |
| with `memo` + stable identities | **10** |

That's the real justification: `memo` compares by identity, so if the parent
rebuilt the option arrays and handlers each pass, all five selects would fail the
comparison every time — including the 58-item region list.

A bug made the point concrete. Two selects were wired with a curried helper,
`onChange={set('model')}`. It reads tidily, but it's *called during render*, so
it returns a fresh identity every pass and silently defeated the `memo`. Each
handler is now its own `useCallback` — the repetition is the fix.

**Where I deliberately didn't:** scalar values and small lookups, the landing
page components (server-rendered, no re-render pressure), and anything I hadn't
reasoned about. Nothing "just in case."

**And on a React-Compiler codebase I'd drop all of it** — the compiler handles
this class of memoization, and hand-written hooks then become noise that can only
drift from reality.

## 6. Known limits

- **Model lists are curated, not exhaustive** (~100 real models across 18
  brands) — enough for the cascade to behave identically. Models don't vary by
  year; the year gates the dropdown and drives depreciation.
- **The premium formula is mine, not theirs.** It reproduces the observed shape
  and magnitude; it isn't an actuarial engine and isn't presented as one. Insurer
  pricing is a rate multiplier over the same base, so the comparison is
  apples-to-apples.
- **The workshop list mixes real and generated rows** — real partner data plus
  clearly-marked filler (`synth-` ids, example addresses) so the list is long
  enough to demonstrate infinite scroll. Flagged in the README.
- **Purchase step 2 ends at plan selection** and hands off to WhatsApp; their
  real funnel continues to application → payment → confirmation.
- **Links outside the five-page scope open the live site** in a new tab with an
  sr-only warning (WCAG G201), rather than 404ing or sitting dead.
- **Brand assets are Bang Jamin's own**, used so the recreation is visually
  faithful. They'd be removed if this code were repurposed.

## 7. With more time

Sign the quote token. Real persistence behind the mock API. Carry step 2 through
to application and payment. Automated accessibility and visual-regression checks
in CI, so the contrast and focus work above can't quietly regress.

## Appendix: pages

| page | route |
| --- | --- |
| Landing | `/[locale]` |
| Purchase step 1 | `/[locale]/purchase/category` |
| Purchase step 2 | `/[locale]/purchase/insurance-list` |
| Claim | `/[locale]/claim` |
| About | `/[locale]/about` |

## Appendix: mock API

| endpoint | purpose |
| --- | --- |
| `GET /api/mv-types` · `/api/regions` | vehicle categories, plate-code regions |
| `GET /api/brands` · `/api/models` | cascading catalogue, paginated + searchable |
| `POST /api/premium` | the quote; returns their response shape |
| `GET /api/insurers` | plan offers priced off the quote token |
| `GET /api/workshops` | partner network, paginated + filtered |
| `POST /api/claim` | claim intake; always 404s, see §3.4 |
| `POST /api/contact` | landing-page contact form sink |
