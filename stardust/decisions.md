<!-- stardust:provenance writtenBy=stardust:stardust writtenAt=2026-09-21T07:50:52Z againstInput="hands-off replica migration of westerndigital.com" -->
# Decisions — westerndigital.com → paolomoz/westerndigital-24next-1

| id | question | default | rationale | status | decided-by | evidence |
|---|---|---|---|---|---|---|
| target | deploy target | `paolomoz/westerndigital-24next-1` (existing, public), DA folder of the same name | named in the ask | owner-decided | owner | ask 2026-09-21T07:50:52Z |
| branch | which branch serves | `main` | boilerplate default | default-applied | default | `stardust/direction.md` |
| commit | when does stardust commit | end of each phase, no ask | hands-off | default-applied | default | `stardust/direction.md` |
| publish | when do pages go live | preview only; live is an explicit `--publish` run | D1/D16 | default-applied | default | `stardust/direction.md` |
| lockdown | is the target locked before hand-off | **off** — owner supplied an existing public repo; flipping visibility / adding site auth is an owner action | target is owner-named and public by the owner's own creation | owner-only-pending | — | repo created 2026-09-21 public |
| fonts | how are web fonts served | self-host every family, `fonts/LICENSING.md`; licensed kits get a metric-matched substitute | brand-faithful default | default-applied | default | — |
| links | internal-link boundary | root-relative for migrated targets; unmigrated targets bounced to https://www.westerndigital.com | D9 | default-applied | default | — |
| locale | language layout | source is single-locale at the root (`/`); locale folders (`/en-ap`, …) are out of scope — root stays root for this 4-page pilot | 4-page pilot; a locale tree is a rollout decision | default-applied | stardust | home nav links |
| martech | do tags/analytics ship | kept, host-gated (production host only) | parity without polluting analytics | default-applied | default | — |
| crawl | crawl pace | honour robots.txt (no Crawl-delay declared); 4 pages | politeness | default-applied | default | robots.txt |
| credentials | third-party credentials | listed in `dynamic-features.md` as found; static path proceeds | static path never waits | default-applied | default | — |
| runtime | may the run install browser tooling | yes, under `stardust/` | instrument class | default-applied | default | preflight-runtime |
| deps | where plugin scripts resolve deps | `stardust/node_modules` | one dependency dir | default-applied | default | preflight-runtime |
| tracking | progress tracking outside the session | none — `stardust/journal.md` + `status.jsonl` | — | default-applied | default | — |
| scope | which pages, in which order | wave 1: `/`, `/products`, `/solutions`, `/company`; stop point 4 pages | ask: "home page plus 3 main pages" | default-applied | stardust | `stardust/direction.md` |
| media | are external images rehosted | `rehost-blocked` | ingester rehost baseline | default-applied | default | — |
| dyn | dynamic-surface rows | — pointer: `stardust/dynamic-features.md` § Decision batch | — | — | — | — |
| chrome-variant | second header/footer variant | template body class / per-variant nav doc; gated once | one chrome mechanism | default-applied | default | — |
| index-registration | when is the query index registered | before the first index-backed row; preview-only → interim | D13 | default-applied | default | — |
| chrome-variant | second header/footer variant | **one variant** — `variant-4dea` (solutions, company) differs from `default` only by the third-party `tags.srv.stackadapt.com/sa.css` stylesheet; header/footer class sets and nav rows identical → merged into `default`, one chrome archetype row | evidence-derived, not a chrome delta | default-applied | replica | `chrome-variants.mjs --json` 2026-09-21T08:12:10Z; `stardust/direction.md` |
| dyn | dynamic-surface rows | 28 rows curated — 11 self, 14 owner batch (interim tier ships), 3 decided-out | see `dynamic-features.md` § Decision batch | default-applied | dynamics | `stardust/dynamic-features.md` |
| lockdown | is the target locked before hand-off | — (owner-only) | owner supplied a PUBLIC repo; making it private + adding a site token changes who can see the pilot — an owner action | owner-only-pending | — | unblock: `gh repo edit paolomoz/westerndigital-24next-1 --visibility private` then `node skills/deploy/scripts/lockdown.mjs --org paolomoz --repo westerndigital-24next-1`; or decide `lockdown: off` (public by design) |
