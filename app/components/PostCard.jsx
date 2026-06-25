import Link from 'next/link';
import HeroMedia from '@/app/components/HeroMedia';

export default function PostCard({ post, category, index = 0 }) {
  const cat = category || post.frontmatter.category || 'projects';
  const tags = (post.frontmatter.tags || []).slice(0, 3);

  return (
    <Link
      href={`/${cat}/${post.slug}`}
      className={`card reveal ${index % 2 ? 'tilt-r' : 'tilt-l'} group overflow-hidden flex flex-col`}
      style={{ animationDelay: `${0.06 + index * 0.06}s` }}
    >
      {post.frontmatter.hero && (
        <div className="m-3 mb-0 overflow-hidden rounded-2xl border-4 border-white h-44">
          <HeroMedia
            hero={post.frontmatter.hero}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt=""
          />
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className={`badge cat-${cat}`}>{cat}</span>
          <time className="text-xs text-[var(--text-muted)] font-semibold">
            {new Date(post.frontmatter.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
          </time>
        </div>
        <h3 className="text-xl font-bold text-[var(--pink-800)] leading-tight mb-1.5 group-hover:text-[var(--accent)] transition-colors">
          {post.frontmatter.title}
        </h3>
        <p className="text-[var(--text-muted)] text-sm line-clamp-2 leading-snug flex-1">
          {post.frontmatter.description}
        </p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag) => (
              <span key={tag} className="hand text-base text-[var(--pink-400)]">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
