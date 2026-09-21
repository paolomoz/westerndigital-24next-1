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
## 2026-09-21T10:24:07Z — Replica Phases 3–4: four archetypes recreated and gated

**Prompt:** *(continuation of the hands-off run)* Recreate one archetype per page type and pass the source-fidelity gate at 1440 and 360.

**Decisions:**
- Fan-out: four fresh-context workers (index + chrome first, then products, solutions, company; ≤ 2 concurrent for the 2 browser slots). Workers wrote `progress-<slug>.json`; the coordinator recorded rounds with `progress-record.mjs` and merged with `stardust/.work/replica/merge-progress.mjs`.
- Canon = `stardust/prototypes/canon.css` + the chrome markup of `index-proposed.html`, imported verbatim by the other three. Canon follow-ups CF-2 (360 cart flyout), CF-4 (footer +1 px), CF-5 (TrustArc "Cookie Preferences" link, tag-injected, absent on live at rest) fixed in canon; CF-1 skip-link occlusion and CF-3 Ethisphere 500 px rendition justified. Products rebuilt on the final chrome and re-gated (iter3, canon-followup, PASS).
- Chrome variant `variant-4dea` carries the `default` row as evidence (identical chrome; resting crops re-gated on solutions and company).
- Approval: all four pages `approved` with `approvedBy: hands-off` after every bar passed; the one over-bar chrome cell (search 2.02 % vs 2 %) is a permanent-class residual, not a pass.

**Artifacts touched:**
- stardust/prototypes/{canon.css,index*,products*,solutions*,company*,assets/} — created
- stardust/replica/{progress.json, progress-<slug>.json, gates/<slug>-<bp>/, motion/, capture/} — created/updated
- PRODUCT.md, DESIGN.md, DESIGN.json — created (bounded-single)
- stardust/state.json (4 × approved), stardust/status.jsonl, stardust/learnings.md — updated/created

**Findings worth flagging:**
- Gate numbers: 1440 0.05–0.09 % on every page; 360 0.23–2.69 %; the 360 hot band on index is live's `wdthumb.840` rendition vs the harvested 3000 px master (photo-reencoding) — later workers harvested the mobile renditions by response intercept and avoided it.
- `chrome-variants.mjs --progress` cannot express a residual cell (STATE_WORDS) — logged as a plugin gap in `stardust/learnings.md`; no sibling fan-out exists in this 4-page scope, so nothing is blocked by it.
- motion-assert's `entrances` heuristic fails on every page because live mutates inline styles on chrome elements (Splide/commerce init, search skeleton); chrome, stateMachines and pageErrors pass. Advisory in this release.

**Open questions:** none new (owner batch unchanged).

**Next:** $stardust migrate

---
## 2026-09-21T11:01:59Z — migrate: Path A for the four archetypes

**Prompt:** *(continuation)* Emit the platform-agnostic bundle from the approved prototypes.

**Decisions:**
- Canon in the replica flow = `stardust/prototypes/canon.css` + the prototypes' own chrome markup, copied byte-identical to `stardust/canon/` (`canon.source: replica`), never auto-bootstrapped as a redesign would.
- Canonical URL of record = the source URL; sitemap `loc` on the preview host; every same-origin link outside the 4-page scope kept absolute and flagged `data-broken-link` (partial-inventory carve-out: 652 links, 182 targets).
- Two post-gate prototype fixes, both proven pixel-neutral build-side (0.00 %, Δh 0 vs the gated builds at 1440 and 360; `progress.json#archetypes[].postGateFixes`): products `.green-promo` 768–991 px overflow (2 px, a width the gate does not cover); index 10 inactive tab-panel images re-harvested from the source URLs (capture-state gap).

**Artifacts touched:**
- stardust/migrated/{index.html, products/, solutions/, company/, assets/ (116), robots.txt, sitemap.xml} + _meta.json sidecars — created
- stardust/canon/{canon.css, header.html, footer.html} — created · stardust/validation/migrated-*/ — screenshots
- stardust/state.json (4 × migrated, migrate block), stardust/status.jsonl, stardust/replica/progress.json (postGateFixes), stardust/prototypes/{products.css, index-proposed.html}, stardust/current/assets/_media-manifest.json — updated

**Findings worth flagging:**
- The migrate validation's 768×1024 pass is the only gate that looks at the tablet width; the replica gate covers 1440 and 360 only. A flex item whose min-content exceeds a narrow card is invisible at both gate widths.

**Open questions:** none new.

**Next:** $stardust deploy index

---
