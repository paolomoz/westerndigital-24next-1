# Fonts — licensing record

Decision row `fonts` (stardust/decisions.md): self-host every family rendered on the migrated pages; write this ledger.

| file | family / weight | source | licence | status |
|---|---|---|---|---|
| `roboto-400.woff2` | Roboto 400 (latin) | harvested from `https://static.westerndigital.com/etc.clientlibs/wd-static/designs/fonts/roboto/roboto-v18-latin-regular.woff2` (the source site's own self-hosted file) | Apache License 2.0 (Google / Christian Robertson) — redistribution and web embedding permitted | shipped |
| `roboto-500.woff2` | Roboto 500 (latin) | `…/roboto-v18-latin-500.woff2` | Apache License 2.0 | shipped |
| `roboto-700.woff2` | Roboto 700 (latin) | `…/roboto-v18-latin-700.woff2` | Apache License 2.0 | shipped |

Not shipped (declared in the source CSS but rendered on none of the 4 migrated pages — replica ledger, `stardust/current/assets/_fonts-manifest.json`): FK Grotesk Neue (Florian Karsten, commercial), SimplonMono (Swiss Typefaces, commercial). If a later wave migrates a page that renders them, they need a webfont licence before publishing — add them here with a `⚠ FONT LICENSING REQUIRED` status and the three-place alert (styles.css banner, this file, the conversion log).

No proprietary face ships in this wave, so no licensing alert is raised.

Remove path (if the open licence were ever questioned): delete the three `.woff2` files and the three `@font-face` rules in `styles/fonts.css`; every stack falls back to the metric-matched `roboto-fallback` faces in `styles/styles.css` (local Arial with per-weight `size-adjust`), then `sans-serif`.
