import Image from "next/image";
import Link from "next/link";
import { BookPoster } from "@/components/BookPoster";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Sparkles } from "@/components/Sparkles";
import { books } from "@/data/books";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ===== 소개창 (Intro) ===== */}
      <section id="intro" className="screen">
        <Sparkles />
        <div className="relative z-[1]">
          <div className="hero-logo-stack mx-auto w-[min(80vw,460px)]">
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
          <div className="mt-9 text-center">
            <span className="tagline-pill">“아래에 마법이 숨어있어!”</span>
          </div>
        </div>
      </section>

      {/* ===== 서재창 (Bookshelf) ===== */}
      <section id="shelf" className="screen">
        <div className="grid w-full max-w-[1100px] place-items-center gap-16">
          {books.map((book) => (
            <ScrollReveal key={book.slug}>
              <article className="grid place-items-center text-center">
                <div className="shelf-title">{book.title}</div>
                <div className="mt-6">
                  <BookPoster
                    title={book.title}
                    href={`/books/${book.slug}`}
                    cover={book.cover}
                  />
                </div>
                <p className="shelf-sub">{book.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== 스토리창 (Our Story) ===== */}
      <section id="story" className="screen">
        <ScrollReveal>
          <div className="grid place-items-center">
            <div className="story-media">
              <Image
                src="/logo/header.png"
                alt=""
                width={400}
                height={150}
                aria-hidden
                className="h-auto w-[min(46vw,260px)] opacity-90"
              />
            </div>
            <div className="story-bar">
              <p className="quote">“ 가치있는 컨텐츠를 만들자 ”</p>
              <p className="letter">
                아이들이 화면을 넘기는 순간마다 작은 마법을 발견하도록 만든
                그림동화책 서재입니다.
                <br />
                MoNE · Motion &amp; Emotion / 지후 작가의 서정적인 짧은 편지글이
                이곳에 놓입니다.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <div className="flex justify-center pb-14">
        <Link
          href="/#shelf"
          className="spring rounded-full bg-brand-orange px-6 py-3 text-[13px] font-black text-white shadow-[0_5px_0_rgba(214,96,0,0.32)]"
        >
          서재로 올라가기 ↑
        </Link>
      </div>
    </div>
  );
}
