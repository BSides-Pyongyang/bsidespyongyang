# BSides Pyongyang

Public source for [bsidespyongyang.com](https://bsidespyongyang.com/), a virtual security conference focused on cybersecurity research connected to the DPRK.

The site is generated with Hugo and deployed as static assets on Cloudflare Workers. Generated files are not committed.

## Requirements

- Hugo Extended 0.123.7 or newer
- Node.js 22 or newer
- npm

## Local development

Install the pinned Cloudflare CLI dependency:

```sh
npm ci
```

Start Hugo's development server:

```sh
npm run dev
```

Hugo serves the site at `http://localhost:1313/` by default.

To test the generated site through the Cloudflare Workers runtime:

```sh
npm run preview
```

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
npm run build
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

## Publishing checklist

1. Run `npm ci` and `npm run build`.
2. Review `hugo --panicOnWarning` output.
3. Test the homepage, CFP, archive, legacy aliases, PDF download, and 404 page.
4. Check desktop and mobile layouts in light and dark themes.
5. Confirm that `git status` does not include `public/`, `.dev.vars`, `.env`, or `.wrangler/`.

## Sensitive information

This repository is public. Never commit Cloudflare credentials, deploy hooks, account identifiers, analytics secrets, form response exports, speaker contact details, or unpublished submissions. Use Cloudflare dashboard secrets or local `.dev.vars` files for any future Worker bindings.
