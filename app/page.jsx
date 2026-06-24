import Link from 'next/link';
import { getAllPosts, MEDIA_BASE } from '@/lib/content';
import { SITE_DESCRIPTION } from '@/lib/site';
import { ArrowRight } from 'lucide-react';

const categories = [
  { href: '/projects', label: 'Projects', emoji: '📁' },
  { href: '/swimming', label: 'Swimming', emoji: '🏊‍♀️' },
  { href: '/music', label: 'Music', emoji: '🎵' },
  { href: '/hockey', label: 'Hockey', emoji: '🏑' },
];

export default function Home() {
  const allPosts = getAllPosts();
  const latest = allPosts.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Cute Hero */}
      <div className="text-center pt-4 pb-8">
        <div className="mb-6">
          <img
            src="/images/spring.jpeg"
            alt="Beautiful spring flowers inspiring music compositions"
            className="mx-auto rounded-3xl shadow w-full max-w-[420px] aspect-[16/9] object-cover border border-[var(--border)]"
          />
        </div>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-3 text-[var(--pink-800)]">
          Hi, I’m Enise!
        </h1>
        <p className="text-2xl md:text-3xl text-[var(--pink-600)] font-medium mb-4">
          Swimmer • Composer • Explorer
        </p>
        <p className="max-w-md mx-auto text-lg text-[var(--text-muted)]">
          {SITE_DESCRIPTION}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="btn btn-primary flex items-center gap-2"
            >
              {cat.emoji} {cat.label}
            </Link>
          ))}
        </div>

        <div className="mt-4">
          <a href="#latest" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] inline-flex items-center gap-1">
            See latest posts <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Quick category cards */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Explore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="card p-8 text-center group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">{cat.emoji}</div>
              <div className="text-2xl font-semibold mb-1">{cat.label}</div>
              <div className="text-[var(--text-muted)] text-sm">Discover more →</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest posts */}
      <div id="latest">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-3xl font-bold">Latest from my world</h2>
          <Link href="/swimming" className="text-sm text-[var(--accent)] hover:underline flex items-center gap-1">
            See all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="space-y-4">
          {latest.length > 0 ? (
            latest.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.frontmatter.category || 'projects'}/${post.slug}`}
                className="card flex flex-col md:flex-row gap-5 p-5 md:items-center hover:shadow-xl hover:-translate-y-px transition-all group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="badge">{post.frontmatter.category}</span>
                    <time className="text-xs text-[var(--text-muted)]">
                      {new Date(post.frontmatter.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </time>
                  </div>
                  <h3 className="text-xl font-semibold mb-1.5 group-hover:text-[var(--pink-700)] transition">{post.frontmatter.title}</h3>
                  <p className="text-[var(--text-muted)] line-clamp-2 text-sm">
                    {post.frontmatter.description || 'Read more...'}
                  </p>
                </div>
                {post.frontmatter.hero && (
                  <div className="w-full md:w-36 h-24 md:h-24 flex-shrink-0 overflow-hidden rounded-2xl border border-[var(--border)]">
                    <img
                      src={post.frontmatter.hero.startsWith('http') ? post.frontmatter.hero : `${MEDIA_BASE}/${post.frontmatter.hero}`}
                      alt=""
                      className="rounded-2xl object-cover w-full h-full group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
              </Link>
            ))
          ) : (
            <p className="text-center py-12 text-[var(--text-muted)]">Content coming soon. Check back after we migrate the posts!</p>
          )}
        </div>
      </div>

      {/* Short bio footer tease */}
      <div className="text-center text-[var(--text-muted)] max-w-sm mx-auto text-sm">
        I swim with Maidstone Swimming Club, write music, and love adventures.
        Welcome to my little corner of the internet 💗
      </div>
    </div>
  );
}
