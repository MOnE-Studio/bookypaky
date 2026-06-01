import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  duration?: number;
  className?: string;
  reverse?: boolean;
};

export function Marquee({
  children,
  duration = 28,
  className = "",
  reverse = false,
}: Props) {
  return (
    <div className={`marquee ${className}`} aria-hidden>
      <div
        className="marquee-track"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="marquee-group">{children}</div>
        <div className="marquee-group">{children}</div>
      </div>
    </div>
  );
}
