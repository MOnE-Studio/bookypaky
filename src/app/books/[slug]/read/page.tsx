import Link from "next/link";
import { notFound } from "next/navigation";
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

  return (
    <div className="relative flex min-h-[calc(100svh-74px)] flex-col items-center justify-center overflow-hidden px-4 pb-11 pt-[74px] min-[900px]:min-h-[calc(100svh-88px)] min-[900px]:px-7 min-[900px]:pt-[88px]">
      <div className="rotate-guide">
        <div>
          <div className="phone">📱</div>
          <h2 className="m-0 text-[28px] font-black tracking-[-0.05em]">
            가로 화면으로 돌려주세요
          </h2>
          <p className="mx-auto mt-3 max-w-[360px] font-bold leading-[1.6] text-slate-500">
            동화책 뷰어는 양쪽 페이지가 함께 보여야 하므로 모바일과 아이패드에서는
            가로 보기에 맞춰져 있습니다.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href={`/books/${slug}`}
              className="rounded-full bg-brand-blue px-5 py-3 text-[13px] font-black text-white shadow-[0_4px_0_rgba(22,45,130,0.18)]"
            >
              작품 허브로
            </Link>
          </div>
        </div>
      </div>

      <div className="viewer-title absolute left-7 top-[84px] text-[14px] font-black text-brand-blue">
        {book.title} / 동화책 보기
      </div>

      <div className="viewer-spread spread">
        <div className="spread-page spread-left">
          <div className="speech">
            너무나도 오래 할 수 없는 투명하고 가벼운 그림책 문장 영역입니다.
          </div>
          <div className="pot">🍲</div>
          <div className="touch">👆</div>
        </div>
        <div className="spread-page spread-right">
          <div className="rainbow" />
          <div className="cloud" />
          <div className="chef">👩‍🍳</div>
          <div className="truck" />
        </div>
      </div>

      <div className="viewer-controls mt-4 flex flex-wrap justify-center gap-3 p-[18px]">
        <button
          type="button"
          className="rounded-full bg-brand-blue px-5 py-3 text-[13px] font-black text-white shadow-[0_4px_0_rgba(22,45,130,0.18)]"
        >
          ‹ 이전
        </button>
        <Link
          href={`/books/${slug}`}
          className="rounded-full bg-brand-blue px-5 py-3 text-[13px] font-black text-white shadow-[0_4px_0_rgba(22,45,130,0.18)]"
        >
          작품 허브로
        </Link>
        <button
          type="button"
          className="rounded-full bg-brand-blue px-5 py-3 text-[13px] font-black text-white shadow-[0_4px_0_rgba(22,45,130,0.18)]"
        >
          다음 ›
        </button>
      </div>
    </div>
  );
}
