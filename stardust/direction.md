---
_provenance:
  writtenBy: stardust:stardust
  writtenAt: 2026-09-21T07:50:52Z
  againstInput: "migrate https://www.westerndigital.com to EDS as an exact replica — home page + 3 main pages; repo paolomoz/westerndigital-24next-1; DA folder /paolomoz/westerndigital-24next-1; fully hands off; first-time migration"
  readArtifacts: []
---

# Direction — westerndigital.com replica migration

## Hands-off activation (2026-09-21T07:50:52Z)

Activated by the user phrase: "fully hands off". Flow: **replica** (selected by the keep-design phrase "exact replica", flowSource: user-phrase). Approved chain: replica → migrate → deploy (preview only — no publish was asked).

Named assumptions (hands-off, derived from the ask and the captured evidence):

- **Scope (wave 1 of 1, stop point = 4 pages):** home (`/`) plus the three header-nav section landings `/products`, `/solutions`, `/company`. "3 main pages" read as the first three top-level nav destinations after Home; `/business`, `/support` are the alternates the owner may swap in.
- **Target:** owner-named existing origin `paolomoz/westerndigital-24next-1` (public repo, DA folder of the same name, site config already on the DA content source) — site-bootstrap skipped, `bootstrappedBy: existing`; seed nav/footer/index were previewed once so the origin answers 200.
- **First-time migration:** no artefact from any earlier westerndigital migration on this machine or in other repos is read, copied or reused. Every input comes from this run's own capture under `stardust/current/`.
- **Commits** land at each phase end without asking (hands-off overrides the ask-before-commit preference for this run).
- **Publish:** preview only (D16); live publish is a separate explicit run.

Impeccable ignore set (2026-09-21): impeccable 4.3.1 · files: stardust/current/** stardust/prototypes/** stardust/canon/** · values: 9 (colors 6, sizes 2, families 1; 9 new) · from: stardust/current/_brand-extraction.json · resolved by: hands-off

# Direction — preserve mode (same-design migration)

Mode: PRESERVE. The target spec is the captured current state of https://www.westerndigital.com,
promoted mechanically (no direct invocation, no creative decisions).

Synthesized (bounded-single): current/pages/{index,products,solutions,company}.json + Phase-3 CSS lift
(stardust/replica/capture/lift/<slug>-<w>.json) → PRODUCT.md · DESIGN.md · DESIGN.json (at Phase 3, provenance `bounded-single`).
Reason for the bounded branch: the ask scopes 4 pages (`--pages`), so extract ran without `--prep` and
`current/PRODUCT.md` / `current/DESIGN.md` were never synthesized; `current/DESIGN.json` (tokens, mode bounded) exists and is a source.

Permitted deltas: ONLY the entries of stardust/replica/inconsistency-register.md (empty — pure replica).

Fidelity: ia verbatim · design verbatim · content verbatim.

Archetypes (one per page type, each its own composition — no siblings in this 4-page scope):
landing → index (`/`) · listing → products (`/products`) · program → solutions (`/solutions`) · static → company (`/company`).
Chrome: one real variant. `chrome-variants.mjs` split `default` {index, products} from `variant-4dea` {solutions, company}
on the stylesheet list alone (tags.srv.stackadapt.com/sa.css — a third-party ad tag, not chrome); header/footer class sets
and nav rows are identical. Resolved: `variant-4dea` merges into `default`; one chrome archetype row (`chrome-variant` decision row, hands-off default).
Content root for every probe (`--main`): `section.mainContainWrap` (the site has no `<main>`).
- Impeccable ignore set (2026-09-21, run close): value ignores added — design-system-font `Roboto-Fallback` (deploy Step 4 metric-matched fallback), layout-transition `max-height 0.5s ease-out` and `max-height 0.4s ease, opacity 0.4s ease` (lifted source accordion transitions, motion-observe evidence) · resolved by: hands-off
