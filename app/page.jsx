import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { SITE_DESCRIPTION } from '@/lib/site';
import { ArrowRight } from 'lucide-react';
import HeroMedia from '@/app/components/HeroMedia';

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
      {/* Awesome Revamped Hero - dreamy & impactful */}
      <div className="relative text-center pt-6 pb-12 overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,var(--pink-100)_0%,transparent_70%)] -z-10"></div>
        
        <div className="mb-8 relative">
          <div className="mx-auto max-w-[520px] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)] ring-1 ring-[var(--pink-200)]">
            <img
              src="https://eniseperera-media.s3.eu-west-2.amazonaws.com/images/spring.jpeg"
              alt="Beautiful spring flowers inspiring music compositions"
              className="w-full aspect-[16/9] object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
          {/* Subtle badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-[var(--border)] px-4 py-1 rounded-full text-xs font-medium text-[var(--pink-700)] shadow">
            Summer 2025 vibes ✨
          </div>
        </div>

        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-[-0.04em] mb-4 bg-gradient-to-br from-[var(--pink-800)] via-[var(--accent)] to-[var(--lavender)] bg-clip-text text-transparent drop-shadow-sm">
          Hi, I’m Enise!
        </h1>
        
        <p className="text-2xl md:text-[1.75rem] text-[var(--pink-600)] font-semibold mb-5 tracking-tight">
          Hockey Player • Swimmer • Composer • Explorer
        </p>
        
        <p className="max-w-lg mx-auto text-[1.05rem] text-[var(--text-muted)] leading-relaxed">
          {SITE_DESCRIPTION}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="btn btn-primary flex items-center gap-2 text-base shadow-lg hover:shadow-xl"
            >
              {cat.emoji} {cat.label}
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <a href="#latest" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent)] group">
            See latest posts 
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
          </a>
        </div>
      </div>

      {/* Awesome Explore Section */}
      <div className="relative">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold tracking-tight mb-3">Explore My World</h2>
          <p className="text-[var(--text-muted)] max-w-xs mx-auto">Dive into the adventures that make me who I am.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="card p-7 sm:p-8 text-center group flex flex-col items-center justify-center min-h-[180px]"
            >
              <div className="text-5xl mb-5 transition-all group-hover:scale-110 group-hover:-rotate-3 duration-300">{cat.emoji}</div>
              <div className="text-2xl font-semibold tracking-tight mb-2 group-hover:text-[var(--accent)] transition-colors">{cat.label}</div>
              <div className="text-[var(--text-muted)] text-sm group-hover:text-[var(--accent-light)] transition-colors">Discover more →</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest posts - awesome elevated cards */}
      <div id="latest">
        <div className="flex flex-col sm:flex-row items-baseline sm:items-center justify-between mb-8 gap-y-2">
          <h2 className="text-4xl font-bold tracking-tight">Latest Adventures</h2>
          <Link href="/swimming" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-dark)] group">
            Explore all 
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition" />
          </Link>
        </div>

        <div className="space-y-4">
          {latest.length > 0 ? (
            latest.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.frontmatter.category || 'projects'}/${post.slug}`}
                className="card flex flex-col md:flex-row gap-6 p-6 md:p-5 md:items-center group"
              >
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="badge text-[10px]">{post.frontmatter.category}</span>
                    <time className="text-[var(--text-muted)] text-xs tracking-wide">
                      {new Date(post.frontmatter.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </time>
                  </div>
                  <h3 className="text-[1.15rem] font-semibold tracking-tight group-hover:text-[var(--accent)] transition-colors">{post.frontmatter.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm line-clamp-2 leading-snug">
                    {post.frontmatter.description || 'Read more...'}
                  </p>
                </div>
                
                {post.frontmatter.hero && (
                  <div className="w-full md:w-44 h-32 md:h-24 flex-shrink-0 overflow-hidden rounded-2xl border border-[var(--border)] ring-1 ring-inset ring-white/60">
                    <HeroMedia
                      hero={post.frontmatter.hero}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      alt=""
                    />
                  </div>
                )}
              </Link>
            ))
          ) : (
            <div className="card p-10 text-center">
              <p className="text-[var(--text-muted)]">More adventures coming soon. Stay tuned!</p>
            </div>
          )}
        </div>
      </div>

      {/* Awesome closing vibe */}
      <div className="text-center max-w-md mx-auto pt-4 pb-2">
        <p className="text-[var(--text-muted)] leading-relaxed text-base">
          I play hockey for Maidstone, swim with passion, compose music, and chase adventures wherever they lead.
        </p>
        <div className="mt-4 text-xs tracking-[2px] text-[var(--pink-700)] font-medium">WELCOME TO MY WORLD</div>
      </div>
    </div>
  );
}
