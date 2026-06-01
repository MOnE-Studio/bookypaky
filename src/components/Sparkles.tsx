type SparkleSpec = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: number;
  color: string;
  delay: number;
  dur: number;
  rot: number;
};

const SPARKLES: SparkleSpec[] = [
  { top: "10%", left: "8%", size: 30, color: "#ff5878", delay: 0, dur: 3.4, rot: 0 },
  { top: "18%", right: "10%", size: 38, color: "#31b8ef", delay: 0.5, dur: 4.0, rot: 14 },
  { top: "40%", left: "3%", size: 22, color: "#ff9418", delay: 0.9, dur: 3.6, rot: -10 },
  { top: "52%", right: "5%", size: 34, color: "#3156d8", delay: 0.2, dur: 4.4, rot: 0 },
  { bottom: "22%", left: "10%", size: 26, color: "#ffab16", delay: 1.1, dur: 3.2, rot: 8 },
  { bottom: "10%", right: "16%", size: 30, color: "#ff5878", delay: 0.7, dur: 3.8, rot: -6 },
  { top: "8%", left: "44%", size: 18, color: "#86efac", delay: 1.3, dur: 3.0, rot: 12 },
];

function Star() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M50 2 C52 32, 68 48, 98 50 C68 52, 52 68, 50 98 C48 68, 32 52, 2 50 C32 48, 48 32, 50 2 Z" />
    </svg>
  );
}

export function Sparkles() {
  return (
    <div className="sparkle-layer" aria-hidden>
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="sparkle"
          style={
            {
              top: s.top,
              bottom: s.bottom,
              left: s.left,
              right: s.right,
              "--sparkle-size": `${s.size}px`,
              "--sparkle-color": s.color,
              "--sparkle-delay": `${s.delay}s`,
              "--sparkle-dur": `${s.dur}s`,
              "--sparkle-rot": `${s.rot}deg`,
            } as React.CSSProperties
          }
        >
          <Star />
        </span>
      ))}
    </div>
  );
}
