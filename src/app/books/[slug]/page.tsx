import Link from "next/link";
import { notFound } from "next/navigation";
import { BookPoster } from "@/components/BookPoster";
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

  const features = [
    { icon: "📖", label: "동화책 보기", href: `/books/${slug}/read` },
    { icon: "🎮", label: "게임", href: `/books/${slug}/game` },
    { icon: "🎬", label: "쇼츠", href: `/books/${slug}/shorts` },
    { icon: "👥", label: "캐릭터", href: `/books/${slug}/characters` },
  ];

  return (
    <div className="flex min-h-[calc(100svh-74px)] flex-col items-center justify-center overflow-hidden px-4 pb-11 pt-[74px] text-center min-[900px]:min-h-[calc(100svh-88px)] min-[900px]:px-7 min-[900px]:pt-[88px]">
      <div className="grid w-full max-w-[1050px] grid-cols-1 items-center gap-7 text-center min-[900px]:grid-cols-[0.82fr_1.18fr] min-[900px]:gap-[52px]">
        <div>
          <BookPoster title={book.title} size="hub" />
        </div>

        <div className="text-center min-[900px]:text-left">
          <h1 className="m-0 text-[clamp(34px,5vw,68px)] font-black leading-[1.05] tracking-[-0.06em]">
            {book.title.split(" ").map((word, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {word}
                  <br />
                </span>
              ) : (
                <span key={i}>{word}</span>
              )
            )}
          </h1>
          <p className="mx-auto mt-[18px] max-w-[560px] text-[16px] font-bold leading-[1.75] text-slate-500 min-[900px]:mx-0">
            {book.hubDescription}
          </p>

          <div className="mt-[34px] grid grid-cols-2 gap-[14px] min-[900px]:grid-cols-4">
            {features.map((f) => (
              <Link
                key={f.label}
                href={f.href}
                className="spring grid min-h-[132px] place-items-center rounded-3xl bg-brand-blue px-[10px] py-[18px] text-white shadow-[6px_8px_0_rgba(22,45,130,0.28)]"
              >
                <div>
                  <div className="mb-[10px] text-[42px]">{f.icon}</div>
                  <div className="text-[14px] font-black leading-[1.2]">
                    {f.label}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
