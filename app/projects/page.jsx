import Link from 'next/link';
import { getPostsByCategory } from '@/lib/content';
import HeroMedia from '@/app/components/HeroMedia';

export const metadata = {
  title: 'Projects',
};

export default function ProjectsPage() {
  const posts = getPostsByCategory('projects');

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">Projects 📁</h1>
        <p className="text-xl text-[var(--text-muted)]">
          School work, photography, and other creative things I’ve made.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-[var(--text-muted)]">No project posts yet. We’re migrating the old content now!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              href={`/projects/${post.slug}`}
              key={post.slug}
              className="card flex gap-4 sm:gap-6 p-4 sm:p-5 items-center group hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              {post.frontmatter.hero && (
                <div className="w-20 h-16 sm:w-28 sm:h-24 flex-shrink-0 overflow-hidden rounded-2xl border border-[var(--border)]">
                  <HeroMedia
                    hero={post.frontmatter.hero}
                    className="w-20 h-16 sm:w-28 sm:h-24 group-hover:scale-105"
                    alt=""
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg sm:text-xl mb-1 group-hover:text-[var(--pink-700)] transition">
                  {post.frontmatter.title}
                </h3>
                <p className="text-[var(--text-muted)] line-clamp-2">{post.frontmatter.description}</p>
                <time className="text-xs mt-1 block text-[var(--text-muted)]">
                  {new Date(post.frontmatter.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </time>
              </div>
              <div className="text-[var(--accent)] opacity-60 group-hover:opacity-100">→</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
