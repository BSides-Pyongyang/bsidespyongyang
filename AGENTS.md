# Repository Instructions

## Project

This is the public source for bsidespyongyang.com. Hugo generates the site and Cloudflare Workers serves the generated static assets.

## Source Of Truth

- Build pages through Hugo content, data, layouts, and partials. Do not add standalone generated HTML pages.
- Keep current-event facts in `data/events/2026.yaml` and reference that data from templates.
- Keep page-specific copy in `content/`, shared presentation in `layouts/`, and processed CSS and JavaScript in `assets/`.
- Keep publishable images, downloads, redirects, headers, and domain files in `static/`.
- Preserve the 2025 archive and its `static/images/logo-2025.png` branding when updating the current 2026 event.
- Use `static/images/logo-2026.png` for current-event branding and keep its transparent background visible.

## Repository Safety

- This repository is public. Never commit credentials, tokens, account identifiers, deploy hooks, private contact data, form responses, speaker submissions, or unpublished review material.
- Keep secrets in Cloudflare-managed settings or ignored local `.dev.vars` files.
- Do not commit generated `public/`, `resources/_gen/`, `.wrangler/`, `node_modules/`, or local editor and agent state.
- Preserve unrelated working-tree changes. Do not rewrite history, change repository identity, push, or deploy unless the user explicitly requests that action.
- Use the repository's configured organization identity for commits.
- Do not hotlink site-owned assets when they can be stored in `static/`.

## Development

Use the Make targets as the supported interface:

- `make install`: install pinned Node dependencies.
- `make dev HUGO_PORT=8009`: run the Hugo development server.
- `make build`: generate the production site.
- `make check`: run the required strict Hugo build and Wrangler dry run.
- `make preview`: preview the built site in the local Workers runtime.
- `make clean`: remove ignored generated output.
- `make deploy`: deploy immediately; run only with explicit production authorization.

Follow existing templates and styles instead of introducing a parallel framework or page system. Keep changes narrowly scoped and responsive in light and dark themes.

## Release Checks

Before handing off a release:

1. Run `make check`.
2. Preview the Workers build and verify the homepage, CFP, archive, PDF download, legacy redirects, security headers, and custom 404.
3. Confirm the 2026 date, CFP links, downloadable PDF, current logo, and 2025 archive branding.
4. Run `git diff --check` and verify that only intended public source and assets are tracked.
5. Confirm the working tree is clean after the local release commit.
