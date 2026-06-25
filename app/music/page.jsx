import { getPostsByCategory } from '@/lib/content';
import PageHeader from '@/app/components/PageHeader';
import PostCard from '@/app/components/PostCard';

export const metadata = {
  title: 'Music',
  description: 'Original music compositions, playable scores, and the stories that inspired each melody.',
};

export default function MusicPage() {
  const posts = getPostsByCategory('music');

  return (
    <div>
      <PageHeader
        category="music"
        emoji="🎵"
        title="Music"
        subtitle="original pieces, playable scores & the little stories that inspired each melody"
      />

      {posts.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="hand text-2xl text-[var(--pink-500)]">my tunes are warming up — back soon 🎶</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} category="music" index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
