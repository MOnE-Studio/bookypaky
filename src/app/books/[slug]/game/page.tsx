import { notFound } from "next/navigation";
import { Placeholder } from "@/components/Placeholder";
import { books, getBook } from "@/data/books";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getBook(slug)) notFound();

  return (
    <Placeholder
      icon="🎮"
      title="게임"
      description="투명한 요리사의 레스토랑에 맞춘 미니게임이 들어가는 자리입니다. 예: 투명 재료 찾기, 요리 순서 맞추기, 레스토랑 꾸미기."
      hubHref={`/books/${slug}`}
      readHref={`/books/${slug}/read`}
    />
  );
}
