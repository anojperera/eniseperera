import { getPost, getPostsByCategory } from '@/lib/content';
import { notFound } from 'next/navigation';
import PostArticle from '@/app/components/PostArticle';

export async function generateStaticParams() {
  const posts = getPostsByCategory('swimming');
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export default async function SwimmingPost({ params }) {
  const { slug } = await params;
  const post = getPost('swimming', slug);
  if (!post) notFound();

  return <PostArticle category="swimming" post={post} fallback="Swim story coming soon." />;
}
