import Link from "next/link";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/ScrollReveal";
import { books, getBook } from "@/data/books";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export default async function PlayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const cuts = [
    "루나의 요리 쇼츠",
    "투명 재료 찾기",
    "푸드트럭 댄스",
    "캐릭터 일러스트",
    "메이킹 컷",
    "다음 에피소드 티저",
  ];

  return (
    <div className="flex min-h-[100svh] flex-col">
      <div className="flex flex-1 flex-col items-center px-4 pb-10 pt-[88px] text-center min-[900px]:px-7 min-[900px]:pt-[104px]">
        <h1 className="shelf-title">놀이터</h1>
        <p className="shelf-sub mx-auto max-w-[420px]">
          루나가 요리하는 짧은 애니메이션과 캐릭터 일러스트 컷들이 이곳에
          나열됩니다.
        </p>

        <div className="mt-9 w-full">
          <div className="mx-auto flex max-w-[1040px] flex-col items-center">
            <ScrollReveal>
              <div className="play-gallery">
                {cuts.map((c) => (
                  <div key={c} className="play-card">
                    {c}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* 스크롤 최하단 — 다른 IP(마법 세계)로 넘어가는 CTA */}
      <Link href="/#shelf" className="next-world">
        ▶ 다음 마법 세계로 가기
      </Link>
    </div>
  );
}
