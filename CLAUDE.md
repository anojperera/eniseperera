# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Enise Perera's personal website — a static blog (Next.js App Router, **pure JavaScript, no TypeScript**) deployed to AWS Amplify. Content is Markdown/MDX with frontmatter; most media is served from an S3 bucket. The pink/cute theme is intentional. This was migrated from an Astro site (archived in `_archive/astro-src/`, gitignored).

## Commands

```bash
npm install
npm run dev      # next dev --turbo
npm run build    # static export -> out/   (Amplify uses this; baseDirectory: out)
npm run lint     # next lint
```

There is no test suite. The build itself is the main correctness gate: `npm run build` must pass (static generation parses every MDX file and validates frontmatter, so a bad post fails the build).

## Architecture

Static export is enforced in `next.config.mjs` (`output: 'export'`, `trailingSlash: true`, `images.unoptimized`). This means **no server runtime** — everything must be statically generatable at build time. Dynamic routes set `export const dynamicParams = false` and provide `generateStaticParams()`.

**Content pipeline** (`lib/content.js`) is the heart of the site:
- Posts live in `content/<category>/*.mdx` where category is one of `projects`, `swimming`, `music`, `hockey`.
- `getPostsByCategory`, `getPost`, `getAllPosts` read files, parse frontmatter with `gray-matter`, and validate against `PostSchema` (zod). Frontmatter: `title`, `date` (used for sorting, newest first), `description`, `hero`, `category`, `tags`. The schema accepts legacy aliases (`pubDate`, `heroImage`).
- Slugs are derived from the filename, lowercased and non-alphanumerics collapsed to `-`.

**Routing** — each category has `app/<category>/page.jsx` (list) and `app/<category>/[slug]/page.jsx` (post). These pages are thin: list pages compose `PageHeader` + a grid of `PostCard`; post pages delegate entirely to `PostArticle` (which renders MDX via `next-mdx-remote/rsc`'s `MDXRemote` with `mdxComponents`). To change the look of every list/post page, edit those shared components, not the per-category files.

**MDX components** (`app/components/mdx-components.jsx`) — the map passed to every post. Native `<img>`/`<video>` are auto-styled, and these custom components are usable directly inside `.mdx`:
- `<MusicScore abc={...} title={...} />` — client component using `abcjs` to render + play notation (see `content/music/*.mdx` for the inline `abc` string format).
- `<Timeline>`, `<Gallery>` — layout helpers.

**Media resolution** — `MEDIA_BASE` (env `NEXT_PUBLIC_MEDIA_BASE`, default the eu-west-2 S3 bucket) is defined in both `lib/content.js` and `lib/site.js`. `HeroMedia` and content resolve a `hero`/media path: absolute URLs (`http`) and root-relative (`/`) paths pass through; everything else is prefixed with `MEDIA_BASE`. `HeroMedia` auto-detects video by extension (`.mov/.mp4/.webm/.m4v`). The S3 hostnames must be allowlisted in `next.config.mjs` `images.remotePatterns`.

**Site config** (`lib/site.js`) — `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_URL`, `NAV_ITEMS`. `SITE_URL` is `https://eniseperera.com` and is used by metadata, sitemap, and the RSS feed; update it here on DNS cutover.

**Generated routes** — `app/feed.xml/route.js` (RSS via `feed`, `force-static`) and `app/sitemap.js`. Both depend on `getAllPosts()`, so new posts appear automatically.

## Adding content

Drop a `.mdx` file in the right `content/<category>/` folder with valid frontmatter (the build validates it). Reference S3 media by relative path in `hero`/`<img>`/`<video>` (recommended) or full URL; local images can live in `public/images/`. Upload large media to the S3 bucket — the local `temp/` folder is for media being staged to S3 and is gitignored.

## Conventions

- Keep it **pure JavaScript** — do not introduce TypeScript (`tsconfig.json`/`next-env.d.ts` are gitignored on purpose).
- `@/*` import alias maps to repo root (`jsconfig.json`).
- **Design system** is a handmade "scrapbook / sticker-journal" theme defined in `app/globals.css`. It is driven by CSS custom properties (`--accent`, `--pink-*`, `--mint`/`--sky`/`--butter`/`--lavender`, `--border`, `--pop`/`--pop-sm` for the chunky sticker shadow) and a set of named classes — reuse these rather than reinventing: `.card` (sticker card), `.taped`/`.tape-mint`/`.tape-butter` (washi-tape strip), `.polaroid` (taped photo frame), `.tilt-l`/`.tilt-r` (playful rotations that straighten on hover), `.btn`/`.btn-primary`/`.btn-ghost`, `.badge` + `.cat-<category>` (per-category pastel colors), `.hand` (handwritten Caveat accents), `.underline-doodle`, and `.reveal` (staggered entrance — set `animationDelay` inline). Decorative paper texture, grain, and floating doodles live in `body::before/::after` and the `.sky` layer in `layout.jsx`.
- **Fonts** are wired with `next/font/google` in `layout.jsx` and exposed as CSS variables: `--font-display` (Fredoka, headings), `--font-hand` (Caveat, accents), `--font-body` (Nunito). Don't add `<link>` font tags; add weights to the `next/font` calls instead.
- All animations respect `prefers-reduced-motion` (globally disabled in `globals.css`).
- The site is mobile-first; nav uses a dedicated client `MobileMenu` component.

## Reference docs

`README.md`, `GROK.md`, and `MIGRATION-PLAN.md` cover the Astro→Next migration history and content/media setup in more detail.
