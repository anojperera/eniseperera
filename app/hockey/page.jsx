import Link from 'next/link';
import { getPostsByCategory } from '@/lib/content';
import PageHeader from '@/app/components/PageHeader';
import PostCard from '@/app/components/PostCard';

export const metadata = {
  title: 'Hockey',
};

export default function HockeyPage() {
  const posts = getPostsByCategory('hockey');

  return (
    <div>
      <PageHeader
        category="hockey"
        emoji="🏑"
        title="Hockey"
        subtitle="the thrill of the game, brilliant teammates & growing with every match"
      />

      {posts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} category="hockey" index={i} />
          ))}
        </div>
      ) : (
        <div className="card tilt-l p-12 text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🏑</div>
          <h2 className="text-2xl mb-2">adventures starting soon</h2>
          <p className="hand text-2xl text-[var(--pink-500)]">
            I love playing hockey — match stories will land here as I write them!
          </p>
        </div>
      )}

      <div className="mt-14 text-center">
        <Link href="/" className="btn btn-ghost">← back home</Link>
      </div>
    </div>
  );
}
