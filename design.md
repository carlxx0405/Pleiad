# Pleiad Marketing — Concept Site Design System

**Project type:** Speculative/demo website, built to accompany a letter of interest and internship pitch.
**Purpose:** Not an official deliverable — a skills showcase built as if Pleiad Marketing were a real client.
**Stack:** HTML, Tailwind CSS (CDN), vanilla JS.
**References:** addmore.be, autexacoustics.com — minimal line-driven layouts, generous whitespace, restrained motion.

---

## 1. Concept

Pleiad is named after the Pleiades — a star cluster, "Seven Sisters," a group of separate points of light that only means something as a formation. That's the whole brief in one image: most businesses' marketing is scattered — a logo here, a Facebook page there, inconsistent messaging everywhere — and the agency's job is to pull those scattered points into one aligned, visible cluster.

That idea becomes the site's one signature device (see §4) rather than a literal "stars and space" theme. No gradients, no cosmic clichés, no dark starfields with twinkle animations — just **nodes and lines**: small rounded dots connected by thin rounded strokes. Scattered on light sections, aligned and tightened on dark sections. It's abstract enough to read as pure geometry first, and click into "constellation" second once the visitor is primed by the name.

This also gives the copy a spine: **problem = scattered points → solution = one aligned cluster.**

---

## 2. Design Tokens

### 2.1 Color

Flat fills only. No gradients, no drop shadows heavier than a soft ambient blur. Every color below is used with intent — nothing decorative.

| Token | Hex | Role |
|---|---|---|
| `paper` | `#FFFFFF` | Base background, light sections |
| `ink` | `#0D447D` | Primary brand color — headlines, line art, buttons/links on light bg, nav |
| `signal` | `#FBA10E` | Single accent — CTAs, active states, the one "hot" color on the page |
| `void` | `#081B2E` | Dark-mode background (deeper than `ink`, not just `ink` at low opacity — needs its own weight to feel like a real mode change, not a filter) |
| `mist` | `#5B6B7A` | Secondary/body text on light backgrounds (never pure black — keeps the minimal, soft-line character even in type) |
| `fog` | `#AEB9C2` | Body text and muted UI on dark backgrounds |
| `hairline` | `#E3E8EC` | 1px dividers, card borders, input borders on light bg |
| `hairline-dark` | `#1C3247` | 1px dividers on dark bg |

**Rules:**
- `signal` (#FBA10E) never appears as a background fill larger than a button or a small badge. It is a pointer, not a wash.
- Dark mode (`void`) is a genuine section background, not a semi-transparent overlay on `ink`. This keeps the dark section feeling like a real shift in register — think of it as walking into a different room, not dimming the lights.
- Text on `paper` defaults to `mist`, not black. Headlines use `ink`.
- Text on `void` defaults to `fog`. Headlines use `paper` (white).

### 2.2 Typography

Two type roles, used with a clear hierarchy — no third "just in case" font.

- **Display / Headlines — Plus Jakarta Sans** (Google Fonts, weights 500/700).
  Soft geometric grotesk with rounded terminals — this is what ties the typography to the "rounded lines" instruction without adding a decorative font. Set tight: `tracking: -0.02em` to `-0.04em` at large sizes, sentence case (not uppercase — uppercase would read as generic corporate/startup).

- **Body / UI — Inter** (Google Fonts, weights 400/500).
  Neutral, highly legible at small sizes, disappears behind the content — exactly what a minimalist body face should do.

- **Labels / Eyebrows / Coordinates — Space Mono** (Google Fonts, weight 400).
  Used only for the small eyebrow captions, nav numbering-style micro-labels, and footer meta text. A monospace face reads like coordinates or a star catalogue reference — a quiet nod to the cluster concept without ever saying it out loud. Always uppercase, wide letter-spacing (`0.15–0.2em`), small size (11–13px).

**Type scale (desktop):**

| Use | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Hero title | Plus Jakarta Sans | 88–104px | 700 | `tracking -0.03em`, `leading 0.98` |
| Section title | Plus Jakarta Sans | 44–56px | 700 | `leading 1.05` |
| Card / sub title | Plus Jakarta Sans | 22–26px | 500 | |
| Body | Inter | 17–18px | 400 | `leading 1.6`, `mist`/`fog` |
| Eyebrow/label | Space Mono | 12px | 400 | uppercase, `tracking 0.18em` |
| Nav / menu word | Inter | 15px | 500 | uppercase, `tracking 0.1em` |

### 2.3 Shape & Space

- **Radius:** large and consistent — 28px on cards/images/panels, 999px (full pill) on buttons and badges. No sharp corners anywhere except the 1px hairlines themselves. This is the literal "rounded lines" instruction extended to every container, not just the line-art.
- **Line weight:** all strokes (dividers, constellation art, icon linework) are 1.5px, `stroke-linecap: round`, `stroke-linejoin: round`. Never a hard-cornered line anywhere in the illustration system.
- **Whitespace:** section vertical padding 140–180px desktop / 80–100px mobile. Content max-width 1200px, with generous 8–10% side gutters rather than edge-to-edge text — whitespace is a feature of the brief, not a leftover.
- **Grid:** 12-column, 24px gutter.

### 2.4 Motion

Motion is quiet and orchestrated, not scattered across every element.

- **Page load:** nav fades in first (200ms), then hero eyebrow chips stagger in from the right (80ms apart), then the hero title reveals with a soft upward mask-wipe (not a bounce, not a typewriter), then the CTA fades in last. One sequence, ~1.2s total, never repeats.
- **Scroll reveals:** content blocks fade + rise 16px on enter, threshold ~20% visible, no stagger beyond direct siblings, `ease-out`, 500–600ms. Respect `prefers-reduced-motion` — disable the rise, keep a plain fade.
- **The dark-mode shift (What We Offer section):** this is the single biggest motion moment on the page — spend the "one real risk" here, and nowhere else. Implementation notes in §5.5.
- **Carousel:** continuous linear auto-scroll (CSS `@keyframes translateX` loop, ~40s per full loop), pauses on hover/focus, resumes on mouse-leave. No easing curve — constant velocity reads as calmer and more premium than an eased loop.
- **Hover states:** buttons and nav links get a small `signal`-colored dot that draws in via `stroke-dashoffset` — literally one "star" appearing on interaction. Used sparingly: nav links, footer links, project cards only.

---

## 3. Signature Element — "The Cluster"

A reusable SVG line-art system: small circles (4–6px radius, `ink` or `paper` depending on background) connected by 1.5px rounded strokes.

- **Scattered state** — used on: hero background (behind the image overlay, very faint), Problem Statement section (nodes spread apart, unconnected, slightly askew — visually restless).
- **Aligned state** — used on: the transition into What We Offer (nodes animate into a tight, symmetrical cluster as the section becomes dark), footer background (settled, static, faint).
- Never used as a literal constellation of named stars, never uses more than 7 nodes at once (a quiet nod to the Pleiades' "seven sisters" without spelling it out), never rendered in `signal` — the cluster is always `ink`/`paper`/`fog`, keeping amber reserved purely for action.

This is the one motif threaded through the whole site. Everything else — cards, buttons, images — stays plain and quiet so this element is what a visitor remembers.

---

## 4. Site Structure

### 4.1 Navigation

```
┌───────────────────────────────────────────────────┐
│  PLEIAD                                    Menu    │
└───────────────────────────────────────────────────┘
```
- Logo wordmark left (Plus Jakarta Sans, 700, `ink` — or `paper` when nav is over the dark section/hero image).
- Center: empty — the whitespace itself is the statement, resist the urge to fill it.
- Right: the single word "Menu" (Inter, uppercase, tracked) — no hamburger icon. On hover, an underline draws in left-to-right in `signal`.
- Nav is fixed/sticky, background transparent over the hero, gains a `paper` blur backdrop (`backdrop-blur`, `bg-white/70`) once scrolled past the hero so text stays legible. Swaps to a `void`-tinted blur while the What We Offer section is in view, then back to `paper`-tinted afterward — this is what makes the nav feel aware of the page rather than static chrome.

### 4.2 Full-Screen Menu Overlay

Triggered by "Menu." Covers the viewport in `void`, wordmark and a "Close" label stay pinned top.

```
┌───────────────────────────────────────────────────┐
│  PLEIAD                                   Close    │
│                                                     │
│        Services                                    │
│        About                                       │
│        Work                                        │
│        Contact                                     │
│                                                     │
│   [faint aligned cluster motif, bottom-right]       │
└───────────────────────────────────────────────────┘
```
- Links: Plus Jakarta Sans, large (48–64px), `paper`, left-aligned, generous line spacing. Each staggers in on open (40ms apart, rise + fade).
- Hover on a link: text shifts to `signal`, small cluster-dot draws in beside it.
- Overlay transition: circular reveal (`clip-path: circle()`) expanding from the "Menu" word's position — ties the interaction directly to where the user clicked rather than a generic slide/fade.
- Close via "Close" label, `Esc` key, or clicking outside the link list.

### 4.3 Hero

```
┌───────────────────────────────────────────────────┐
│  [stock image, desaturated + ink-toned overlay]    │
│                                                     │
│                              ─ Preemptive Marketing │
│                              ─ Fostering Sustain-   │
│                                able Business Growth │
│                              ─ Enriching Customer   │
│                                Experience           │
│                                                     │
│   We don't chase attention.                        │
│   We align it.                                     │
│                                                     │
│   [ Start the conversation → ]                      │
└───────────────────────────────────────────────────┘
```
- **Background:** a single high-quality stock photo (suggest: a Malawian small-business/market or studio-work scene — real, not stock-generic, if Carl can source or shoot one himself it will read far stronger in a portfolio piece). Treatment: duotone-style overlay using `ink` at ~75% opacity blended over a desaturated image (`mix-blend-mode: multiply` + a `void`-to-transparent bottom gradient kept subtle and directional only, not decorative) — this achieves the "image feels covered" effect the brief asked for without introducing a rainbow gradient.
- **Small captions (right-aligned, stacked):** Space Mono, small, `paper`, each preceded by a short rounded dash "—" instead of a bullet or number (numbers would falsely imply sequence/ranking between three things that are actually simultaneous). Each line fades/slides in with a slight delay, top to bottom.
- **Main slogan:** two short lines, Plus Jakarta Sans 700, huge, `paper`. Keep it to 5–8 words total — the brief calls for boldness, and a long slogan undercuts that. Suggested line: *"We don't chase attention. We align it."* — directly encodes the scattered→aligned concept in the copy itself.
- **CTA:** pill button, `signal` fill, `void` text, label as an action not a noun — *"Start the conversation"* rather than "Contact Us" or "Learn More."
- Faint scattered cluster nodes sit behind the image overlay, barely visible — the first appearance of the signature motif, planting it before the visitor consciously notices.

### 4.4 Problem Statement

```
┌───────────────────────────────────────────────────┐
│   EYEBROW: THE PROBLEM                             │
│                                                     │
│   Most brands aren't invisible.                    │
│   They're scattered.                               │
│                                                     │
│   [•]           [•]        [•]                     │
│  Inconsistent  Guesswork   Disconnected             │
│  messaging     budgets     channels                 │
│  across        with no      that never              │
│  platforms     clear ROI    talk to each             │
│                              other                  │
│                                                     │
│         → introduces Pleiad as the fix              │
└───────────────────────────────────────────────────┘
```
- Background `paper`. Three problem points laid out with the **scattered** cluster nodes literally sitting above each one, at slightly different heights and unaligned — the layout itself performs the word "scattered" rather than just describing it.
- Closing line of the section pivots directly into the solution framing, e.g. *"Pleiad exists to close that gap — one strategy, every channel, pointing the same direction."* This line should sit alone, `ink`, slightly larger, as the section's punctuation before the scroll into What We Offer.

### 4.5 What We Offer — Dark Mode Section

```
┌───────────────────────────────────────────────────┐ ← background shifts
│  (void background begins here)                     │   paper → void
│   EYEBROW: WHAT WE OFFER                    (paper) │
│                                                     │
│   Brand Strategy        Content & Social            │
│   ─────────────         ─────────────               │
│   Positioning that      Consistent voice,           │
│   holds up across       platform by platform         │
│   every touchpoint                                  │
│                                                     │
│   Performance Media     Analytics & Growth           │
│   ─────────────         ─────────────               │
│   ...                   ...                          │
│                                                     │
│        [nodes now aligned, tight, centered]          │
└───────────────────────────────────────────────────┘
```
- This is the section that "turns to dark mode on scroll" — see §5.5 for the technical approach.
- Four offerings in a clean 2×2 grid, each with a thin `hairline-dark` rule under its title rather than a card/box — keeps it minimal, avoids the generic "four boxes with icons" template.
- No icons. Icons here would compete with the linework motif already established; the hairline rule + Space Mono eyebrow number-free label is enough structure.
- The cluster motif resolves to its **aligned** state within this section, ideally as a scroll-tied animation: nodes drift from scattered to tightly grouped as the visitor scrolls through, finishing perfectly aligned by the section's end. This is the section where the whole concept clicks into place visually — worth the extra build effort, everything else in the motion system stays quiet so this can be the moment that lands.

### 4.6 Work / Showcase Carousel

```
┌───────────────────────────────────────────────────┐
│   EYEBROW: SELECTED WORK                            │
│                                                     │
│  ⟵ [proj 1] [proj 2] [proj 3] [proj 4] [proj 1]... ⟶ │
│     (continuous auto-scroll, loops seamlessly)      │
└───────────────────────────────────────────────────┘
```
- Background returns to `paper` — this is the visual "surfacing" after the dark section, a deliberate return to light rather than a hard cut.
- Cards: large rounded image (28px radius), thin `hairline` border, project name + one-line result stat below in Space Mono (e.g. "Local retailer — 3.2x engagement in 90 days") — since this is a concept portfolio piece, use clearly-labeled placeholder/mock case studies rather than real client claims.
- Track duplicates its content once and animates a continuous `translateX(-50%)` loop for a seamless infinite scroll — the standard, reliable way to do this in vanilla CSS/JS without a library.
- Pause on hover/focus for accessibility and so a curious visitor can actually read a card.

### 4.7 About

- Background `paper`. Short, direct — one or two paragraphs on Pleiad's approach/founding idea, not a full team bio grid (keeps scope believable for a concept site). A single portrait-orientation image or the scattered→aligned motif rendered large and static works better here than a stock "team meeting" photo.
- Eyebrow: "ABOUT PLEIAD."

### 4.8 Contact

```
┌───────────────────────────────────────────────────┐
│   Let's align your next campaign.                  │
│                                                     │
│   [ Name field ─────────── ]                        │
│   [ Email field ────────── ]                        │
│   [ Message ─────────────  ]                        │
│                                                     │
│   [ Send message → ]                                │
└───────────────────────────────────────────────────┘
```
- Minimal form, underline-only inputs (no boxes) in `mist`/`hairline`, focus state turns the underline `signal`.
- Section title continues the CTA-as-action pattern used in the hero.

### 4.9 Footer

```
┌───────────────────────────────────────────────────┐
│  PLEIAD                        Quick Links          │
│  [faint aligned cluster]        Services            │
│                                  About               │
│  ○ ○ ○ (social icons,           Work                │
│  outline style, round)          Contact             │
│                                                     │
│  ─────────────────────────────────────────────────  │
│  © Pleiad Marketing · Lilongwe, Malawi   [Space Mono]│
└───────────────────────────────────────────────────┘
```
- Background `void` — bookends the page with the same dark register as the offerings section, giving the site a light → dark → light → dark rhythm rather than dark mode feeling like an isolated gimmick in the middle.
- Logo + socials left (round outline icon buttons, `fog` default → `signal` on hover), quick links right, thin hairline-dark rule, then a small legal/meta line in Space Mono.
- The **aligned** cluster motif sits faint and static behind the logo — the concept's resting state, closing the loop opened in the hero.

---

## 5. Implementation Notes (Tailwind CDN + Vanilla JS)

1. **Fonts:** load Plus Jakarta Sans, Inter, and Space Mono via Google Fonts `<link>`; set as Tailwind `fontFamily` extensions in an inline `tailwind.config` script (CDN supports this via `tailwind.config = { theme: { extend: {...} } }` before the CDN script, or a `<script>` block using `tailwind.config`).
2. **Colors as CSS variables**, not just Tailwind config values — makes the dark-section swap (below) trivial to manage with plain class toggles.
3. **Full-screen menu:** a fixed `inset-0` div, `hidden` by default, toggled via a small JS function; animate with `clip-path` for the circular reveal described in §4.2. Trap focus while open; close on `Escape`.
4. **§4.5 dark-mode-on-scroll:** use an `IntersectionObserver` watching the What We Offer `<section>`. On enter, add a `.is-dark` class to that section (and toggle a `nav--on-dark` class on the fixed nav simultaneously) that swaps background/text CSS variables with a `transition: background-color 600ms ease, color 600ms ease`. On exit (scrolling back up), remove it. This avoids toggling a global `dark` class on `<html>` — only the relevant section and the nav need to know.
5. **Carousel:** plain CSS `@keyframes` translateX loop on a flex track with duplicated children; `animation-play-state: paused` on `:hover`/`:focus-within` via CSS, no JS required beyond building the duplicated DOM list.
6. **Cluster SVG motif:** build as 2–3 reusable inline SVGs (scattered / aligned / footer variants) rather than one JS-driven particle system — keeps this demo lightweight and fast, and the brief calls for precision/minimalism over flashiness.
7. **Respect `prefers-reduced-motion: reduce`** globally — disable the load sequence stagger, scroll-rise, and cluster animation; keep simple opacity fades only.
8. **Accessibility:** visible focus rings (`ink` outline, not removed), sufficient contrast (`mist` on `paper` and `fog` on `void` both meet AA for body text at 17px+), semantic landmarks (`nav`, `main`, `section`, `footer`), alt text on the hero image describing it meaningfully rather than decoratively.

---

## 6. What Makes This Distinctive (Self-Check)

- **Not the generic template:** no cream background + terracotta accent, no near-black + acid-green, no dense hairline broadsheet grid. Palette and type came directly from the brief's own colors and the brand's own name.
- **The risk spent in one place:** the scattered → aligned cluster motif and its payoff in the dark-mode scroll transition is the one bold, resource-intensive move. Everything else — nav, cards, form, footer — stays deliberately quiet so that moment reads as a choice, not noise.
- **Structure encodes meaning:** the light → dark → light → dark section rhythm and the problem section's literal "unaligned" layout aren't decoration — they're the argument the copy is making, expressed spatially.