import { getPost, getPostsByCategory } from '@/lib/content';
import { notFound } from 'next/navigation';
import PostArticle from '@/app/components/PostArticle';

export async function generateStaticParams() {
  const posts = getPostsByCategory('projects');
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export default async function ProjectPost({ params }) {
  const { slug } = await params;
  const post = getPost('projects', slug);
  if (!post) notFound();

  return <PostArticle category="projects" post={post} fallback="Full content coming soon." />;
}
