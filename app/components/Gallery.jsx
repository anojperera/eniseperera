'use client';

import { useState } from 'react';

export default function Gallery({ images, className = '' }) {
  const [selected, setSelected] = useState(null);

  if (!images || images.length === 0) return null;

  const open = (i) => setSelected(i);
  const close = () => setSelected(null);
  const prev = () => setSelected((s) => (s === null ? 0 : (s - 1 + images.length) % images.length));
  const next = () => setSelected((s) => (s === null ? 0 : (s + 1) % images.length));

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
            <img
              src={img.src}
              alt={img.alt || `Photo ${i + 1}`}
              className="w-full aspect-[4/3] object-cover transition group-hover:scale-105"
            />
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
            <img
              src={images[selected].src}
              alt={images[selected].alt || ''}
              className="max-h-[85vh] max-w-full rounded-3xl object-contain shadow-2xl"
            />

            <button
              onClick={close}
              className="absolute -top-3 -right-3 btn btn-ghost bg-white text-xl px-3 py-1 rounded-full shadow"
              aria-label="Close gallery"
            >
              ✕
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-ghost bg-white/90 px-3 py-2 rounded-full"
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost bg-white/90 px-3 py-2 rounded-full"
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
