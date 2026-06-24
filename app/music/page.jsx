import Link from 'next/link';
import { getPostsByCategory, MEDIA_BASE } from '@/lib/content';

export const metadata = {
  title: 'Music',
};

export default function MusicPage() {
  const posts = getPostsByCategory('music');

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-5xl font-bold tracking-tight mb-3">Music 🎵</h1>
        <p className="text-xl text-[var(--text-muted)]">
          Original compositions, scores, and the stories behind them.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="card p-10 text-center space-y-4">
          <p className="text-[var(--text-muted)]">The three music projects (Spring, Autumn, Snowflake) are next on the migration list.</p>
          <p className="text-sm">They will include playable ABC notation scores just like before!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              href={`/music/${post.slug}`}
              key={post.slug}
              className="card p-6 group hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              {post.frontmatter.hero && (
                <div className="overflow-hidden rounded-2xl mb-4 border border-[var(--border)]">
                  <img
                    src={post.frontmatter.hero.startsWith('http') ? post.frontmatter.hero : `${MEDIA_BASE}/${post.frontmatter.hero}`}
                    alt=""
                    className="rounded-2xl mb-4 h-40 object-cover w-full group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <h3 className="font-semibold text-2xl mb-2 group-hover:text-[var(--pink-700)] transition">
                {post.frontmatter.title}
              </h3>
              <p className="text-[var(--text-muted)]">{post.frontmatter.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
