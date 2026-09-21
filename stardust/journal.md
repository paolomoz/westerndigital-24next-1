# Journal — westerndigital.com replica migration

Chronological log of every prompt execution. Most recent at the bottom.
See `skills/stardust/reference/journal-format.md` for entry format.

---

## 2026-09-21T08:14:06Z — Setup + replica Phases 1–2: capture, preserve direction, dynamics gate

**Prompt:** Migrate westerndigital.com to EDS as an exact replica — home + 3 main pages — into paolomoz/westerndigital-24next-1 (repo + DA folder), fully hands-off, first-time migration (no reuse of earlier artefacts).

**Decisions:**
- Flow `replica` (keep-design phrase); hands-off; chain replica → migrate → deploy, preview only.
- Scope: `/`, `/products`, `/solutions`, `/company` (first three header-nav destinations); `/business`, `/support` are the alternates.
- Target is the owner-named existing origin; bootstrap skipped (`bootstrappedBy: existing`); seed nav/footer/index previewed once so the origin answers 200. Lockdown left `owner-only-pending` (public repo supplied by the owner).
- Bounded entry (`--pages`): no `--prep`, so Phase 2 takes the bounded-single promotion branch; root PRODUCT/DESIGN files are synthesized in Phase 3 from page JSON + CSS lift.
- Page types stamped by judgment: index=landing, products=listing, solutions=program, company=static → four archetypes, no siblings.
- Chrome: `chrome-variants.mjs` split two buckets on a third-party StackAdapt stylesheet only; merged into one `default` chrome variant.
- Dynamics: 28 rows, all dispositioned; commerce/auth decided-out; tags host-gated; search posts to the source host until the query index exists; locale trees out of pilot scope.

**Artifacts touched:**
- stardust/state.json — created (flow, handsOff, approvedChain, site.eds, credentials, impeccable, 4 pages extracted + types + chromeVariant + layoutCluster)
- stardust/direction.md, stardust/decisions.md, stardust/status.jsonl — created
- stardust/current/** — crawl (4 pages, 80 assets, 3 Roboto woff2), brand surface (bounded), DESIGN.json, brand-review.html, _dynamics.json
- stardust/replica/{inconsistency-register.md, progress.json, capture/lift/*.json (8), capture/css/} — created
- stardust/dynamic-features.md, stardust/dynamic-features-plan.md, stardust/dynamics/ — created
- stardust/scripts/{extract,replica,diff,deploy,stardust}/ — plugin script sets copied
- .gitignore (stardust block), .hlxignore (stardust/), stardust/.gitignore, .impeccable/ (ignore set) — written

**Findings worth flagging:**
- The site has no `<main>`; the content root is `section.mainContainWrap` — every probe needs `--main section.mainContainWrap` (the first lift pass silently captured chrome only).
- Concurrent live probes (lift + dynamics-detect) drew ERR_CONNECTION_TIMED_OUT from the host for ~2 minutes; one live tool at a time, sequential, recovered cleanly.
- Fonts: Roboto (self-hostable, harvested 400/500/700) is the body face; FK Grotesk Neue and SimplonMono @font-face rules exist in the CSS (licensed) — Phase 3 must check whether any captured element renders them before deciding on a substitute.
- Footer Ethisphere badge failed to load on 2/4 captures (capture-state).

**Open questions:**
- Owner rows: lockdown (off vs on), tags property ids, chat, commerce datasource, locale scope, search results page — all shipping interim (dynamic-features.md § Decision batch).

**Next:** $stardust replica https://www.westerndigital.com (Phase 3 recreate: index, products, solutions, company)

---
