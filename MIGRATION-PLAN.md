# Enise Perera Website: Astro → Next.js Migration & Redesign Execution Plan

**Date:** 2026-06-24  
**Current Stack:** Astro v1 + Tailwind + DaisyUI (valentine pink theme) + MDX (limited)  
**Target Stack:** Next.js (App Router) + Tailwind CSS + MDX + static export  
**Target Hosting:** AWS Amplify (static)  
**Theme:** Keep cute pink ("valentine" inspired pastel pinks) + modern cute redesign

---

## Repository Understanding

### What exists today
- Personal static site for Enise Perera (child/young teen).
- Main sections: Home, Projects (Music + School + Photography), Blog (10 posts), Store (demo only).
- Strong themes: **Swimming** (Maidstone SC galas, time trials, medals, lots of video), **Music** (original compositions with ABC notation + playable scores), travel & life (France, Sri Lanka, ballet/circus show), crafts.
- Content lives mostly in Markdown/MDX frontmatter + bodies. Some projects are .astro files with exported props (not ideal).
- Rich media:
  - Local stock/user photos in `public/images/`
  - Heavy use of existing S3 bucket `https://eniseperera-media.s3.eu-west-2.amazonaws.com/` (folders: apr-24, mar-24, may-24, feb-24, sep-23, images/, oct-2025)
- Custom components:
  - Music renderer using abcjs (visual score + audio)
  - Timeline "Journey" blocks (used in music projects)
  - DaisyUI carousel for photo sets
  - Video embeds via video.js (many .MOV/.mp4)
- Navigation: sticky mobile header + drawer sidebar (Home / Projects / Blog) + RSS
- Current theme: `data-theme="valentine"` (DaisyUI cute pink/pastel)
- Deploy: AWS Amplify (current)
- Extras: RSS, basic sitemap, SEO meta

### Content inventory (high level)
**Blog (10 posts, newest first):**
- "Sprint to Spring Swimming Gala" (May 2024) — medals + 6 videos
- "Our Holiday in Sri Lanka" (Apr 2024) — long photo essay + carousel
- "Time Trial - Butterfly and Backstroke..." (Apr 2024) — 2 videos
- "Medway ASA Championships 2024" (Apr 2024) — gold medal + videos + photo
- "Kent Junior League Round 1" (Mar 2024) — 5 videos
- "My Trip to Alegria - Royal Albert Hall" (Feb 2024) — Cirque + food photos
- "Time Trial Winter 2024" (Feb 2024) — PB in 50m + videos
- "My Bracelets" (2022) — loom bands craft + S3 jewelry photos
- "End of Summer Swim Gala" (2022) — 5 videos
- "Trip to France" (2022) — frontmatter only

**Music Projects (3):**
- Spring Music, Autumn, Snowflake Music
- Each has ABC notation, "Journey" timeline (Thought/Rhythm/Action), some generic placeholder copy
- Rendered with abcjs

**Other Projects:**
- Photography: stub "Nature"
- School: "History Project" (Coca-Cola factory poster from S3)

**Store:** Pure lorem-ipsum demo from template. Safe to remove.

**Bio/Interests (from config):** Music, photography, judo, hockey, swimming, ballet. Inspired by Ninja Kids.

### Gaps / opportunities from GROK.md
- No Hockey content yet
- Projects and Blog overlap thematically (swimming posts are "blog")
- Astro files mixed with content (music projects use .astro + JS props)
- Some posts have very short or empty bodies
- Media partially on S3 already (good foundation)

---

## Requirements from Action List (GROK.md)

1. Migrate to **Next.js + Tailwind** (static site)
2. Host on **AWS Amplify**
3. **Redesign** whole interface → modern + **cute**
4. **Keep current pink theme**
5. **All content** in Markdown + frontmatter for metadata
6. **All media** served from S3 bucket
7. Handle checked-in media (minimize large binaries in git, prefer S3 references)
8. Reorganize content around:
   - Projects
   - Swimming
   - Music
   - Hockey

Other implicit: preserve all real writing + media, keep site personal voice, support rich embeds (scores, videos, galleries, timelines), maintain RSS/SEO.

---

## Key Architectural Decisions (to be validated)

- **Next.js App Router** (modern, best DX for static + metadata)
- **Static export** (`output: 'export'`) → simple, cheap on Amplify, fits current model
- **MDX** for all content (`.mdx` files) so we can embed React components (MusicScore, Timeline, Video, Gallery) directly in posts
- **Content collections** via build-time loader (no CMS). `lib/content.ts` + gray-matter / zod for frontmatter typing + MDX compile
- **Dedicated category sections** under new routes:
  - `/` Home (greeting + featured across categories)
  - `/projects` (school, photography, general)
  - `/swimming` (aggregate + list swim-related posts + highlights)
  - `/music` (composition list + detail pages with abcjs)
  - `/hockey` (new section, placeholder + call for content)
  - `/blog` (general / other posts, or optional if everything categorized)
- **S3 media strategy**:
  - Keep existing S3 URLs
  - `NEXT_PUBLIC_MEDIA_BASE=https://eniseperera-media.s3.eu-west-2.amazonaws.com`
  - Local assets in `public/` only for tiny favicons/logos or during dev; production prefers S3
  - Document upload process for new photos/videos
- **Theme**:
  - Define cute pink design tokens in Tailwind (inspired by Daisy valentine: soft pinks, blush, lavender accents, cream backgrounds)
  - Rounded-2xl/3xl, soft shadows, playful scale hovers
  - Typography: friendly sans (system or Inter + nice display)
  - Optionally keep DaisyUI for speed or go pure Tailwind + small component lib
- **Interactive pieces**:
  - Port abcjs Music component as client component
  - Native `<video>` (no heavy video.js)
  - Simple gallery (or lightweight lib)
  - Timeline as nice vertical component
- **Navigation**:
  - Clean top nav (desktop) + mobile hamburger
  - Or cute sidebar retained if desired
  - Active states, nice icons (lucide-react)
- **SEO/RSS**:
  - Next Metadata API
  - `next-sitemap` or generate in build
  - RSS via `feed` package or route handler
- **Amplify**:
  - `amplify.yml` (or console settings) for build + publish `out/`
  - Update domain if needed

**Dropped / deprioritized:**
- Store section (demo only, not mentioned in requirements)
- Old Astro-specific (buildspec can be archived or replaced)

---

## Content Reorganization Mapping

| Current              | New Location                  | Notes |
|----------------------|-------------------------------|-------|
| Blog posts (swim)    | `content/swimming/*.mdx`     | Tag or folder based |
| Blog posts (travel, craft) | `content/blog/*.mdx` or `content/travel/*.mdx` | Or tag `category` |
| Music projects       | `content/music/*.mdx`        | Embed ABC + journey |
| Photography / School | `content/projects/*.mdx`     | |
| Hockey               | `content/hockey/` + page     | New/empty initially |
| General home copy    | `content/home.mdx` or constants | |

Frontmatter standard (example):
```mdx
---
title: "Sprint to Spring Swimming Gala"
date: "2024-05-19"
description: "Swimming Gala at Sevenoaks"
hero: "may-24/IMG_0595.png"   # relative to S3 base or full
category: swimming
tags: [gala, medals, freestyle]
---
```

In MDX body support:
- `<Music notes="..." />`
- `<Timeline items=[...]} />` or MD sections
- Native images/videos pointing to S3
- Custom `<Gallery images={["..."]} />`

---

## Redesign Vision: Modern + Cute + Pink

- **Hero/Home**: Big friendly "Hi, I'm Enise ✨", cute tagline ("Swimmer • Composer • Explorer"), short bio, quick nav cards to 4 categories + recent highlights.
- **Cards**: Soft pastel pink borders/accents, rounded-3xl, photo on left or top, hover lift + scale.
- **Typography**: Clear hierarchy, slightly larger for kid-friendly reading.
- **Details pages**: Generous whitespace, prose styling that feels journal-like but polished.
- **Music pages**: Score front-and-center, nice controls, journey timeline below or side.
- **Swimming pages**: Medal highlights, video lists grouped by event, PB callouts.
- **Accents**: Sparkles ✨, hearts, subtle confetti or just cute badges.
- **Performance**: Fast images (unoptimized first, add later), no heavy libs.
- **Consistency**: Same header/footer/nav everywhere.

Keep the warm personal tone — redesign is visual + structural, not rewrite text.

---

## Execution Phases (Recommended Order)

### Phase 0 — Prep & Repo Setup (1 PR)
- Read/confirm this plan with user
- Create `content/` skeleton + `lib/content.ts` types
- Update `.gitignore` if needed (no dist, .next, out)
- Add `NEXT_PUBLIC_MEDIA_BASE` example to `.env.example`
- Remove or archive old Astro build artifacts from git consideration (dist is already generated)
- Install initial deps later per phase

**Deliverable:** Clean repo ready for Next, MIGRATION-PLAN.md committed.

### Phase 1 — Next.js Scaffold + Theme Foundation (1-2 PRs)
- Run/create Next.js 15 App Router in place (or carefully replace)
- `next.config.mjs` with `output: 'export'`, images remotePatterns for S3 + localhost
- Tailwind setup + cute pink theme (CSS vars or @theme)
- Global layout + BaseLayout equivalent
- Header + Footer + Nav (mobile + desktop)
- Basic Home page (static)
- Copy favicons, social images, public assets
- Add lucide-react, clsx, etc. small utils

**Goal:** `npm run dev` shows pink cute skeleton site.

### Phase 2 — Content Loading & MDX Pipeline (1 PR)
- Choose & implement MDX strategy:
  - Option A (recommended for embeds): `next-mdx-remote/rsc` + compileMDX per post
  - Option B: file-based MDX in `app/...` + separate metadata JSON/MDX frontmatter loader
- Frontmatter schema + validation (zod)
- Helper: `getAllPosts(category?)`, `getPost(slug)`
- Port 2-3 example posts to validate pipeline
- Support custom MDX components map (Music, Gallery, etc.)

**Deliverable:** Can render Markdown posts with frontmatter.

### Phase 3 — Core Pages + Lists (2 PRs)
- Home page: greeting, latest from each category, featured music/swim
- `/blog` or `/posts`: full list + pagination or "load more" (simple, since static can be all or chunked)
- Post detail page with MDX body
- `/projects`: list + detail (photography, school, general)
- Update navigation

**Goal:** All existing blog + project text visible.

### Phase 4 — Category Re-org + New Sections (2 PRs)
- `/swimming` landing + filtered list of swim posts + highlights (medals, PBs)
- `/music` landing + the 3 composition details (with ABC)
- `/hockey` landing (new, cute placeholder + "coming soon" or interests blurb)
- Move/re-tag content accordingly
- Update home to promote new structure

### Phase 5 — Rich Embeds & Interactivity (1-2 PRs)
- Port Music component: abcjs + React (useEffect or client component)
  - Need to `npm i abcjs`
  - Handle both visual + synth audio
- Timeline component (cute vertical with pink dots/lines)
- Gallery: simple or use framer-motion lightbox
- Video: native HTML5, nice wrapper with captions from post
- Test with real content (Sri Lanka post, music scores, galas)

**Important:** abcjs CSS + audio styles ported.

### Phase 6 — Full Visual Redesign & Polish (2 PRs)
- Apply modern cute styling everywhere:
  - Consistent spacing, typography scale
  - Pink palette + neutrals (warm off-white bg)
  - Card, button, badge, link styles
  - Hover/focus states, subtle transitions
- Responsive audit (especially lists + media)
- Accessibility (alt text review, aria, keyboard)
- Empty states / loading for lists
- Optional: small confetti or emoji flourishes

### Phase 7 — SEO, RSS, Sitemap, Metadata (1 PR)
- Dynamic metadata per page/post
- Open Graph images (can use static or later OG route)
- RSS feed route (`/rss.xml` or `/feed.xml`)
- Generate sitemap
- Robots.txt
- Update `config.ts` equivalent → `lib/site.ts`

### Phase 8 — Hosting & Deployment (1 PR)
- Create `amplify.yml` (or `amplify/backend` if using)
- Update `package.json` scripts:
  - `dev`
  - `build` (next build)
  - `start` (for preview)
- Update or replace buildspec.yaml
- Document Amplify setup steps (connect repo, framework: Next.js, or custom static)
- Add `.env` handling note for Amplify
- Verify `out/` contains everything + assets

### Phase 9 — Media Cleanup & Documentation (1 PR)
- Document S3 bucket usage + CORS if needed (public read already works)
- Move or note which local images should be uploaded to S3 (`public/images/*`)
- Add script or README section: "Adding new photos"
- Ensure no large binaries accidentally committed going forward
- Update any hard-coded local paths to S3 or configurable

### Phase 10 — Verification, Content QA, Cutover (1 PR + manual)
- Full content audit: compare old vs new for every post/project
- Test all videos, images, music players
- Lighthouse / perf quick check
- User review (you)
- Update domain DNS in Route53 to point to Amplify (A alias for apex, CNAME for www)
- Announce or redirect strategy if needed
- Archive old Astro code? (keep in git history)

---

## PR Plan (Suggested Stacked / Sequential)

1. **Repo Prep + Plan** — this doc + folder skeleton
2. **Next.js + Theme Bootstrap** — running cute site
3. **MDX Content System** — typed posts,  sample renders
4. **Home + Blog Basics** — list + detail
5. **Projects + Music Pages** — with music renderer
6. **Swimming + Hockey Sections** — reorg complete
7. **Rich Media Components** — videos/galleries/timeline
8. **Visual Polish Pass** — full cute redesign
9. **SEO + RSS + Sitemap**
10. **Amplify Hosting + Media Docs**
11. **Final QA + Content Parity**

Each PR should be independently testable where possible. Use feature branches.

---

## Dependencies to Add (target)

- next (latest)
- react, react-dom
- tailwindcss, postcss, autoprefixer (via create)
- gray-matter or similar
- next-mdx-remote (or @mdx-js)
- zod (frontmatter validation)
- abcjs (music)
- lucide-react (icons)
- date-fns or dayjs (dates)
- Optional: framer-motion (for cute interactions), swr or none (static)

Remove: astro ecosystem, daisyui (unless kept), video.js (use native)

---

## Risks & Mitigations

- **abcjs integration** in Next: client-only, dynamic import or useEffect. Test audio early.
- **Large video files**: streaming from S3 is fine; don't bundle.
- **Static export limitations**: no server actions, API routes limited (use client or pregen). RSS can be static file.
- **Image optimization**: with `output:export` limited; can still use unoptimized or external loader. Or host images in Amplify too.
- **Content drift**: copy content exactly first, then minor grammar fixes only with approval.
- **Hockey content**: zero today — provide nice empty state + encourage future posts.

---

## User Decisions (2026-06-24)

Confirmed via questions:
- **Categorization**: Fully into the 4 sections only. No top-level /blog catch-all. Every post will live under Projects / Swimming / Music / Hockey.
- **Store**: Remove completely.
- **Music Journey text**: Rewrite with better, specific content for each piece (not generic placeholder).
- **Hero photo**: Use one of the existing images for now (we'll pick a cute one from current assets or S3).
- **Proceed**: Yes — follow the detailed plan (Next.js App Router, static export, MDX, port embeds, cute pink redesign).

Remaining open (will resolve during implementation):
- Preferred exact MDX implementation details (I'll recommend a clean approach).
- Must-keep visual elements (avatar EBP?, exact nav style)?
- New pages beyond the four (About/Contact)?
- (Historical) Domain cutover from previous hosting completed.

---

## Success Criteria

- All 10 blog posts + 3 music + other projects render with original media and text.
- Music scores playable.
- Videos play from S3.
- Site looks modern + cute with prominent pink theme.
- Navigation reflects Projects / Swimming / Music / Hockey.
- `next build` succeeds with static output.
- Deployable to Amplify with one click / git push.
- All content sourced from `.mdx` + frontmatter.
- Media references are S3 based (or documented).

---

## Current Execution Status (updated after continuation)

**All core phases completed + extra work:**
- ✅ Scaffold, redesign, categories, content system, renderer
- ✅ Music player + Timeline integrated
- ✅ 9+ posts migrated with rich media (videos + dozens of S3 images):
  - 6 swimming posts (galas, time trials with multiple videos each)
  - 3 music (ABC scores + rewritten personal journeys)
  - 5 projects (Sri Lanka expanded with ~12 photos + captions, Alegria, bracelets, history, France)
- ✅ Heavy UI polish: card interactions, image scaling, consistent cute styling on home + all lists
- ✅ PostBody now renders raw videos, markdown images, raw <img>, code blocks, basic formatting nicely
- ✅ RSS in footer, full README with media guide & instructions
- ✅ Multiple verified builds (currently ~23 static pages)

**Nice-to-haves implemented:**
- ✅ Full upgrade to `next-mdx-remote/rsc` — components like `<MusicScore>`, `<Timeline>`, `<Gallery>` can now be embedded directly in `.mdx` files
- ✅ Reusable `<Gallery>` with cute lightbox for big albums (used in Sri Lanka post)
- ✅ Hockey section expanded with dynamic support and a sample post with Timeline
- ✅ Accessibility & alt-text pass (improved alts on heroes, aria on gallery/lightbox, better labels)
- Sitemap added, more polish

Domain cutover is ready in config (update `lib/site.ts` + Amplify when moving DNS).

**Run it**
```bash
npm install
npm run dev
# Music player demo: /music/spring-music
```

Build → `out/` for Amplify (see `amplify.yml` and README).

Old Astro code lives in `_archive/`.

Site is in great shape — modern, cute, pink, and content-rich! 🎀✨

