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

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-3 pb-8 pt-[80px] min-[900px]:px-6 min-[900px]:pt-[92px]">
      <Reader title={book.title} pages={pages} />
    </div>
  );
}
