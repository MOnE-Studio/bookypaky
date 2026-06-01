import { notFound } from "next/navigation";
import { Placeholder } from "@/components/Placeholder";
import { books, getBook } from "@/data/books";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export default async function ShortsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getBook(slug)) notFound();

  return (
    <Placeholder
      icon="🎬"
      title="쇼츠"
      description="짧은 애니메이션, 티저, 캐릭터 리액션 영상이 들어가는 자리입니다."
      hubHref={`/books/${slug}`}
      readHref={`/books/${slug}/read`}
    />
  );
}
