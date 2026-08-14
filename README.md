# BSides Pyongyang

Public source for [bsidespyongyang.com](https://bsidespyongyang.com/), a virtual security conference focused on cybersecurity research connected to the DPRK.

The site is generated with Hugo and deployed as static assets on Cloudflare Workers. Generated files are not committed.

## Requirements

- Hugo Extended 0.123.7 or newer
- Node.js 22 or newer
- npm
- Make

## Quick start

Install the pinned Node dependencies:

```sh
make install
```

Start Hugo's development server:

```sh
make dev
```

Hugo serves the site at `http://localhost:1313/` by default. Override the port when needed:

```sh
make dev HUGO_PORT=8009
```

## Commands

Run `make` or `make help` to list the supported workflow:

| Command | Purpose |
| --- | --- |
| `make install` | Install dependencies from `package-lock.json`. |
| `make dev` | Start the Hugo development server. |
| `make build` | Generate the minified production site in `public/`. |
| `make check` | Run a strict Hugo build and a Wrangler deployment dry run. |
| `make preview` | Build and serve the site through the local Workers runtime. |
| `make deploy` | Validate and deploy the current build to Cloudflare Workers. |
| `make clean` | Remove generated Hugo output and build state. |

Preview the generated site through the Cloudflare Workers runtime:

```sh
make preview
```

Wrangler serves the preview at `http://localhost:8787/` by default. Set `PREVIEW_PORT` to use another port.

## Content structure

- `content/` contains page copy and front matter.
- `data/events/` contains conference dates, status, and CFP links.
- `data/talks/` contains archive talk metadata.
- `layouts/` contains shared Hugo templates and partials.
- `assets/` contains CSS and JavaScript processed by Hugo.
- `static/` contains images, downloads, headers, and domain files copied into the build.

Update event-wide facts in `data/events/2026.yaml` rather than repeating them across templates.

## Production build

```sh
make build
```

The deployable output is written to `public/`, which is ignored by Git.

## Cloudflare Workers deployment

`wrangler.jsonc` configures an asset-only Worker. No Cloudflare account ID, API token, zone ID, or secret belongs in this repository.

For Cloudflare Workers Builds, connect this GitHub repository and configure:

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npm run deploy:worker`
- Preview deploy command: `npx wrangler versions upload`
- Build variable: `HUGO_VERSION=0.123.7`

Cloudflare stores deployment authorization outside the repository. Use a preview deployment and verify the custom domain before disabling the existing GitHub Pages deployment.

The recommended production workflow is Git-driven:

1. Run `make install` after dependency changes or on a fresh clone.
2. Run `make check` and review the generated site with `make preview`.
3. Review `git status` and `git diff`, then commit the intended source changes.
4. Merge or push the reviewed commit to `main`; Cloudflare Workers Builds performs the deployment.
5. Verify the homepage, CFP, archive, downloads, redirects, and custom domain.

For an authorized manual deployment from the current checkout, run:

```sh
make deploy
```

This command runs the release checks first and then deploys immediately. Wrangler authentication must already be configured outside the repository.

## Publishing checklist

1. Run `make check` and confirm both Hugo and Wrangler succeed.
2. Run `make preview` and review the Workers-hosted local build.
3. Test the homepage, CFP, archive, legacy aliases, PDF download, and 404 page.
4. Check desktop and mobile layouts in light and dark themes.
5. Confirm that `git status` contains only intended source and public asset changes.
6. Confirm that `public/`, `.dev.vars`, `.env`, and `.wrangler/` remain untracked.

## Sensitive information

This repository is public. Never commit Cloudflare credentials, deploy hooks, account identifiers, analytics secrets, form response exports, speaker contact details, or unpublished submissions. Use Cloudflare dashboard secrets or local `.dev.vars` files for any future Worker bindings.
