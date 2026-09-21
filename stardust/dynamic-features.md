<!-- stardust:provenance writtenBy=stardust:dynamics writtenAt=2026-09-21T08:12:10Z againstInput="replica Phase 2 pre-import gate — westerndigital.com, 4 pages" readArtifacts=stardust/current/_dynamics.json,stardust/dynamics/dynamic-features.generated-plan.md -->
# Dynamic features — westerndigital.com (4-page replica pilot)

Curated from the 28-row draft (`stardust/dynamics/dynamic-features.generated-plan.md`). Hands-off: every non-`self` row ships its interim tier and its decision is recorded below as a named assumption. Target: https://main--westerndigital-24next-1--paolomoz.aem.page (preview only).

## Listings contract
none — the captured pages carry no index-driven listing blocks. The `/products` grid is a commerce PLP (row #17) shipped as a static snapshot; a query-index listing is not part of this pilot.

## Features
| # | id | feature | class | reach | disposition | reproducibility | status | pattern | decision / owner | evidence |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | a-unknown-third-party-host-consent-app-relyance-ai | consent manager (Relyance CMP) | A | 1/4 | embed-passthrough | needs-business-decision | interim (not loaded on preview; host-gated) | consent-gated-tags | owner: CMP property for the new host | _dynamics.json solutions |
| 2 | a-unknown-third-party-host-api-cdn-usw2-pure-cloud | Genesys chat CDN (pure.cloud) | A | 1/4 | embed-passthrough | needs-business-decision | interim (host-gated) | consent-gated-tags | owner: chat deployment id for the new host | _dynamics.json solutions |
| 3 | a-unknown-third-party-host-api-usw2-pure-cloud | Genesys chat API (pure.cloud) | A | 1/4 | embed-passthrough | needs-business-decision | interim (host-gated) | consent-gated-tags | same as #2 | _dynamics.json solutions |
| 4 | a-first-party-api-get-store-cart-getcart | commerce cart GET /store/cart/getCart | A | 1/4 | decided-out | needs-backend | register | decided-out | commerce backend does not exist on the target | _dynamics.json solutions |
| 5 | a-cms-app-settings-object-datalayer | app settings object dataLayer | A | 1/4 | static-snapshot | self | interim (keys recorded, object not shipped until tags ship) | read-settings | none | _dynamics.json |
| 6 | a-cms-app-settings-object-utag-data | app settings object utag_data | A | 3/4 | static-snapshot | self | interim (as #5) | read-settings | none | _dynamics.json |
| 7 | a-first-party-api-get-graphql-execute-json-wd-clpcampaignend | campaign endpoint GET /graphql/execute.json/wd/clpcampaignendpoint… | A | reach 1/4 | static-snapshot | needs-business-decision | interim (captured promo state ships as content; dead on target 404) | off-origin-data | owner: is the promo campaign feed consumed on migrated pages? | products sidecar |
| 8 | d-first-party-data-file-get-content-dam-store-en-us-assets-s | region details JSON (region selector) | D | reach 4/4 | static-snapshot | self | interim (region selector renders the captured DOM; links bounce to source) | sheet-sync | unfreeze: rollout locale decision (#13) | all sidecars |
| 9 | d-first-party-data-file-get-bin-wd-cache-commerce-productref | product reference JSON (commerce) | D | reach 4/4 | static-snapshot | self | interim (dead on target) | sheet-sync | unfreeze: commerce decision (#27/#28) | all sidecars |
| 10 | d-first-party-data-file-get-content-dam-g-tech-en-us-portal- | country list JSON | D | reach 1/4 | static-snapshot | self | interim | sheet-sync | unfreeze: rollout locale decision (#13) | solutions |
| 11 | d-first-party-data-file-get-chatbot-locales-en-us-translatio | chatbot translations JSON | D | reach 4/4 | static-snapshot | self | interim (chat not shipped, see #2) | sheet-sync | unfreeze: chat decision (#2) | all sidecars |
| 12 | d-first-party-data-file-get-bin-wd-cache-commerce-customprom | custom promotions JSON (commerce) | D | reach 2/4 | static-snapshot | self | interim (captured promo banner ships as content) | sheet-sync | unfreeze: commerce decision | index, products |
| 13 | i18n-locale-variants-x-default-en | locale variants (hreflang x-default, en + ~70 locales) | I18N | 3/4 | rebuild-native | needs-business-decision | scaffolded-awaiting-owner (pilot ships `/` root single-locale; hreflang not emitted) | locale-tree | owner: scope of the locale trees (decisions.md row `locale`) | sidecar hreflang |
| 14 | m-modal-trigger-wd-modal-btn-chrome-only-target-outside-dom- | chrome modal trigger wd-modal-btn (sign-in / promo modal) | M | 1/4 | rebuild-native | self | pending → Phase 4 motion parity (implemented only if motion-observe sees it fire) | chrome-interaction | none | motion/<slug>.json |
| 15 | m-tabs-expanders-role-tablist-aria-expanded-controls | home "Shop by Category / Solutions / Industries" tablist + 3 expanders | M | 1/4 | rebuild-native | self | pending → block JS on the home archetype | modal-loader | none | index sidecar |
| 16 | s-site-search-form-js-submitted | header site search (JS-submitted, predictive) | S | 3/4 (reach 4/4) | index-backed | self | interim (form submits to https://www.westerndigital.com/search?q= on the source host; predictive dropdown not shipped) | search-index-backed | unfreeze: query index registered at rollout (D13) | all sidecars |
| 17 | s-first-party-api-get-wdwebservices-v2-us-products-search | products PLP search API /wdwebservices/v2/us/products/search | S | reach 1/4 | static-snapshot | needs-business-decision | interim (captured first page of the grid ships as content; filters/sort inert) | off-origin-data | owner: datasource ownership / same-origin routing for the catalog | products sidecar |
| 18 | t-tag-manager-adobe-launch | Adobe Launch | T | 3/4 | embed-passthrough | needs-business-decision | interim (host-gated: production host only) | consent-gated-tags | owner: property id for the new host | all sidecars |
| 19 | t-rum-akamai-mpulse | Akamai mPulse RUM | T | reach 4/4 | embed-passthrough | needs-business-decision | interim (host-gated) | consent-gated-tags | owner | all sidecars |
| 20 | t-marketing-ad-retargeting-pixel | ad / retargeting pixels (StackAdapt et al.) | T | reach 10/4 | embed-passthrough | needs-business-decision | interim (host-gated) | consent-gated-tags | owner | company |
| 21 | t-chat-live-chat-widget | live chat widget (Genesys) | T | 1/4 | embed-passthrough | needs-business-decision | interim (host-gated; see #2) | consent-gated-tags | owner | solutions |
| 22 | t-rum-new-relic | New Relic RUM | T | reach 4/4 | embed-passthrough | needs-business-decision | interim (host-gated) | consent-gated-tags | owner | all sidecars |
| 23 | t-tag-manager-google-tag-manager | Google Tag Manager | T | reach 2/4 | embed-passthrough | needs-business-decision | interim (host-gated) | consent-gated-tags | owner | company, solutions |
| 24 | t-analytics-adobe-analytics-experience-cloud-id | Adobe Analytics / ECID | T | reach 2/4 | embed-passthrough | needs-business-decision | interim (host-gated) | consent-gated-tags | owner | company, solutions |
| 25 | t-social-proof-reviews-widget | reviews widget (social proof) | T | reach 1/4 | embed-passthrough | needs-business-decision | interim (host-gated; no visible instance on the captured pages) | consent-gated-tags | owner | index |
| 26 | v-video-youtube | YouTube video | V | reach 4/4 | embed-passthrough | self | pending → media-as-url (embed block) where a captured page renders one | media-as-url | none | all sidecars |
| 27 | x-sign-in-account-links | sign-in / account links (header) | X | 3/4 | decided-out | needs-backend | register (links kept, bounce to source host) | decided-out | owner: auth on the new host | all sidecars |
| 28 | x-commerce-signals-cart-true-prices-0 | commerce signals (cart icon, prices) | X | 3/4 | decided-out | needs-backend | register (cart icon links to source store) | decided-out | owner: commerce on the new host | all sidecars |

## Decision batch
One message to the owner; every row ships its interim tier meanwhile (hands-off named assumptions):
1. **Tags & consent (#1, #18–#25):** which tags run on the new host and their property ids. Assumed: host-gated — nothing loads on preview or local; production host only.
2. **Chat (#2, #3, #11, #21):** Genesys deployment for the new host. Assumed: not shipped in the pilot.
3. **Commerce (#4, #9, #12, #17, #27, #28):** catalog datasource, cart, auth. Assumed: none on the target — the PLP grid ships as a static snapshot, cart/account links bounce to https://www.westerndigital.com.
4. **Campaign feed (#7):** consumer on migrated pages? Assumed: captured promo state ships as content.
5. **Locale trees (#13, #8, #10):** scope of the ~70 locales. Assumed: pilot ships the root locale only; no hreflang alternates emitted.
6. **Search (#16):** results page scope. Assumed: header search posts to the source host until the query index is registered at rollout.

## Register (decided-out)
| feature | reason | production statement |
|---|---|---|
| commerce cart API (#4) | session-bound commerce backend; no consumer can exist on a static EDS target | Cart and checkout remain on www.westerndigital.com; the migrated header cart icon links there. |
| sign-in / account links (#27) | authenticated store; no auth backend on the target | Account links resolve to the source store until an owner decides on auth. |
| commerce signals (#28) | prices/cart are commerce runtime state | Prices shown are the captured values; no live pricing on the migrated pages. |
