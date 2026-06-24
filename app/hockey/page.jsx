import Link from 'next/link';
import { getPostsByCategory } from '@/lib/content';
import HeroMedia from '@/app/components/HeroMedia';

export const metadata = {
  title: 'Hockey',
};

export default function HockeyPage() {
  const posts = getPostsByCategory('hockey');

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] mb-2">Hockey 🏑</h1>
        <p className="text-[1.05rem] text-[var(--text-muted)] max-w-prose">
          The thrill of the game, great teammates, and growing with every match.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/hockey/${post.slug}`} 
              className="card flex gap-4 sm:gap-6 p-4 sm:p-5 items-center group hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-lg sm:text-xl mb-1 group-hover:text-[var(--pink-700)] transition">
                  {post.frontmatter.title}
                </h3>
                <p className="text-[var(--text-muted)] line-clamp-2">{post.frontmatter.description}</p>
              </div>
              {post.frontmatter.hero && (
                <div className="w-20 h-16 sm:w-28 sm:h-24 flex-shrink-0 overflow-hidden rounded-2xl border border-[var(--border)]">
                  <HeroMedia
                    hero={post.frontmatter.hero}
                    className="w-20 h-16 sm:w-28 sm:h-24 group-hover:scale-105"
                    alt=""
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <div className="text-5xl sm:text-6xl md:text-7xl mb-6">🏑</div>
          <h2 className="text-2xl font-semibold mb-3">Adventures starting soon</h2>
          <p className="max-w-xs mx-auto text-[var(--text-muted)]">
            I love playing hockey. Content and stories will go here as I create them.
            Check back soon!
          </p>
        </div>
      )}

      <div className="mt-12 text-center">
        <Link href="/" className="btn btn-ghost">← Back to home</Link>
      </div>
    </div>
  );
}
