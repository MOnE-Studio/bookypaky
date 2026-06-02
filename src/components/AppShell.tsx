"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type MenuItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

function useMenuItems(): MenuItem[] {
  const pathname = usePathname();
  const router = useRouter();

  const scrollOnHome = useCallback(
    (anchorId: string, block: ScrollLogicalPosition = "start") => {
      const doScroll = () => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: "smooth", block });
      };
      if (pathname === "/") {
        doScroll();
      } else {
        router.push("/");
        setTimeout(doScroll, 80);
      }
    },
    [pathname, router]
  );

  if (pathname === "/" || pathname === "") {
    return [
      { label: "소개", onClick: () => scrollOnHome("intro", "start") },
      { label: "서재", onClick: () => scrollOnHome("shelf", "start") },
      { label: "스토리", onClick: () => scrollOnHome("story", "start") },
    ];
  }

  const bookMatch = pathname.match(/^\/books\/([^/]+)(?:\/(read|play))?/);
  if (bookMatch) {
    const slug = bookMatch[1];
    const sub = bookMatch[2];
    const hub = `/books/${slug}`;

    if (!sub) {
      return [
        { label: "다른 책 고르기", href: "/#shelf" },
        { label: "동화책 읽기", href: `${hub}/read` },
        { label: "놀이터", href: `${hub}/play` },
      ];
    }
    return [
      { label: "← 작품으로", href: hub },
      { label: "동화책 읽기", href: `${hub}/read` },
      { label: "놀이터", href: `${hub}/play` },
    ];
  }

  return [{ label: "← home", href: "/" }];
}

const HIDE_THRESHOLD = 180;

export function AppShell() {
  const [open, setOpen] = useState(false);
  const items = useMenuItems();
  const panelRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";
  const [hidden, setHidden] = useState(isHome);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setHidden(false);
      return;
    }
    const update = () => {
      setHidden(window.scrollY < HIDE_THRESHOLD);
    };
    update();
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      const isMenuBtn = (target as HTMLElement).closest?.(".menu-button");
      if (isMenuBtn) return;
      setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <>
      <header
        className={[
          "fixed left-0 top-0 z-[100] grid h-[60px] w-full grid-cols-[58px_1fr_80px] items-center px-[14px]",
          "transition-[transform,opacity,background-color,backdrop-filter] duration-300 ease-out",
          "min-[900px]:h-[68px] min-[900px]:grid-cols-[90px_1fr_110px] min-[900px]:px-[22px]",
          hidden
            ? "pointer-events-none -translate-y-full opacity-0"
            : "translate-y-0 opacity-100 bg-[#f8f5efc7] backdrop-blur-md shadow-[0_2px_18px_#0000000d]",
        ].join(" ")}
      >
        <button
          type="button"
          aria-label="메뉴 열기"
          onClick={() => setOpen((v) => !v)}
          className="menu-button spring h-9 w-9 rounded-xl bg-brand-blue text-[20px] font-black leading-none text-white shadow-[0_4px_0_rgba(22,45,130,0.32)] min-[900px]:h-10 min-[900px]:w-10 min-[900px]:text-[23px]"
        >
          ≡
        </button>
        <Link
          href="/"
          aria-label="홈으로"
          className="min-w-0 justify-self-center"
          onClick={() => {
            if (typeof window !== "undefined")
              window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Image
            src="/logo/header.png"
            alt="BookyPaky"
            width={400}
            height={150}
            priority
            className="h-9 w-auto min-[900px]:h-11"
          />
        </Link>
        <button
          type="button"
          aria-label="언어 전환 Kor / eng"
          className="lang-toggle spring h-8 w-[64px] justify-self-end rounded-xl bg-brand-blue text-[11px] font-black shadow-[0_4px_0_rgba(40,56,140,0.32)] min-[900px]:h-9 min-[900px]:w-[72px] min-[900px]:text-[12px]"
        >
          <span>Kor</span>
          <span className="text-white/55">/</span>
          <span className="eng">eng</span>
        </button>
      </header>

      <nav
        ref={panelRef}
        aria-label="사이드 메뉴"
        style={{
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
        className={[
          "fixed left-[14px] top-[58px] z-[200] w-[164px] origin-top-left overflow-hidden rounded-2xl bg-brand-blue text-white shadow-[6px_8px_0_rgba(22,45,130,0.28)] transition-[transform,opacity] duration-[260ms]",
          "min-[900px]:left-[22px] min-[900px]:top-[68px]",
          open ? "scale-100 opacity-100" : "scale-50 opacity-0",
        ].join(" ")}
      >
        {items.map((item, idx) => {
          const baseCls =
            "block w-full border-b border-white/25 px-4 py-[12px] text-left text-[13px] font-extrabold transition-colors hover:bg-white/15";
          if (item.href) {
            return (
              <Link key={idx} href={item.href} className={baseCls}>
                {item.label}
              </Link>
            );
          }
          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
              className={baseCls}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
