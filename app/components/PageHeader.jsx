const TAPE = {
  projects: 'tape-butter',
  swimming: 'tape-mint',
  music: '',
  hockey: 'tape-butter',
};

export default function PageHeader({ category, emoji, title, subtitle }) {
  return (
    <header className="relative mb-12 text-center reveal">
      <div
        className={`card taped ${TAPE[category] ?? ''} inline-flex items-center justify-center w-24 h-24 mx-auto mb-5 text-5xl tilt-l`}
        aria-hidden="true"
      >
        {emoji}
      </div>
      <h1 className="text-5xl sm:text-6xl mb-3">
        <span className="underline-doodle">{title}</span>
      </h1>
      <p className="hand text-2xl text-[var(--pink-500)] max-w-xl mx-auto leading-snug">
        {subtitle}
      </p>
    </header>
  );
}
