const BLADES = [
  { tone: "text-gold", head: ["100.0", "42.0"], bend: ["130.0", "66.0"], eye: ["100.0", "50.0"] },
  { tone: "text-jade", head: ["150.2", "129.0"], bend: ["114.4", "143.0"], eye: ["143.3", "125.0"] },
  { tone: "text-parchment", head: ["49.8", "129.0"], bend: ["55.6", "91.0"], eye: ["56.7", "125.0"] },
] as const;

export function TripleSeal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-gold" opacity="0.7" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-gold" opacity="0.35" />
      <g className="seal-turn">
        {BLADES.map((blade) => (
          <g key={blade.tone} className={blade.tone}>
            <path
              d={`M100 100 Q ${blade.bend[0]} ${blade.bend[1]} ${blade.head[0]} ${blade.head[1]}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx={blade.head[0]} cy={blade.head[1]} r="13" fill="currentColor" />
            <circle cx={blade.eye[0]} cy={blade.eye[1]} r="3.4" fill="var(--color-ink)" />
          </g>
        ))}
      </g>
      <circle cx="100" cy="100" r="3.5" fill="currentColor" className="text-gold" />
    </svg>
  );
}
