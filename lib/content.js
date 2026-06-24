import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

export const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE ||
  'https://eniseperera-media.s3.eu-west-2.amazonaws.com';

export const PostSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string().optional(),
  hero: z.string().optional(),
  category: z.enum(['projects', 'swimming', 'music', 'hockey']).optional(),
  tags: z.array(z.string()).optional(),
});

const contentDir = path.join(process.cwd(), 'content');

function getAllMdxFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMdxFiles(full));
    } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

export function getPostsByCategory(category) {
  const dir = path.join(contentDir, category);
  if (!fs.existsSync(dir)) return [];

  const files = getAllMdxFiles(dir);

  const posts = files.map((file) => {
    const slug = path.basename(file, path.extname(file));
    const raw = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(raw);

    const frontmatter = PostSchema.parse({
      title: data.title || slug,
      date: data.date || data.pubDate || '2024-01-01',
      description: data.description || '',
      hero: data.hero || data.heroImage || '',
      category: data.category || category,
      tags: data.tags || [],
    });

    return {
      slug: slug.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      frontmatter,
      content,
    };
  });

  // sort newest first
  return posts.sort((a, b) =>
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getPost(category, slug) {
  const dir = path.join(contentDir, category);
  const possible = [path.join(dir, `${slug}.mdx`), path.join(dir, `${slug}.md`)];

  for (const file of possible) {
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, 'utf8');
      const { data, content } = matter(raw);
      const frontmatter = PostSchema.parse({
        title: data.title || slug,
        date: data.date || '2024-01-01',
        description: data.description || '',
        hero: data.hero || data.heroImage || '',
        category: data.category || category,
        tags: data.tags || [],
      });
      return {
        slug,
        frontmatter,
        content,
      };
    }
  }
  return null;
}

export function getAllPosts() {
  return [
    ...getPostsByCategory('projects'),
    ...getPostsByCategory('swimming'),
    ...getPostsByCategory('music'),
    ...getPostsByCategory('hockey'),
  ].sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}
