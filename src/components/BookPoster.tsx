import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  title: string;
  href?: string;
  size?: "default" | "hub";
  className?: string;
};

function PosterInner() {
  return (
    <>
      <div className="rainbow" />
      <div className="cloud" />
      <div className="chef">👩‍🍳</div>
      <div className="truck" />
    </>
  );
}

export function BookPoster({ title, href, size = "default", className }: Props) {
  const cls = [
    "poster",
    size === "hub" ? "hub-size" : "",
    href ? "clickable" : "static",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={cls} data-title={title} aria-label={title}>
        <PosterInner />
      </Link>
    );
  }
  return (
    <div className={cls} data-title={title} aria-label={title}>
      <PosterInner />
    </div>
  );
}

export function PosterWrap({ children }: { children: ReactNode }) {
  return <div className="text-center">{children}</div>;
}
