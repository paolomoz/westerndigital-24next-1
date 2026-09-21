<!-- stardust:provenance writtenBy=stardust:dynamics writtenAt=2026-09-21T08:12:10Z againstInput="replica Phase 2 pre-import gate" readArtifacts=stardust/dynamic-features.md -->
# Dynamic features — plan (westerndigital.com 4-page replica pilot)

Static first, then wire. Every row is placed exactly once. Phases in delivery order; rows marked *interim* ship their degradation in the static path.

## Phase P0 — static path (deploy pilot)
Deliverable: the 4 archetypes as EDS content + blocks; interim behaviours. Verification: content-count + published-origin gate. Owner decision: none. Effort: in the deploy step.
- #5 app settings object dataLayer — keys recorded in `_dynamics.json`, not shipped
- #6 app settings object utag_data — as #5
- #7 campaign endpoint — captured promo state ships as content (dead on target)
- #8 region details JSON — region selector renders captured DOM, links bounce to source
- #9 product reference JSON — static (dead on target)
- #10 country list JSON — static
- #11 chatbot translations JSON — not shipped (chat not shipped)
- #12 custom promotions JSON — captured promo banner ships as content
- #17 products PLP search API — captured first page of the grid ships as content; filters/sort inert
- #26 YouTube video — embed block (media-as-url) where a captured page renders a player

## Phase P1 — chrome interactions (replica Phase 4 motion parity → header/footer blocks)
Deliverable: nav menus, search box, mobile drawer, modal trigger only where motion-observe saw it fire. Verification: `motion-assert.mjs` per archetype + `chrome-states.mjs` cells. Owner decision: none. Effort: replica Phase 4.
- #14 chrome modal trigger wd-modal-btn — implemented only if observed firing
- #15 home tablist + expanders — block JS on the home archetype
- #16 header site search — form posts to https://www.westerndigital.com/search?q= (interim); index-backed at rollout (D13)

## Phase P2 — tags & consent (owner batch 1–2)
Deliverable: `scripts/site-config.js` host gate; tags load on the production host only. Verification: `dynamics-check.mjs` tag rows on the published origin. Owner decision: property ids. Effort: small, after the owner answers.
- #1 Relyance CMP
- #2 Genesys chat CDN
- #3 Genesys chat API
- #18 Adobe Launch
- #19 Akamai mPulse
- #20 ad / retargeting pixels
- #21 live chat widget
- #22 New Relic
- #23 Google Tag Manager
- #24 Adobe Analytics / ECID
- #25 reviews widget

## Phase P3 — locale wave (owner batch 5, rollout scope)
Deliverable: per-locale folders + hreflang. Verification: hreflang parity. Owner decision: locale scope. Effort: rollout.
- #13 locale variants — scaffolded-awaiting-owner

## Register — decided-out (owner batch 3)
- #4 commerce cart API
- #27 sign-in / account links
- #28 commerce signals
