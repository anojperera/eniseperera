import MusicScore from './MusicScore';
import Timeline from './Timeline';
import Gallery from './Gallery';

export const mdxComponents = {
  MusicScore,
  Timeline,
  Gallery,
  // Allow native video and img to work nicely
  video: (props) => (
    <video {...props} className={`rounded-2xl border border-[var(--border)] my-4 w-full max-w-full ${props.className || ''}`} />
  ),
  img: (props) => (
    <img {...props} className={`rounded-2xl border border-[var(--border)] my-4 ${props.className || ''}`} />
  ),
};
