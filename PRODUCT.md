---
_provenance:
  writtenBy: stardust:replica
  writtenAt: 2026-09-21T09:00:00Z
  mode: bounded-single
  synthesizedFrom:
    - stardust/current/pages/index.json
    - stardust/replica/capture/lift/index-1440.json
    - stardust/replica/capture/lift/index-360.json
  note: descriptive record of the captured site for a same-design replica; no product interview was held (hands-off). Values trace to the capture; nothing here is invented.
---
# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS prototype (`stardust/prototypes/`) converted to AEM Edge Delivery Services (repo `paolomoz/westerndigital-24next-1`, DA content source). Replica flow: same design, same content, new platform.

## Users

Buyers and evaluators of hard-drive storage: data-center and enterprise infrastructure teams, NAS / surveillance / RAID integrators, gaming and creative-professional consumers, resellers and business-account customers (captured nav: Products · Solutions · Support · Company; promo link "WD for Business").

## Product Purpose

westerndigital.com is Western Digital's corporate and commerce site. The captured home page (`/`) presents the HDD portfolio and its role in AI-era tiered storage: a hero carousel of four campaign messages, a "Shop by Category / Solutions / Industries" tablist, a "Legacy in Technology and Innovation" content-card rail, "Popular Products" (WD Gold, WD Red Pro, WD Purple Pro, WD_BLACK) with prices and capacities, case studies and tools, a WD for Business section and an About WD row. Title: "High-Capacity HDDs for PCs, NAS, Gaming, Data Centers, and AI Data Cycles | WD".

## Brand Commitments

- Name and logo: Western Digital / WD (`assets/media/wd-header-main-logo-4c2559e2.svg`, 83×48).
- Typeface: Roboto 400 / 500 / 700 (open-license, self-hosted from the site's own woff2 files).
- Palette, type ramp, container model, buttons, radii: lifted verbatim (see DESIGN.md / DESIGN.json `extensions.canon`).
- Content is preserved verbatim from the capture: headlines, body copy, CTA labels and hrefs, alt text, navigation labels.

## Evidence on Hand

- Captured page record: `stardust/current/pages/index.json` (+ rendered DOM sidecar `index.html`); ground-truth screenshots `stardust/current/assets/screenshots/index.png` / `index-360.png`.
- Harvested media (31 files) under `stardust/current/assets/media/` (manifest `_media-manifest.json`, 0 download errors) and fonts under `assets/fonts/`.
- Computed-style lifts at both gate widths: `stardust/replica/capture/lift/index-1440.json`, `index-360.json`; saved source CSS `stardust/replica/capture/css/`.
- Not on hand (must not be fabricated): product data beyond the four captured cards, search results, account/cart state, mega-menu promo imagery, chatbot content.

## Product Principles

- Fidelity over interpretation: the captured current state is the specification; every delta is a register entry.
- Content parity is DOM parity: hidden panels, quick-view modals and carousel clones are mirrored as captured.
- Observed, never inferred: motion and chrome states are implemented only when the live site measurably fires them.
