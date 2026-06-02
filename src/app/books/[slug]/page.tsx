import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books, getBook } from "@/data/books";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export default async function BookHubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const actions = [
    {
      icon: "/icon-another.png",
      label: "다른 책 고르기",
      sub: "메인 ‘서재’ 위치로 돌아갑니다",
      href: "/#shelf",
    },
    {
      icon: "/icon-read.png",
      label: "동화책 읽기",
      sub: "동화책 뷰어 영역으로 이동",
      href: `/books/${slug}/read`,
    },
    {
      icon: "/icon-play.png",
      label: "놀이터",
      sub: "2차 창작물 · 숏폼 영상 영역으로 이동",
      href: `/books/${slug}/play`,
    },
  ];

  return (
    <div className="screen">
      <div className="grid w-full place-items-center gap-10">
        <h1 className="shelf-title">{book.title}</h1>
        <nav className="hub-actions" aria-label="작품 메뉴">
          {actions.map((a) => (
            <Link key={a.label} href={a.href} className="hub-action">
              <span className="icon-frame">
                <Image
                  src={a.icon}
                  alt=""
                  width={500}
                  height={500}
                  aria-hidden
                />
              </span>
              <span className="label">{a.label}</span>
              <span className="sub">{a.sub}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
