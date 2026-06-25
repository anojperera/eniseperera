import { getPost, getPostsByCategory } from '@/lib/content';
import { notFound } from 'next/navigation';
import PostArticle from '@/app/components/PostArticle';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost('music', slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

export async function generateStaticParams() {
  const posts = getPostsByCategory('music');
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export default async function MusicPost({ params }) {
  const { slug } = await params;
  const post = getPost('music', slug);
  if (!post) notFound();

  return <PostArticle category="music" post={post} fallback="Music post + playable score coming soon." />;
}
