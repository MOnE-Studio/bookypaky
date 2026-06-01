import { notFound } from "next/navigation";
import { Placeholder } from "@/components/Placeholder";
import { books, getBook } from "@/data/books";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export default async function CharactersPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getBook(slug)) notFound();

  return (
    <Placeholder
      icon="👥"
      title="캐릭터"
      description="투명한 요리사, 푸드트럭, 손님 캐릭터 등 작품별 캐릭터 소개가 들어가는 자리입니다."
      hubHref={`/books/${slug}`}
      readHref={`/books/${slug}/read`}
    />
  );
}
