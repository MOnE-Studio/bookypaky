import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  href?: string;
  size?: "default" | "hub";
  cover?: string;
  /** 첫 화면(폴드 위)에 노출될 때만 true — 기본은 lazy 로드 */
  priority?: boolean;
  className?: string;
};

function PosterInner({
  title,
  cover,
  priority = false,
}: {
  title: string;
  cover?: string;
  priority?: boolean;
}) {
  if (cover) {
    return (
      <Image
        src={cover}
        alt={title}
        fill
        sizes="(min-width: 900px) 440px, 78vw"
        className="object-cover"
        priority={priority}
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
  priority = false,
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
        <PosterInner title={title} cover={cover} priority={priority} />
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
