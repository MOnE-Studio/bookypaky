import type { Metadata } from "next";
import "./globals.css";
import { BackgroundDecor } from "@/components/BackgroundDecor";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "BookyPaky",
  description: "아이들이 화면을 넘기는 순간마다 작은 마법을 발견하는 그림동화책 서재",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">
        <BackgroundDecor />
        <AppShell />
        <main className="relative z-[1]">{children}</main>
      </body>
    </html>
  );
}
