export default function Timeline({ items }) {
  return (
    <div className="timeline mt-6">
      {items.map((item, i) => (
        <div key={i} className="timeline-item">
          <div className="font-semibold text-[var(--pink-700)]">{item.title}</div>
          {item.subtitle && <div className="text-xs text-[var(--text-muted)]">{item.subtitle}</div>}
          <p className="mt-1 text-sm text-[var(--text)]">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
