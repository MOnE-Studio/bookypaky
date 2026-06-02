import Link from "next/link";
import { notFound } from "next/navigation";
import { Reader } from "@/components/Reader";
import { books, getBook } from "@/data/books";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export default async function ReadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const pages = book.pages ?? [];

  if (pages.length === 0) {
    return (
      <div className="flex min-h-[100svh] flex-col items-center justify-center gap-5 px-6 text-center">
        <p className="shelf-title">아직 페이지가 없어요</p>
        <p className="shelf-sub">이 동화책은 준비 중입니다.</p>
        <Link
          href={`/books/${slug}`}
          className="spring rounded-full bg-brand-blue px-5 py-3 text-[13px] font-black text-white shadow-[0_4px_0_rgba(40,56,140,0.3)]"
        >
          ← 작품으로
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-3 pb-8 pt-[80px] min-[900px]:px-6 min-[900px]:pt-[92px]">
      <Reader title={book.title} pages={pages} />
    </div>
  );
}
