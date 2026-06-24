'use client';

import { useState, useEffect } from 'react';

export default function Gallery({ images, className = '' }) {
  const [selected, setSelected] = useState(null);
  const [loaded, setLoaded] = useState(new Set());
  const [lightboxLoaded, setLightboxLoaded] = useState(true);

  if (!images || images.length === 0) return null;

  const open = (i) => setSelected(i);
  const close = () => setSelected(null);
  const prev = () => setSelected((s) => (s === null ? 0 : (s - 1 + images.length) % images.length));
  const next = () => setSelected((s) => (s === null ? 0 : (s + 1) % images.length));

  const handleLoad = (i) => {
    setLoaded((prev) => {
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  };

  useEffect(() => {
    if (selected !== null) {
      setLightboxLoaded(false);
    }
  }, [selected]);

  return (
    <div className={`my-6 ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            className="group overflow-hidden rounded-2xl border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            aria-label={`View image ${i + 1}: ${img.alt || ''}`}
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
              {!loaded.has(i) && (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--pink-100)]/60 rounded-2xl">
                  <div className="spinner" />
                </div>
              )}
              <img
                src={img.src}
                alt={img.alt || `Photo ${i + 1}`}
                className="w-full h-full object-cover transition group-hover:scale-105"
                onLoad={() => handleLoad(i)}
                onError={() => handleLoad(i)}
                loading="lazy"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Simple cute lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-h-[90vh] max-w-[95vw]" onClick={(e) => e.stopPropagation()}>
            {!lightboxLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-3xl z-10">
                <div className="spinner" style={{ borderTopColor: '#fff', borderColor: '#666' }} />
              </div>
            )}
            <img
              src={images[selected].src}
              alt={images[selected].alt || ''}
              className="max-h-[85vh] max-w-full rounded-3xl object-contain shadow-2xl"
              onLoad={() => setLightboxLoaded(true)}
              onError={() => setLightboxLoaded(true)}
            />

            <button
              onClick={close}
              className="absolute -top-3 -right-3 btn btn-ghost bg-white text-xl px-3 py-2 rounded-full shadow min-h-[44px] min-w-[44px]"
              aria-label="Close gallery"
            >
              ✕
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-ghost bg-white/90 px-4 py-3 rounded-full min-h-[44px] min-w-[44px]"
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost bg-white/90 px-4 py-3 rounded-full min-h-[44px] min-w-[44px]"
                  aria-label="Next image"
                >
                  →
                </button>
              </>
            )}

            <div className="text-center mt-3 text-white/80 text-sm">
              {selected + 1} / {images.length} {images[selected].alt && `— ${images[selected].alt}`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
