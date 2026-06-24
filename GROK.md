This is an Astro.js static page website hosted in AWS S3 + CloudFront.
Categorized into projects and blog.

## Migration Goals
- Migrate to **Next.js + Tailwind CSS** static site hosted on **AWS Amplify**
- Redesign to look **modern and cute**
- Keep the current **pink theme** (valentine / pastel pink)
- All content in **Markdown + frontmatter**
- All media served from **S3 bucket** (eniseperera-media)
- Reorganize around: **Projects, Swimming, Music, Hockey**

See detailed [MIGRATION-PLAN.md](./MIGRATION-PLAN.md) for full understanding of current repo + phased execution plan + open questions.

## Quick Status
- Migration executed and extended: Next.js + cute pink theme fully live.
- All original categories reorganized + heavy content migration (9+ rich posts with videos & S3 images).
- Music player, Timeline, improved rich text/video rendering.
- Polish on cards/home, README + media docs added, RSS in footer.
- Always passing static builds.

Run `npm run dev`. See README.md and MIGRATION-PLAN.md.
