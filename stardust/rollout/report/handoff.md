<!-- stardust:provenance writtenBy=stardust:stardust writtenAt=2026-09-21T14:35:07Z againstInput="hands-off replica migration westerndigital.com → paolomoz/westerndigital-24next-1 (home + products + solutions + company)" readArtifacts=stardust/replica/progress.json,stardust/state.json,stardust/qa/dynamics-report.md,stardust/rollout/report/ai-readability.json,stardust/.work/deploy/cls-wide.json -->
# Hand-off — westerndigital.com replica pilot (4 pages) → AEM Edge Delivery

**Blocked on owner:** `gh repo edit paolomoz/westerndigital-24next-1 --visibility private && node skills/deploy/scripts/lockdown.mjs --org paolomoz --repo westerndigital-24next-1` — or decide `lockdown: off` (public by design). Everything else in this hand-off is complete; the site is preview-only (nothing published to `aem.live`).

## Gate table (published-origin regime = the numbers that count; prototype regime for reference)

| page / archetype | bp | verdict | pixel % | residual (cause → inherits) | at | regime | build | when |
|---|---|---|---|---|---|---|---|---|
| index | 1440 | PASS | 1.61 (Δh 0) | — | 2026-09-21T13:38:04Z | published-origin | 60cbad1 | this run |
| index | 360 | PASS | 1.1 (Δh -1) | — | 2026-09-21T13:46:47Z | published-origin | 60cbad1 | this run |
| products | 1440 | PASS | 0.4 (Δh 0) | — | 2026-09-21T13:09:41Z | published-origin | bfced58 | this run |
| products | 360 | PASS | 1.35 (Δh 0) | — | 2026-09-21T13:10:37Z | published-origin | bfced58 | this run |
| solutions | 1440 | PASS | 0.16 (Δh -1) | — | 2026-09-21T13:34:08Z | published-origin | 9f8af2c | this run |
| solutions | 360 | PASS | 1.76 (Δh -1) | — | 2026-09-21T13:35:06Z | published-origin | 9f8af2c | this run |
| company | 1440 | PASS | 0.17 (Δh 0) | — | 2026-09-21T13:16:11Z | published-origin | 51c2dc6 | this run |
| company | 360 | PASS | 1.16 (Δh 0) | — | 2026-09-21T13:17:07Z | published-origin | 51c2dc6 | this run |
| index (prototype) | 1440 | PASS | 0.05 (Δh 0) | subpixel-layoutunit → user | 2026-09-21T09:45:31Z | prototype | — | this run |
| index (prototype) | 360 | PASS | 2.69 (Δh -1) | photo-reencoding → delivery | 2026-09-21T09:45:47Z | prototype | — | this run |
| products (prototype) | 1440 | PASS | 0.07 (Δh 0) | third-party-in-flow → delivery | 2026-09-21T10:00:25Z | prototype | — | this run |
| products (prototype) | 360 | PASS | 0.43 (Δh -1) | third-party-in-flow → delivery | 2026-09-21T10:00:40Z | prototype | — | this run |
| solutions (prototype) | 1440 | PASS | 0.09 (Δh -1) | third-party-in-flow → delivery; canon-followup → user; capture-state → delivery | 2026-09-21T09:52:25Z | prototype | — | this run |
| solutions (prototype) | 360 | PASS | 1.61 (Δh -1) | subpixel-layoutunit → user; third-party-in-flow → delivery; canon-followup CF-S1 → user | 2026-09-21T09:52:46Z | prototype | — | this run |
| company (prototype) | 1440 | PASS | 0.06 (Δh 0) | — | 2026-09-21T10:18:23Z | prototype | — | this run |
| company (prototype) | 360 | PASS | 0.23 (Δh 0) | — | 2026-09-21T10:18:38Z | prototype | — | this run |

`build` = the commit each number was measured against; HEAD `625c87f` (wide-viewport container rung) is proven byte-identical to those builds at 1440 and 360 (8/8 stitched compares, 0 px, Δh 0).

Bars: pixel ≤ 10 % · |Δh| ≤ 8 px · 0 structural 🔴 · chrome header/footer crops ≤ 2 % (published: header 0.71–1.07 %, footer 0.36–1.41 %). 4/4 pages verified in the published-origin regime at 1440 and 360.

Measured gates:
- AI-readability (#100): strict 100 / 100 / 100 / 100 (bar 98) — `stardust/rollout/report/ai-readability.json`
- Delivered-page guard: every block `loaded`, grid/flex computing, 0 zero-width images, 0 broken images, 0 page errors, one `<h1>` per page — `stardust/.work/deploy/delivered-check-final.json`
- CLS (fetch-delayed, 6 s): 0 / 0 / 0.016 (products) / 0 — bar 0.1 — `stardust/.work/deploy/cls-wide.json`
- Dynamics parity: 9/10 replays pass, `--gate` exit 0 — `stardust/qa/dynamics-report.md` (the tabs click-control miss is the instrument's 600 ms window; probe shows the switch at ~800 ms)
- Content-count acceptance (migrate): 4/4 PASS · portability audits clean · davids-model-lint 0 🔴 on all six documents
- Wide-viewport (1920) container model: source rung `max-width: 1464px @≥1464` encoded (styles.css + hero/breadcrumbs/tiles/header rungs); h1/hero/container at 1920 match live on all four pages; 8/8 gate-width renders byte-identical after the change; residual: index about band −44 px @1920, solutions live footer variance — `stardust/.work/deploy/reconcile-wide.md`
- neutralDiff: not measured (no `gate-publish.mjs --report` on a preview-only pilot)

site: open (blocked on owner — row `lockdown` owner-only-pending; public repo supplied by the owner)

## Source → target
| source | delivered (preview) | content | blocks |
|---|---|---|---|
| https://www.westerndigital.com/ | https://main--westerndigital-24next-1--paolomoz.aem.page/ | content/index.html | carousel · tabs · cards ×4 · columns |
| https://www.westerndigital.com/products | …/products | content/products.html | hero · breadcrumbs · filters · product-listing · tiles.buy |
| https://www.westerndigital.com/solutions | …/solutions | content/solutions.html | hero ×2 · breadcrumbs · anchor-nav · tiles ×3 · columns · table · accordion |
| https://www.westerndigital.com/company | …/company | content/company.html | hero · (default content) · company-cards ×2 · columns |
| chrome | …/nav, …/footer | content/nav.html, content/footer.html | header · footer |

Repo: https://github.com/paolomoz/westerndigital-24next-1 (`main`) · DA: https://da.live/#/paolomoz/westerndigital-24next-1 · captured variant: headless, consent accept, 2026-09-21 07:52Z, no experiment cookies.

## Residuals, links, decisions
- Residual classes (all named, permanent): `subpixel-layoutunit` (±1 px ladders at 360; chrome search cell 2.02 % vs 2 %), `photo-reencoding` (index 360 prototype band: live `wdthumb.840` vs harvested 3000 px master), `third-party-in-flow` (Genesys chat launcher disc, live only).
- Links: 4-page pilot — every same-origin link outside the four pages bounces to https://www.westerndigital.com (decisions row `links`, `--unmigrated bounce`); the 4 migrated targets are root-relative.
- Recorded drops (conversion log): carousel clone slides, quick-view modals, hidden PLP hero variants, compare tray, contact-form modal — commerce/hidden UI, decided-out or presentational.
- Owner decisions shipping interim (dynamic-features.md § Decision batch): tags/consent property ids (host-gated), Genesys chat, commerce datasource/cart/auth (static snapshot; links bounce), campaign feed, locale trees (root only), search (posts to the source host until the query index exists).
- Plugin gaps ledgered: `stardust/learnings.md` (7 pending entries).

## Next
- Owner: decide the `lockdown` row (command above) and the decision batch.
- `$stardust qa https://main--westerndigital-24next-1--paolomoz.aem.page` for the read-only post-deploy sweep; live publish is a separate explicit `deploy-page.mjs … --publish` run on gate PASS (D1/D16).
