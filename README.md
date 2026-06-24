# Enise Perera — Personal Website

Modern cute pink personal site built with Next.js (JavaScript, static export) for AWS Amplify.

> Converted from TypeScript to pure JavaScript as requested. No TypeScript.

## Features
- Organized into **Projects**, **Swimming**, **Music**, **Hockey**
- Markdown/MDX content with frontmatter
- Playable music scores (abcjs)
- Videos and photos served from S3
- RSS feed
- Fully static — easy & cheap hosting

## Development

```bash
npm install
npm run dev
```

Build for production / Amplify:

```bash
npm run build
# outputs to `out/`
```

## Content

All posts live in `content/`:

- `content/swimming/*.mdx`
- `content/music/*.mdx`
- `content/projects/*.mdx`
- `content/hockey/*.mdx`

Frontmatter example:

```mdx
---
title: "My Cool Post"
date: "2024-05-01"
description: "Short summary"
hero: "folder/image.jpg"   # relative to S3 or full URL
category: swimming
tags: ["gala"]
---
```

Use normal Markdown + raw `<video>` and `<img>` tags for media. The site renderer will style them cutely.

## Media (S3)

Most photos and videos are hosted on:

```
https://eniseperera-media.s3.eu-west-2.amazonaws.com/
```

- Set `NEXT_PUBLIC_MEDIA_BASE` (see `.env.example`)
- Local images in `public/images/` also work

When adding new media, upload to the S3 bucket and reference the path in your `.mdx` (recommended) or use full URLs.

## Deploy to AWS Amplify

1. Connect your GitHub repo to Amplify
2. Amplify will detect `amplify.yml`
3. Build output directory: `out`
4. The site is fully static.

## Old Astro site

The original Astro version is archived in `_archive/astro-src/`.

## License / Credits

Personal site for Enise Perera. Original template inspiration from Astro modern personal website.
