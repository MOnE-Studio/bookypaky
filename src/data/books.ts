export type Book = {
  slug: string;
  title: string;
  description: string;
  hubDescription: string;
  /** 서재(책 선택)용 표지 이미지 경로 */
  cover?: string;
  /** 동화책 뷰어 페이지 이미지 경로 (순서대로) */
  pages?: string[];
};

const transparentChefPages = Array.from(
  { length: 24 },
  (_, i) =>
    `/storybooks/transparent-chef/pages/${String(i).padStart(2, "0")}.jpg`
);

export const books: Book[] = [
  {
    slug: "transparent-chef",
    title: "투명한 요리사의 레스토랑",
    description: "BookyPaky 첫 번째 그림동화책 IP",
    hubDescription:
      "이 작품 안에서 동화책 보기, 게임, 쇼츠, 캐릭터 소개로 나뉩니다. 표지는 정보 이미지로만 두고, 실제 진입은 아래 아이콘을 눌렀을 때만 됩니다.",
    cover: "/storybooks/transparent-chef/cover.jpg",
    pages: transparentChefPages,
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}
