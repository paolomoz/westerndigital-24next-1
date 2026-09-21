# Dynamic features — detected (2026-09-21T07:57:46.584Z)

Pages probed: /solutions · settle 5000 ms · width 1440 · reach from 4/4 crawled pages

Evidence only. Every row must receive a disposition in `stardust/dynamic-features.md` (`dynamics-plan.mjs` drafts it).

| id | class | feature | pages | reach | evidence | hint |
|---|---|---|---|---|---|---|
| a-unknown-third-party-host-consent-app-relyance-ai | A API / personalisation / settings | unknown third-party host consent.app.relyance.ai | 1/1 |  | consent.app.relyance.ai | inspect |
| a-unknown-third-party-host-api-cdn-usw2-pure-cloud | A API / personalisation / settings | unknown third-party host api-cdn.usw2.pure.cloud | 1/1 |  | api-cdn.usw2.pure.cloud | inspect |
| a-unknown-third-party-host-api-usw2-pure-cloud | A API / personalisation / settings | unknown third-party host api.usw2.pure.cloud | 1/1 |  | api.usw2.pure.cloud | inspect |
| a-first-party-api-get-store-cart-getcart | A API / personalisation / settings | first-party API GET /store/cart/getCart | 1/1 |  | GET /store/cart/getCart?fields → 200 | api |
| a-cms-app-settings-object-datalayer | A API / personalisation / settings | CMS / app settings object dataLayer | 1/1 |  |  | settings |
| a-cms-app-settings-object-utag-data | A API / personalisation / settings | CMS / app settings object utag_data | 1/1 |  | analyticsTrackingID<br>sitePlatform<br>thumbnailURL | settings |
| a-first-party-api-get-graphql-execute-json-wd-clpcampaignend | A API / personalisation / settings | first-party API GET /graphql/execute.json/wd/clpcampaignendpoint;group1=all;group2=undefined;group3=undefined;group4=undefined;group5=undefined;group6=undefined;group7=undefined;group8=undefined;group9=undefined;group10=undefined;group11=undefined;brand1=all;channel=B2C;locale=/content/dam/store/cf/en-us | 0/1 | 1/4 | products | reach-only (api; re-probe one page with --urls) |
| d-first-party-data-file-get-content-dam-store-en-us-assets-s | D sheet / data file | first-party data file GET /content/dam/store/en-us/assets/sys/region-details/regiondetail.xlsx.exceltojson.json | 1/1 | 4/4 | GET /content/dam/store/en-us/assets/sys/region-details/regiondetail.xlsx.exceltojson.json → 200 | data |
| d-first-party-data-file-get-bin-wd-cache-commerce-productref | D sheet / data file | first-party data file GET /bin/wd/cache/commerce/productreference.en-us.json | 1/1 | 4/4 | GET /bin/wd/cache/commerce/productreference.en-us.json → 200 | data |
| d-first-party-data-file-get-content-dam-g-tech-en-us-portal- | D sheet / data file | first-party data file GET /content/dam/g-tech/en-us/portal-assets/data-excel/country.xlsx.exceltojson.json | 1/1 | 1/4 | GET /content/dam/g-tech/en-us/portal-assets/data-excel/country.xlsx.exceltojson.json → 200 | data |
| d-first-party-data-file-get-chatbot-locales-en-us-translatio | D sheet / data file | first-party data file GET /chatbot/locales/en-us/translation.json | 1/1 | 4/4 | GET /chatbot/locales/en-us/translation.json → 200 | data |
| d-first-party-data-file-get-bin-wd-cache-commerce-customprom | D sheet / data file | first-party data file GET /bin/wd/cache/commerce/custompromotions.en-us.json | 0/1 | 2/4 | index<br>products | reach-only (data; re-probe one page with --urls) |
| i18n-locale-variants-x-default-en | I18N locale | locale variants x-default,en | 1/1 |  | https://www.westerndigital.com/en-us<br>https://www.facebook.com/WD | locale |
| m-modal-trigger-wd-modal-btn-chrome-only-target-outside-dom- | M modal / interactive | modal trigger wd-modal-btn (chrome only) → target outside DOM at capture | 1/1 | 2/4 | https://www.westerndigital.com/solutions#contact-form | chrome-interaction |
| m-tabs-expanders-role-tablist-aria-expanded-controls | M modal / interactive | tabs / expanders (role=tablist, aria-expanded controls) | 0/1 | 1/4 | index | reach-only (modal; re-probe one page with --urls) |
| s-site-search-form-js-submitted | S search | site search form → (JS-submitted) | 1/1 | 4/4 | text:q<br>select:fs_1_productCategoryContactUs,text:,text:firstName,text:lastName,text:phone,text:email,text:cusJobTitle,text:ext_regBusinessName,select:ext_prefIndustry,text:,select:ext_regNumOfEmp,text: | search |
| s-first-party-api-get-wdwebservices-v2-us-products-search | S search | first-party API GET /wdwebservices/v2/us/products/search | 0/1 | 1/4 | products | reach-only (search; re-probe one page with --urls) |
| t-tag-manager-adobe-launch | T tag / consent | tag manager: Adobe Launch | 1/1 | 4/4 | assets.adobedtm.com | tags |
| t-rum-akamai-mpulse | T tag / consent | RUM: Akamai mPulse | 1/1 | 4/4 | s.go-mpulse.net<br>c.go-mpulse.net | tags |
| t-marketing-ad-retargeting-pixel | T tag / consent | marketing: ad / retargeting pixel | 1/1 | 10/4 | connect.facebook.net | tags |
| t-chat-live-chat-widget | T tag / consent | chat: live chat widget | 1/1 |  | apps.usw2.pure.cloud | tags |
| t-rum-new-relic | T tag / consent | RUM: New Relic | 1/1 | 4/4 | js-agent.newrelic.com<br>bam.nr-data.net | tags |
| t-tag-manager-google-tag-manager | T tag / consent | tag manager: Google Tag Manager | 0/1 | 2/4 | company<br>solutions | reach-only (tags; re-probe one page with --urls) |
| t-analytics-adobe-analytics-experience-cloud-id | T tag / consent | analytics: Adobe Analytics / Experience Cloud ID | 0/1 | 2/4 | company<br>solutions | reach-only (tags; re-probe one page with --urls) |
| t-social-proof-reviews-widget | T tag / consent | social proof: reviews widget | 0/1 | 1/4 | index | reach-only (tags; re-probe one page with --urls) |
| v-video-youtube | V media | video: YouTube | 1/1 | 4/4 | www.youtube.com | media |
| x-sign-in-account-links | X auth / commerce | sign-in / account links | 1/1 |  | https://www.westerndigital.com/products/accessories<br>https://www.westerndigital.com/business/account-benefits<br>https://www.westerndigital.com/store/business/registration?lp=register | decided-out |
| x-commerce-signals-cart-true-prices-0 | X auth / commerce | commerce signals (cart: true, prices: 0) | 1/1 |  |  | decided-out |
