import Link from 'next/link';
import { getPostsByCategory, MEDIA_BASE } from '@/lib/content';

export const metadata = {
  title: 'Hockey',
};

export default function HockeyPage() {
  const posts = getPostsByCategory('hockey');

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-5xl font-bold tracking-tight mb-3">Hockey 🏑</h1>
        <p className="text-xl text-[var(--text-muted)] max-w-prose">
          Team sports are the best! I love playing hockey with my friends. 
          More stories, photos and adventures coming soon.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/hockey/${post.slug}`} 
              className="card flex gap-6 p-5 items-center group hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-xl mb-1 group-hover:text-[var(--pink-700)] transition">
                  {post.frontmatter.title}
                </h3>
                <p className="text-[var(--text-muted)] line-clamp-2">{post.frontmatter.description}</p>
              </div>
              {post.frontmatter.hero && (
                <div className="w-28 h-24 flex-shrink-0 overflow-hidden rounded-2xl border border-[var(--border)]">
                  <img 
                    src={post.frontmatter.hero.startsWith('http') ? post.frontmatter.hero : `${MEDIA_BASE}/${post.frontmatter.hero}`} 
                    alt="" 
                    className="w-28 h-24 object-cover rounded-2xl group-hover:scale-105 transition-transform" 
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <div className="text-7xl mb-6">🏑</div>
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
