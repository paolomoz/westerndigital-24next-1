# Dynamics parity check — https://main--westerndigital-24next-1--paolomoz.aem.page — 2026-09-21T13:52:52.136Z

Replayed 10 checks over 13 features · pass 9 · fail 1. Flows, not presence.

| feature | class | status | check | result | detail | third-party requests |
|---|---|---|---|---|---|---|
| home category tablist (Shop by Category / Solutions / Industries) | M | done | click-control | FAIL | control div#tabs-6vsduw-tab-2.tab in block tabs: no observable changed (aria-selected) |  |
| home category tablist (Shop by Category / Solutions / Industries) | M | done | dom-count | PASS | 3 × [role=tab] (min 3) |  |
| chrome interactions: mobile drawer + nav drop (sign-in flyout / search expand observed on live) | M | done | click-control | PASS | SKIP control button.navbar-hamburger[aria-label="Close navigation"] (zero-box) |  |
| chrome interactions: mobile drawer + nav drop (sign-in flyout / search expand observed on live) | M | done | dom-count | PASS | 4 × header li.navbar-item.nav-drop (min 4) |  |
| solutions FAQ accordion (10 items, open/close fired on live) | M | done | click-control | PASS | control button.toggle[aria-label="Collapse section"]: aria-expanded "true" → "false" |  |
| solutions FAQ accordion (10 items, open/close fired on live) | M | done | dom-count | PASS | 10 × .accordion button.toggle (min 10) |  |
| products facet accordion (inert filters, static snapshot #17) | M | done | click-control | PASS | control button.accordion[aria-label="Brand"]: aria-expanded "false" → "true" |  |
| header site search | S | interim | dom-count | PASS | 1 × header form[action='https://www.westerndigital.com/search'] (min 1) |  |
| products PLP grid (captured page 1, 15 cards) | S | interim | dom-count | PASS | 15 × .product-listing a[href*='/products/'] (min 15) |  |
| no page errors on the four delivered pages | M | done | no-page-errors | PASS | none on 4 page(s) |  |

## Features without checks

- tags & consent (Adobe Launch, GTM, mPulse, New Relic, pixels, reviews, Relyance CMP) (T) — interim · owner: property ids for the new host
- Genesys chat (T) — interim · owner: chat deployment id
- locale trees (~70 locales) (I18N) — scaffolded-awaiting-owner · owner: scope of the locale trees
- campaign / region / product-reference / country / promotions data files (D) — done
- YouTube video (V) — interim · owner: none needed — no captured page renders a player; a video-plays check is added when a page with a player enters scope
- commerce cart API, sign-in / account links, commerce signals (X) — decided-out

## Delivered / interim / decided-out

delivered 6 · interim 5 · scaffolded 1 · decided-out 1

## Values the owner must supply

- header site search (S, interim) — results page scope / query-index registration at rollout
- products PLP grid (captured page 1, 15 cards) (S, interim) — catalog datasource / same-origin routing
- tags & consent (Adobe Launch, GTM, mPulse, New Relic, pixels, reviews, Relyance CMP) (T, interim) — property ids for the new host
- Genesys chat (T, interim) — chat deployment id
- locale trees (~70 locales) (I18N, scaffolded-awaiting-owner) — scope of the locale trees
- YouTube video (V, interim) — none needed — no captured page renders a player; a video-plays check is added when a page with a player enters scope
