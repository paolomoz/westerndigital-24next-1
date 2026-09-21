<!-- stardust provenance: skill=stardust:dynamics · phase=plan draft · 2026-09-21T08:10:37.512Z · input stardust/current/_dynamics.json (1 pages, 28 findings) -->
# Dynamic features — draft inventory (curate into `stardust/dynamic-features.md`)

One row per detected finding. Merge duplicates, drop noise, keep every axis honest. Columns: disposition = what we do · reproducibility = what it needs · status = where it stands (reference/triage.md).

| # | id | class | feature | pages | disposition | reproducibility | status | pattern | decision needed | notes |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | a-unknown-third-party-host-consent-app-relyance-ai | A | unknown third-party host consent.app.relyance.ai | 1/1 | static-snapshot | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 2 | a-unknown-third-party-host-api-cdn-usw2-pure-cloud | A | unknown third-party host api-cdn.usw2.pure.cloud | 1/1 | static-snapshot | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 3 | a-unknown-third-party-host-api-usw2-pure-cloud | A | unknown third-party host api.usw2.pure.cloud | 1/1 | static-snapshot | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 4 | a-first-party-api-get-store-cart-getcart | A | first-party API GET /store/cart/getCart | 1/1 | decided-out | needs-backend | pending | decided-out | none (session-bound off-origin) |  |
| 5 | a-cms-app-settings-object-datalayer | A | CMS / app settings object dataLayer | 1/1 | static-snapshot | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 6 | a-cms-app-settings-object-utag-data | A | CMS / app settings object utag_data | 1/1 | static-snapshot | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 7 | a-first-party-api-get-graphql-execute-json-wd-clpcampaignend | A | first-party API GET /graphql/execute.json/wd/clpcampaignendpoint;group1=all;group2=undefined;group3=undefined;group4=undefined;group5=undefined;group6=undefined;group7=undefined;group8=undefined;group9=undefined;group10=undefined;group11=undefined;brand1=all;channel=B2C;locale=/content/dam/store/cf/en-us | 0/1 (reach 1/4) | data-fed | needs-business-decision | pending | off-origin-data | which tier for the target host; consumer on the migrated pages? |  |
| 8 | d-first-party-data-file-get-content-dam-store-en-us-assets-s | D | first-party data file GET /content/dam/store/en-us/assets/sys/region-details/regiondetail.xlsx.exceltojson.json | 1/1 (reach 4/4) | data-fed | self | pending | sheet-sync | none (sync from the source origin) |  |
| 9 | d-first-party-data-file-get-bin-wd-cache-commerce-productref | D | first-party data file GET /bin/wd/cache/commerce/productreference.en-us.json | 1/1 (reach 4/4) | data-fed | self | pending | sheet-sync | none (sync from the source origin) |  |
| 10 | d-first-party-data-file-get-content-dam-g-tech-en-us-portal- | D | first-party data file GET /content/dam/g-tech/en-us/portal-assets/data-excel/country.xlsx.exceltojson.json | 1/1 (reach 1/4) | data-fed | self | pending | sheet-sync | none (sync from the source origin) |  |
| 11 | d-first-party-data-file-get-chatbot-locales-en-us-translatio | D | first-party data file GET /chatbot/locales/en-us/translation.json | 1/1 (reach 4/4) | data-fed | self | pending | sheet-sync | none (sync from the source origin) |  |
| 12 | d-first-party-data-file-get-bin-wd-cache-commerce-customprom | D | first-party data file GET /bin/wd/cache/commerce/custompromotions.en-us.json | 0/1 (reach 2/4) | data-fed | self | pending | sheet-sync | none (sync from the source origin) |  |
| 13 | i18n-locale-variants-x-default-en | I18N | locale variants x-default,en | 1/1 | rebuild-native | needs-business-decision | pending | locale-tree | scope of the locale trees |  |
| 14 | m-modal-trigger-wd-modal-btn-chrome-only-target-outside-dom- | M | modal trigger wd-modal-btn (chrome only) → target outside DOM at capture | 1/1 (reach 2/4) | rebuild-native | self | pending | chrome-interaction | none (motion-observe evidence) |  |
| 15 | m-tabs-expanders-role-tablist-aria-expanded-controls | M | tabs / expanders (role=tablist, aria-expanded controls) | 0/1 (reach 1/4) | rebuild-native | self | pending | modal-loader | none |  |
| 16 | s-site-search-form-js-submitted | S | site search form → (JS-submitted) | 1/1 (reach 4/4) | index-backed | self | pending | search-index-backed | results page scope (second corpora stay out) |  |
| 17 | s-first-party-api-get-wdwebservices-v2-us-products-search | S | first-party API GET /wdwebservices/v2/us/products/search | 0/1 (reach 1/4) | data-fed | needs-business-decision | pending | off-origin-data | datasource ownership / same-origin routing on production |  |
| 18 | t-tag-manager-adobe-launch | T | tag manager: Adobe Launch | 1/1 (reach 4/4) | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 19 | t-rum-akamai-mpulse | T | RUM: Akamai mPulse | 1/1 (reach 4/4) | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 20 | t-marketing-ad-retargeting-pixel | T | marketing: ad / retargeting pixel | 1/1 (reach 10/4) | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 21 | t-chat-live-chat-widget | T | chat: live chat widget | 1/1 | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 22 | t-rum-new-relic | T | RUM: New Relic | 1/1 (reach 4/4) | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 23 | t-tag-manager-google-tag-manager | T | tag manager: Google Tag Manager | 0/1 (reach 2/4) | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 24 | t-analytics-adobe-analytics-experience-cloud-id | T | analytics: Adobe Analytics / Experience Cloud ID | 0/1 (reach 2/4) | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 25 | t-social-proof-reviews-widget | T | social proof: reviews widget | 0/1 (reach 1/4) | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 26 | v-video-youtube | V | video: YouTube | 1/1 (reach 4/4) | embed-passthrough | self | pending | media-as-url | none (player ids are public) |  |
| 27 | x-sign-in-account-links | X | sign-in / account links | 1/1 | decided-out | needs-backend | pending | decided-out | auth / commerce on the new host? |  |
| 28 | x-commerce-signals-cart-true-prices-0 | X | commerce signals (cart: true, prices: 0) | 1/1 | decided-out | needs-backend | pending | decided-out | auth / commerce on the new host? |  |

## Triage

- **Ships autonomously (reproducibility `self`):** 11 row(s) — read-settings, sheet-sync, chrome-interaction, modal-loader, search-index-backed, media-as-url.
- **One owner decision batch:** 14 row(s) — inspect the XHR, add a vendor row · which tier for the target host; consumer on the migrated pages? · scope of the locale trees · datasource ownership / same-origin routing on production · which tags run on the new host; property ids.
- **Already delivered by the capture pipeline:** 0 row(s) — no work.
- **Host-bound on the target:** 0 of 0 probed API paths — the off-origin data work.

## Phases

<!-- one list item per inventory row, `- #N …`; `dynamics-plan.mjs --lint` checks every row is placed once -->
- **tags** — 8
  - #18 tag manager: Adobe Launch (T, embed-passthrough, needs-business-decision)
  - #19 RUM: Akamai mPulse (T, embed-passthrough, needs-business-decision)
  - #20 marketing: ad / retargeting pixel (T, embed-passthrough, needs-business-decision)
  - #21 chat: live chat widget (T, embed-passthrough, needs-business-decision)
  - #22 RUM: New Relic (T, embed-passthrough, needs-business-decision)
  - #23 tag manager: Google Tag Manager (T, embed-passthrough, needs-business-decision)
  - #24 analytics: Adobe Analytics / Experience Cloud ID (T, embed-passthrough, needs-business-decision)
  - #25 social proof: reviews widget (T, embed-passthrough, needs-business-decision)
- **detect** — 5
  - #1 unknown third-party host consent.app.relyance.ai (A, static-snapshot, needs-human-capture)
  - #2 unknown third-party host api-cdn.usw2.pure.cloud (A, static-snapshot, needs-human-capture)
  - #3 unknown third-party host api.usw2.pure.cloud (A, static-snapshot, needs-human-capture)
  - #5 CMS / app settings object dataLayer (A, static-snapshot, self)
  - #6 CMS / app settings object utag_data (A, static-snapshot, self)
- **data** — 5
  - #8 first-party data file GET /content/dam/store/en-us/assets/sys/region-details/regiondetail.xlsx.exceltojson.json (D, data-fed, self)
  - #9 first-party data file GET /bin/wd/cache/commerce/productreference.en-us.json (D, data-fed, self)
  - #10 first-party data file GET /content/dam/g-tech/en-us/portal-assets/data-excel/country.xlsx.exceltojson.json (D, data-fed, self)
  - #11 first-party data file GET /chatbot/locales/en-us/translation.json (D, data-fed, self)
  - #12 first-party data file GET /bin/wd/cache/commerce/custompromotions.en-us.json (D, data-fed, self)
- **register** — 3
  - #4 first-party API GET /store/cart/getCart (A, decided-out, needs-backend)
  - #27 sign-in / account links (X, decided-out, needs-backend)
  - #28 commerce signals (cart: true, prices: 0) (X, decided-out, needs-backend)
- **off-origin data** — 2
  - #7 first-party API GET /graphql/execute.json/wd/clpcampaignendpoint;group1=all;group2=undefined;group3=undefined;group4=undefined;group5=undefined;group6=undefined;group7=undefined;group8=undefined;group9=undefined;group10=undefined;group11=undefined;brand1=all;channel=B2C;locale=/content/dam/store/cf/en-us (A, data-fed, needs-business-decision)
  - #17 first-party API GET /wdwebservices/v2/us/products/search (S, data-fed, needs-business-decision)
- **interactive** — 2
  - #14 modal trigger wd-modal-btn (chrome only) → target outside DOM at capture (M, rebuild-native, self)
  - #15 tabs / expanders (role=tablist, aria-expanded controls) (M, rebuild-native, self)
- **locale wave** — 1
  - #13 locale variants x-default,en (I18N, rebuild-native, needs-business-decision)
- **search** — 1
  - #16 site search form → (JS-submitted) (S, index-backed, self)
- **media** — 1
  - #26 video: YouTube (V, embed-passthrough, self)
