import { getPost, getPostsByCategory } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/app/components/mdx-components';
import HeroMedia from '@/app/components/HeroMedia';

export async function generateStaticParams() {
  const posts = getPostsByCategory('swimming');
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export default async function SwimmingPost({ params }) {
  const { slug } = await params;
  const post = getPost('swimming', slug);

  if (!post) notFound();

  const { frontmatter, content } = post;

  return (
    <article className="max-w-3xl mx-auto">
      <Link href="/swimming" className="inline-flex items-center gap-1 text-sm mb-6 text-[var(--text-muted)] hover:text-[var(--accent)]">
        <ArrowLeft size={16} /> Back to Swimming
      </Link>

      <div className="mb-9">
        <div className="inline-block badge mb-4 text-xs tracking-wider">{frontmatter.category || 'swimming'}</div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.025em] mb-3 leading-none">{frontmatter.title}</h1>
        {frontmatter.description && <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-prose">{frontmatter.description}</p>}
        <time className="inline-block mt-3 px-3 py-px bg-[var(--pink-100)] text-xs text-[var(--pink-700)] rounded-full tracking-wide">
          {new Date(frontmatter.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </time>
      </div>

      {frontmatter.hero && (
        <HeroMedia
          hero={frontmatter.hero}
          className="rounded-3xl mb-10 w-full max-h-[420px] object-cover border border-[var(--border)]"
          alt={frontmatter.title}
        />
      )}

      <div className="prose text-lg leading-relaxed">
        <MDXRemote 
          source={content || 'Content will appear here after we migrate the Markdown posts.'} 
          components={mdxComponents} 
        />
      </div>

      <div className="mt-12 pt-8 border-t">
        <Link href="/swimming" className="btn btn-ghost">← All swimming posts</Link>
      </div>
    </article>
  );
}
