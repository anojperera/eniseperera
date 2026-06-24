'use client';

import { useEffect, useRef } from 'react';

export default function MusicScore({ abc, title }) {
  const paperRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    let cleanup;

    async function initAbc() {
      const abcjs = (await import('abcjs')).default;

      if (!paperRef.current) return;

      try {
        const visual = abcjs.renderAbc(paperRef.current, abc, {
          add_classes: true,
          responsive: 'resize',
        })[0];

        if (abcjs.synth.supportsAudio() && audioRef.current) {
          const synthControl = new abcjs.synth.SynthController();
          synthControl.load(audioRef.current, null, {
            displayRestart: true,
            displayPlay: true,
            displayProgress: true,
          });
          synthControl.setTune(visual, false);
        }
      } catch (e) {
        console.error('abcjs render error', e);
        if (paperRef.current) {
          paperRef.current.innerHTML = '<p class="text-red-500 text-sm">Could not render music notation. See ABC code below.</p>';
        }
      }
    }

    initAbc();

    return () => {
      if (cleanup) cleanup();
    };
  }, [abc]);

  return (
    <div className="music-container my-6">
      {title && <div className="text-sm font-medium mb-2 text-[var(--pink-700)]">{title}</div>}
      <div ref={paperRef} className="abc-paper mb-4" />
      <div ref={audioRef} className="abc-audio mt-2" />
      <details className="mt-4 text-xs text-[var(--text-muted)]">
        <summary className="cursor-pointer">View raw ABC notation</summary>
        <pre className="mt-2 bg-white p-3 rounded-xl overflow-auto text-[10px]">{abc}</pre>
      </details>
    </div>
  );
}
