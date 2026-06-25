import { getPost, getPostsByCategory } from '@/lib/content';
import { notFound } from 'next/navigation';
import PostArticle from '@/app/components/PostArticle';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost('hockey', slug);
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
  const posts = getPostsByCategory('hockey');
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export default async function HockeyPost({ params }) {
  const { slug } = await params;
  const post = getPost('hockey', slug);
  if (!post) notFound();

  return <PostArticle category="hockey" post={post} fallback="Hockey story coming soon." />;
}
