import { getAllPosts } from '@/lib/content';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default async function sitemap() {
  const posts = getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `${SITE_URL}/${post.frontmatter.category}/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
  }));

  const staticUrls = [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/projects`, lastModified: new Date() },
    { url: `${SITE_URL}/swimming`, lastModified: new Date() },
    { url: `${SITE_URL}/music`, lastModified: new Date() },
    { url: `${SITE_URL}/hockey`, lastModified: new Date() },
  ];

  return [...staticUrls, ...postUrls];
}
