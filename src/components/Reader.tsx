"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export function Reader({ title, pages }: { title: string; pages: string[] }) {
  const [page, setPage] = useState(0);
  const [touched, setTouched] = useState(false);
  const startX = useRef<number | null>(null);
  const last = pages.length - 1;

  const go = useCallback(
    (dir: 1 | -1) => {
      setTouched(true);
      setPage((p) => Math.min(last, Math.max(0, p + dir)));
    },
    [last]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // 현재 페이지와 양옆 한 장씩만 마운트해서 넘김을 매끄럽게(미리 로드)
  const window3 = [page - 1, page, page + 1].filter((i) => i >= 0 && i <= last);

  return (
    <div
      className="reader"
      onTouchStart={(e) => {
        startX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (startX.current === null) return;
        const dx = e.changedTouches[0].clientX - startX.current;
        if (dx < -40) go(1);
        else if (dx > 40) go(-1);
        startX.current = null;
      }}
    >
      {window3.map((i) => (
        <div
          key={i}
          className="reader-page"
          style={{ opacity: i === page ? 1 : 0 }}
          aria-hidden={i !== page}
        >
          <Image
            src={pages[i]}
            alt={`${title} ${i + 1}페이지`}
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover"
            priority={i === page}
          />
        </div>
      ))}

      <button
        type="button"
        aria-label="이전 페이지"
        className="reader-nav prev"
        onClick={() => go(-1)}
        disabled={page === 0}
        style={page === 0 ? { opacity: 0, pointerEvents: "none" } : undefined}
      >
        <span>‹</span>
      </button>
      <button
        type="button"
        aria-label="다음 페이지"
        className="reader-nav next"
        onClick={() => go(1)}
        disabled={page === last}
        style={page === last ? { opacity: 0, pointerEvents: "none" } : undefined}
      >
        <span>›</span>
      </button>

      <div className="reader-counter">
        {page + 1} / {pages.length}
      </div>

      {!touched && <div className="reader-hint">👆</div>}
    </div>
  );
}
