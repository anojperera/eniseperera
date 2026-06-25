import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/app/components/mdx-components';
import HeroMedia from '@/app/components/HeroMedia';

const LABELS = {
  projects: 'Projects',
  swimming: 'Swimming',
  music: 'Music',
  hockey: 'Hockey',
};

export default function PostArticle({ category, post, fallback = 'Story coming soon.' }) {
  const { frontmatter, content } = post;
  const cat = frontmatter.category || category;
  const label = LABELS[category] || 'Home';

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        href={`/${category}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold mb-7 px-4 py-2 rounded-full bg-white border-2 border-[var(--border)] text-[var(--pink-700)] shadow-[var(--pop-sm)] hover:-translate-y-0.5 transition-transform"
      >
        <ArrowLeft size={15} /> back to {label.toLowerCase()}
      </Link>

      <header className="mb-9 reveal">
        <div className="flex items-center gap-3 mb-4">
          <span className={`badge cat-${category}`}>{cat}</span>
          <span className="hand text-xl text-[var(--pink-400)]">
            {new Date(frontmatter.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl leading-[0.98] mb-4">{frontmatter.title}</h1>
        {frontmatter.description && (
          <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-prose leading-snug">
            {frontmatter.description}
          </p>
        )}
      </header>

      {frontmatter.hero && (
        <div className="polaroid tilt-l mb-12 reveal" style={{ animationDelay: '0.1s' }}>
          <HeroMedia
            hero={frontmatter.hero}
            className="w-full max-h-[440px] object-cover"
            alt={frontmatter.title}
          />
        </div>
      )}

      <div className="prose">
        <MDXRemote source={content || fallback} components={mdxComponents} />
      </div>

      <div className="mt-14 pt-8 border-t-2 border-dashed border-[var(--border)] text-center">
        <Link href={`/${category}`} className="btn btn-ghost">← all {label.toLowerCase()}</Link>
      </div>
    </article>
  );
}
