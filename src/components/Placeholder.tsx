import Link from "next/link";

type Props = {
  icon: string;
  title: string;
  description: string;
  hubHref: string;
  readHref: string;
};

export function Placeholder({ icon, title, description, hubHref, readHref }: Props) {
  return (
    <div className="flex min-h-[calc(100svh-74px)] flex-col items-center justify-center px-4 pb-[44px] pt-[74px] text-center min-[900px]:min-h-[calc(100svh-88px)] min-[900px]:px-7 min-[900px]:pt-[88px]">
      <div className="cartoon-card w-[min(88vw,680px)] -rotate-1 px-7 py-12 min-[900px]:px-10 min-[900px]:py-16">
        <div className="mb-5 text-[70px] drop-shadow-[0_3px_0_rgba(0,0,0,0.08)]">
          {icon}
        </div>
        <h1 className="m-0 text-[clamp(34px,6vw,72px)] font-black tracking-[-0.06em]">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-[520px] font-bold leading-[1.7] text-white/85">
          {description}
        </p>
      </div>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href={hubHref}
          className="spring rounded-full bg-brand-blue px-5 py-3 text-[13px] font-black text-white shadow-[0_4px_0_rgba(22,45,130,0.3)]"
        >
          작품 허브로
        </Link>
        <Link
          href={readHref}
          className="spring rounded-full bg-brand-orange px-5 py-3 text-[13px] font-black text-white shadow-[0_4px_0_rgba(214,96,0,0.32)]"
        >
          동화책 보기
        </Link>
      </div>
    </div>
  );
}
