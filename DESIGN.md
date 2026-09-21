---
name: Western Digital — westerndigital.com replica
description: Descriptive token record of the captured westerndigital.com home page (same-design migration; values lifted from computed styles)
_provenance:
  writtenBy: stardust:replica
  writtenAt: 2026-09-21T09:00:00Z
  mode: bounded-single
  synthesizedFrom:
    - stardust/current/DESIGN.json
    - stardust/replica/capture/lift/index-1440.json
    - stardust/replica/capture/lift/index-360.json
colors:
  black: "#000000"
  white: "#ffffff"
  blue: "#2266ff"
  blue-nav: "#0074f3"
  promo-charcoal: "#2b2b2b"
  grey-light: "#e6e6e6"
  grey-1: "#f2f3f3"
  grey-3: "#6a6a6a"
  grey-4: "#6b6b6b"
  grey-5: "#737779"
  grey-link: "#929a9d"
  footer-ink: "#111111"
  navy: "#001f3f"
  mint: "#f5f9f9"
typography:
  h1-hero:
    fontFamily: "Roboto, sans-serif"
    fontSize: "66px"
    fontWeight: 700
    lineHeight: "72.6px"
    letterSpacing: "normal"
  h2-hero:
    fontFamily: "Roboto, sans-serif"
    fontSize: "48px"
    fontWeight: 700
    lineHeight: "52.8px"
    letterSpacing: "normal"
  heading1:
    fontFamily: "Roboto, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: "39.6px"
  heading4:
    fontFamily: "Roboto, sans-serif"
    fontSize: "28px"
    fontWeight: 500
    lineHeight: "30.8px"
  heading5:
    fontFamily: "Roboto, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: "26.4px"
  heading6:
    fontFamily: "Roboto, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: "22px"
  body:
    fontFamily: "Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
    letterSpacing: "normal"
  text-base:
    fontFamily: "Roboto, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "27px"
  text-xs:
    fontFamily: "Roboto, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "21px"
  button:
    fontFamily: "Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: "16px"
rounded:
  button: "6px"
  card: "16px"
  media: "20px"
  pill: "999px"
spacing:
  gutter: "16px"
  card-pad: "32px"
  section-y: "96px"
  head-gap: "48px"
  container-max: "1140px"
components:
  button-primary:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "12px 32px"
  button-inverse:
    backgroundColor: "{colors.white}"
    textColor: "{colors.black}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "12px 32px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.black}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "12px 32px"
  card-content:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
    width: "400px"
    height: "600px"
  card-product:
    backgroundColor: "{colors.grey-1}"
    textColor: "{colors.black}"
    rounded: "{rounded.card}"
    padding: "0 32px"
    width: "400px"
    height: "600px"
  card-resource:
    backgroundColor: "{colors.white}"
    textColor: "{colors.black}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
    height: "275px"
---
# Design System: Western Digital — westerndigital.com replica

## Overview

A descriptive record, not a direction: every value below is a computed style lifted from the live home page at 1440 and 360 (`stardust/replica/capture/lift/`), promoted mechanically for the same-design replica. Roboto throughout; black on white with a single blue accent; large rounded cards on light-grey bands; one 1140 px centred container.

## Colors

### Primary
- Black `#000000` text / primary buttons; White `#ffffff` page background and inverse buttons.

### Secondary
- Blue `#2266ff` — active tab label and underline; Nav blue `#0074f3` — nav sliding indicator.

### Neutral
- Grey-1 `#f2f3f3` — alternating section bands and product-card background; Grey-light `#e6e6e6` — header rule; Grey-3 `#6a6a6a` — footer rules; Grey-4 `#6b6b6b` — muted product meta; Grey-5 `#737779` — inactive tab; Grey-link `#929a9d` — footer links; Footer ink `#111111`; Promo charcoal `#2b2b2b`; Navy `#001f3f` (content cards); Mint `#f5f9f9` (G-DRIVE card).

## Typography

Roboto 400 / 500 / 700, self-hosted from the site's own woff2 files; `font-synthesis: weight style small-caps`, letter-spacing normal everywhere.

### Hierarchy
- Hero title 66/72.6 700 (mobile 34/37.4) — rendered as `<p class="h1-hero">` on live, mirrored.
- Section title `h2-hero` 48/52.8 700 (mobile 32/35.2); the page's single `<h1>` uses this style.
- Card titles: heading1 36/39.6 700 (mobile 32/35.2), heading4 28/30.8 500 (24/26.4), heading5 24/26.4 500 (20/22), heading6 20/22 500 (18/19.8).
- Body 16/24 400; lede 18/27; small 14/21; buttons 16/16 500 (mobile 14/14).

## Layout

Container 1140 px max, 16 px gutters, centred (150 px side margins at 1440). 12-column flex rows (`cols-N` = N/12 of the 1108 px inner width). Section rhythm 96 px top/bottom (64 px at mobile), heading block with 48 px bottom gap (32 px mobile). Card rails start 150 px in (16 px mobile), slides 400 px wide with 16 px gaps (80 % of the track at mobile). Header sticky at top, 97 px (40 px promo strip + 56 px nav + 1 px rule); 91 px at mobile. Source breakpoints: 576 / 768 / 992 / 1140 / 1460.

## Elevation & Depth

Flat. The only shadow is the carousel arrow `rgba(0,0,0,.29) 0 3px 6px` (hidden at rest). Depth on cards comes from photo scrims: hero `linear-gradient(90deg, rgba(0,0,0,.6) 30%, transparent)`, content cards `linear-gradient(to top, #000 20%, transparent 60%)`, hero progress area `linear-gradient(0deg, #000 0, rgba(102,102,102,0) 95.45%)`.

## Shapes

Buttons 6 px radius; cards 16 px; media in two-up cards 20 px; progress tracks pill (999 px); carousel arrows circular.

## Components

### Buttons
Inline-flex, 16/16 500, padding 12×32, 1 px border, radius 6, transition .2s. Variants: black (fill), white inverse (hero), outline black / outline white (transparent), link (underlined text, no padding).

### Cards / Containers
Content card 400×600 navy or photo, scrim, content bottom-aligned, 32 px padding. Product card 400×600 grey-1, centred 336 px image, name 28/30.8, "Capacity:" and "Starting at" rows. Resource card white, min 275 px, 32 px padding, shrink-to-fit up to 400 px. Two-up business cards: 546×350 media (radius 20) + 24 px text block. About tiles 206 px square images (radius 16), 5-up (2-up at mobile, 125 px).

### Navigation
Promo strip (#2b2b2b, 14 px white, underlined links); nav row with 83×48 logo, four 16/16 trigger buttons spaced 32 px, sign-in / cart / search icons (harvested SVGs) at right; mobile: centred logo, three-line hamburger at left, drawer.

### Hero progress bar
Four 241 px items on a 48 px gap grid; 1 px white track with a blue→teal gradient fill; 20/27 title and 14/20 description (labels hidden at mobile, tracks 64×2).

## Do's and Don'ts

### Do:
- Copy values from the lift; verify with the gate instruments.
- Mirror hidden DOM (tab panels, quick views, clones) as captured.

### Don't:
- Add `text-wrap: balance`, reduced-motion handling or any behaviour the live site does not measurably have.
- Re-host any licensed face (none is needed here).
