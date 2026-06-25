import { getPostsByCategory } from '@/lib/content';
import PageHeader from '@/app/components/PageHeader';
import PostCard from '@/app/components/PostCard';

export const metadata = {
  title: 'Projects',
};

export default function ProjectsPage() {
  const posts = getPostsByCategory('projects');

  return (
    <div>
      <PageHeader
        category="projects"
        emoji="🎨"
        title="Projects"
        subtitle="creative experiments, school adventures & the stories behind the things I make"
      />

      {posts.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="hand text-2xl text-[var(--pink-500)]">no project pages glued in yet — soon! 🖍️</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} category="projects" index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
