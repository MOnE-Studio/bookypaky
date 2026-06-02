import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  href?: string;
  size?: "default" | "hub";
  cover?: string;
  className?: string;
};

function PosterInner({ title, cover }: { title: string; cover?: string }) {
  if (cover) {
    return (
      <Image
        src={cover}
        alt={title}
        fill
        sizes="(min-width: 900px) 440px, 78vw"
        className="object-cover"
        priority
      />
    );
  }
  return (
    <>
      <div className="rainbow" />
      <div className="cloud" />
      <div className="chef">👩‍🍳</div>
      <div className="truck" />
    </>
  );
}

export function BookPoster({
  title,
  href,
  size = "default",
  cover,
  className,
}: Props) {
  const cls = [
    "poster",
    size === "hub" ? "hub-size" : "",
    cover ? "has-cover" : "",
    href ? "clickable" : "static",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const dataTitle = cover ? undefined : title;

  if (href) {
    return (
      <Link href={href} className={cls} data-title={dataTitle} aria-label={title}>
        <PosterInner title={title} cover={cover} />
      </Link>
    );
  }
  return (
    <div className={cls} data-title={dataTitle} aria-label={title}>
      <PosterInner title={title} cover={cover} />
    </div>
  );
}

export function PosterWrap({ children }: { children: ReactNode }) {
  return <div className="text-center">{children}</div>;
}
