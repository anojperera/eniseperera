# GROK.md

This is Enise Perera's personal website — a static Next.js (App Router, pure JavaScript, no TypeScript) scrapbook-style site deployed to AWS Amplify. Content is Markdown/MDX with frontmatter. Most media is served from an S3 bucket (eniseperera-media). The pink/cute handmade sticker-journal theme is intentional.

## Current Architecture

- **Framework**: Next.js 15 with `output: 'export'`, `trailingSlash`, unoptimized images.
- **Content pipeline**: `lib/content.js` reads `content/<category>/*.mdx` (projects, swimming, music, hockey), parses with gray-matter + zod validation.
- **UI**: Custom design system in `app/globals.css` (CSS vars, .card, .taped, .polaroid, .tilt-*, .badge, etc.). Fonts via next/font (Fredoka display, Caveat hand, Nunito body).
- **Components**: Shared `PageHeader`, `PostCard`, `PostArticle`, `HeroMedia`, `MobileMenu`. MDX components include `MusicScore` (abcjs), `Gallery`, `Timeline`.
- **Routing**: Thin category list pages + `[slug]` posts. All static.
- **Favicons**: Custom "EP" design (pink gradient + white letters) generated and set across all standard sizes + SVG + manifest.
- **Other**: RSS (`app/feed.xml`), sitemap, automatic from content.

See detailed [CLAUDE.md](./CLAUDE.md) for architecture, content pipeline, design system, and conventions.

## Commands

```bash
npm install
npm run dev      # next dev --turbo
npm run build    # static export -> out/   (Amplify uses this)
npm run lint     # next lint
```

No test suite — the build is the gate (validates all MDX + frontmatter).

## Quick Status

- Astro → Next.js migration complete (see MIGRATION-PLAN.md).
- Major redesign to "scrapbook / sticker-journal" aesthetic (paper texture, washi tape, polaroids, floating doodles, springy animations).
- Multiple rich posts with S3 video/images, playable music scores, galleries.
- Custom EP favicons added.
- Fully responsive + accessible.
- Always passing static builds.

Run `npm run dev`. See README.md, CLAUDE.md, and MIGRATION-PLAN.md for more.