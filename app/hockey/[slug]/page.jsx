import { getPost, getPostsByCategory, MEDIA_BASE } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/app/components/mdx-components';

export async function generateStaticParams() {
  const posts = getPostsByCategory('hockey');
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export default async function HockeyPost({ params }) {
  const { slug } = await params;
  const post = getPost('hockey', slug);

  if (!post) notFound();

  const { frontmatter, content } = post;

  return (
    <article className="max-w-3xl mx-auto">
      <Link href="/hockey" className="inline-flex items-center gap-1 text-sm mb-6 text-[var(--text-muted)] hover:text-[var(--accent)]">
        <ArrowLeft size={16} /> Back to Hockey
      </Link>

      <div className="mb-8">
        <div className="badge mb-3">hockey</div>
        <h1 className="text-5xl font-bold tracking-tight mb-3">{frontmatter.title}</h1>
        {frontmatter.description && <p className="text-xl text-[var(--text-muted)]">{frontmatter.description}</p>}
        <time className="text-sm mt-2 block text-[var(--text-muted)]">
          {new Date(frontmatter.date).toLocaleDateString()}
        </time>
      </div>

      {frontmatter.hero && (
        <img
          src={frontmatter.hero.startsWith('http') ? frontmatter.hero : `${MEDIA_BASE}/${frontmatter.hero}`}
          alt={frontmatter.title}
          className="rounded-3xl mb-10 w-full max-h-[420px] object-cover border border-[var(--border)]"
        />
      )}

      <div className="prose text-lg leading-relaxed">
        <MDXRemote 
          source={content || 'Hockey story coming soon.'} 
          components={mdxComponents} 
        />
      </div>

      <div className="mt-12 pt-8 border-t">
        <Link href="/hockey" className="btn btn-ghost">← All hockey</Link>
      </div>
    </article>
  );
}
