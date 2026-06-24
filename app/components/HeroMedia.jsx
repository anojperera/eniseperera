import { MEDIA_BASE } from '@/lib/content';

export default function HeroMedia({ hero, className = '', alt = '' }) {
  if (!hero) return null;

  const src = hero.startsWith('http') || hero.startsWith('/')
    ? hero
    : `${MEDIA_BASE}/${hero}`;

  const isVideo = /\.(mov|mp4|webm|m4v)$/i.test(hero);

  const baseClass = `object-cover rounded-2xl transition-transform ${className}`;

  if (isVideo) {
    return (
      <video
        src={src}
        className={baseClass}
        muted
        playsInline
        preload="metadata"
        controls={false}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={baseClass}
    />
  );
}
