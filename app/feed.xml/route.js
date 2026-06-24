import { getAllPosts } from '@/lib/content';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from '@/lib/site';
import { Feed } from 'feed';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: 'en',
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Enise Perera`,
    author: {
      name: 'Enise Perera',
      link: SITE_URL,
    },
  });

  posts.forEach((post) => {
    const url = `${SITE_URL}/${post.frontmatter.category}/${post.slug}`;
    feed.addItem({
      title: post.frontmatter.title,
      id: url,
      link: url,
      description: post.frontmatter.description,
      date: new Date(post.frontmatter.date),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
