# Learnings ledger — westerndigital.com replica (paolomoz/westerndigital-24next-1)

Per `skills/stardust/reference/learnings.md`. Appended by the run; maintainers harvest `pending` entries.

### lift.mjs default `--main main` silently captured chrome only
- failure class: capture-gap
- evidence: first lift pass (2026-09-21T10:04:38Z run, all 4 pages × 2 widths) reported "main not found, 0 sections" and returned ~375 elements (header+footer only); the site's content root is `section.mainContainWrap`. Re-run with `--roots header,section.mainContainWrap,footer --main section.mainContainWrap` gave 742–1401 elements.
- proposed change: `skills/replica/scripts/lift.mjs` — when `--main` is not found, fall back to the page record's main landmark selector (`current/pages/<slug>.json#landmarks[role=main].selector`) or exit non-zero instead of exit 0 with a chrome-only record; `skills/replica/SKILL.md` Phase 3 row: name the content-root rule beside `--width`.
- status: pending

### chrome-variants STATE_WORDS has no word for a residual cell
- failure class: instrument-gap
- evidence: chrome cell `search` on variant `default` measured 2.02 % vs the 2 % crop bar after 11 build-only replays, logged as residual `subpixel-layoutunit` per `chrome-states.md` § Residual route (region + cause + artifacts + acceptedBy). `chrome-variants.mjs --progress` accepts only `gated | dead | unprobed:<reason>` (`STATE_WORDS`), so the honest record `residual:subpixel-layoutunit` reports the variant as blocked although the contract names the residual route as a valid terminal state.
- proposed change: `skills/replica/scripts/chrome-variants.mjs` — admit `residual:<class>` when the class is a permanent residual class and the archetype's `breakpoints.<bp>.residuals[]` carries a row with `region: <state>`; `chrome-states.md` § Chrome variants: document the word.
- status: pending

### chrome-variants split one chrome into two variants on a third-party stylesheet
- failure class: false-variant
- evidence: `variant-4dea` (solutions, company) vs `default` (index, products) differed only by `tags.srv.stackadapt.com/sa.css` (an ad tag); header/footer class sets and nav rows identical. Resolved by hand-merge (decisions.md row `chrome-variant`).
- proposed change: `skills/replica/scripts/chrome-variants.mjs` — exclude cross-origin stylesheets (or hosts in `dynamics/scripts/vendors.json`) from the fingerprint, or print the differing stylesheet so the merge is one line.
- status: pending

### layout-cluster.mjs project copy needs skills/deploy/scripts beside it
- failure class: script-set
- evidence: `stardust/scripts/replica/layout-cluster.mjs --write-state` failed "deploy schema-checks.mjs not found" until `skills/deploy/scripts/` was copied to `stardust/scripts/deploy/`.
- proposed change: `skills/replica/SKILL.md` Setup step 4 — add `../deploy/scripts/` → `stardust/scripts/deploy/` to the copy set.
- status: pending

### dynamics-detect --offline still navigates the live origin
- failure class: live-budget
- evidence: `dynamics-detect.mjs --from-state … --offline` ran concurrently with `lift.mjs`; the host answered ERR_CONNECTION_TIMED_OUT for ~2 min on both instruments (`/solutions` failed, re-probed later).
- proposed change: `skills/dynamics/scripts/dynamics-detect.mjs` — document what `--offline` covers, and take the per-host live lock (`stardust/.work/live-<host>.lock`) like the replica instruments.
- status: pending

### code-sync-verify reports head.html as STALE on every run
- failure class: instrument-gap
- evidence: `code-sync-verify.mjs --org paolomoz --repo westerndigital-24next-1 --ref main` exits 124 with `STALE head.html … sha=differ` although head.html is unchanged since the boilerplate's initial commit; the served `/head.html` is pipeline-transformed (the CSP `<meta move-to-http-header>` is lifted to a header and the `nonce="aem"` is rewritten per response), so its bytes can never equal the tree's.
- proposed change: `skills/deploy/scripts/code-sync-verify.mjs` — compare `head.html` after applying the known transforms (drop the move-to-http-header meta, normalise `nonce="…"`), or exclude it from the byte comparison and report it as `transformed`.
- status: pending

### qa-gate pairs schema sections with block instances by order
- failure class: instrument-gap
- evidence: `qa-gate.mjs <harness> --schema stardust/eds-schema/{solutions,company}.json` reported 5 and 2 `units:` fails whose real counts the harness probes prove (`stardust/.work/deploy/_solutions-harness-probe.mjs`, `_company-harness-probe.json`): the gate pairs schema section *i* with rendered block instance *i*, so a `defaultContent: true` section (company/vision) or a section holding two blocks (solutions page-nav = breadcrumbs + anchor-nav) shifts every later pairing by one; `<tr>` units of the `table` block are also not a rendered-unit proxy.
- proposed change: `skills/deploy/scripts/qa-gate.mjs` — build the position map from sections that carry a block (skip `defaultContent`), pair by `schema.block` name + ordinal when present, and count `table` units by rows of the decorated block.
- status: pending

### prototype-to-content cannot emit two blocks in one section or a variant token via --map
- failure class: generator-gap
- evidence: products (filters + product-listing in one `split-aside` section) and solutions (breadcrumbs + anchor-nav) needed patch files to land the second block; `--map <section>=block:tiles` cannot carry the `buy` variant (attribute patch); Title is taken from the `<h1>` instead of the captured `<title>`.
- proposed change: `skills/deploy/scripts/prototype-to-content.mjs` — accept `block:<name>.<variant>` and a repeatable `--map` per section for multi-block sections; read Title/Description from `stardust/current/pages/<slug>.json` when `--slug` is given.
- status: pending
