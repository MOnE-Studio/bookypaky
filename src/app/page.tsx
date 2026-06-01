import Image from "next/image";
import { BookPoster } from "@/components/BookPoster";
import { Marquee } from "@/components/Marquee";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Sparkles } from "@/components/Sparkles";
import { books } from "@/data/books";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 px-4 pb-12 pt-0 min-[900px]:px-7">
      <section className="relative grid min-h-[100svh] place-items-center text-center">
        <Sparkles />
        <div className="relative z-[1]">
          <div className="hero-logo-stack mx-auto w-[min(78vw,480px)]">
            <Image
              src="/logo/hero.png"
              alt="BookyPaky"
              width={3762}
              height={3762}
              priority
              className="hero-frame"
            />
            <Image
              src="/logo/hero-blink.png"
              alt=""
              width={3762}
              height={3762}
              aria-hidden
              className="hero-overlay hero-blink"
            />
            <Image
              src="/logo/hero-up.png"
              alt=""
              width={3762}
              height={3762}
              aria-hidden
              className="hero-overlay hero-up"
            />
          </div>
          <div className="mt-8 inline-block -rotate-2 rounded-full bg-brand-blue px-9 py-4 text-[clamp(17px,2.6vw,30px)] font-black text-brand-orange-soft shadow-[6px_6px_0_rgba(22,45,130,0.28)]">
            “아래에 마법이 숨어있어!”
          </div>
        </div>
      </section>

      <div className="-mx-4 min-[900px]:-mx-7">
        <Marquee duration={28}>
          <span className="text-[clamp(40px,8vw,96px)] font-black tracking-[-0.06em] text-brand-blue">
            BOOKYPAKY
          </span>
          <span className="text-[clamp(40px,8vw,96px)] font-black tracking-[-0.06em] text-brand-orange">
            ✦
          </span>
          <span className="text-[clamp(40px,8vw,96px)] font-black tracking-[-0.06em] text-brand-blue">
            아래에 마법이 숨어있어
          </span>
          <span className="text-[clamp(40px,8vw,96px)] font-black tracking-[-0.06em] text-brand-orange">
            ✦
          </span>
        </Marquee>
      </div>

      <div className="mx-auto grid w-full max-w-[1100px] gap-16 pb-[60px]">
        {books.map((book) => (
          <ScrollReveal key={book.slug}>
            <article
              id="shelfStart"
              className="grid scroll-mt-[100px] place-items-center px-0 pb-[30px] pt-5 text-center"
            >
              <BookPoster title={book.title} href={`/books/${book.slug}`} />
              <div className="mt-6 text-[23px] font-black tracking-[-0.04em]">
                {book.title}
              </div>
              <div className="mt-[7px] text-[13px] font-bold text-zinc-500">
                {book.description}
              </div>
            </article>
          </ScrollReveal>
        ))}

        <ScrollReveal as="section" delay={80}>
          <section
            id="companySection"
            className="grid min-h-[42svh] scroll-mt-[100px] place-items-center px-5 pb-12 pt-[40px] text-center"
          >
            <div className="cartoon-card w-[min(88vw,740px)] px-7 py-12 min-[900px]:px-12">
              <h2 className="company-heading">BookyPaky</h2>
              <p className="mx-auto mt-6 max-w-[540px] font-bold leading-[1.75]">
                아이들이 화면을 넘기는 순간마다 작은 마법을 발견하도록 만든
                그림동화책 서재입니다. 콘텐츠가 늘어나면 첫 화면에 같은 방식으로
                하나씩 추가됩니다.
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mx-auto w-[min(88vw,560px)] rotate-1 rounded-[28px] bg-brand-orange-soft px-6 py-7 text-center cartoon-shadow-orange">
            <p className="text-[clamp(18px,3.4vw,24px)] font-black text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.08)]">
              “ 가치있는 컨텐츠를 만들자 ”
            </p>
            <p className="mt-3 text-[12px] font-bold tracking-wider text-white/85">
              MoNE / Motion & Emotion
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
