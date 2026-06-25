import { getPostsByCategory } from '@/lib/content';
import PageHeader from '@/app/components/PageHeader';
import PostCard from '@/app/components/PostCard';

export const metadata = {
  title: 'Swimming',
  description: 'Swimming galas, personal bests, medals and time with the lovely Maidstone Swimming Club crew.',
};

export default function SwimmingPage() {
  const posts = getPostsByCategory('swimming');

  return (
    <div>
      <PageHeader
        category="swimming"
        emoji="🌊"
        title="Swimming"
        subtitle="galas, personal bests, medals & the lovely Maidstone Swimming Club crew"
      />

      {posts.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="hand text-2xl text-[var(--pink-500)]">splash! swim pages coming very soon 🏊‍♀️</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} category="swimming" index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
