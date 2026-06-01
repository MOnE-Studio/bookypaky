export type Book = {
  slug: string;
  title: string;
  description: string;
  hubDescription: string;
};

export const books: Book[] = [
  {
    slug: "transparent-chef",
    title: "투명한 요리사의 레스토랑",
    description: "BookyPaky 첫 번째 그림동화책 IP",
    hubDescription:
      "이 작품 안에서 동화책 보기, 게임, 쇼츠, 캐릭터 소개로 나뉩니다. 표지는 정보 이미지로만 두고, 실제 진입은 아래 아이콘을 눌렀을 때만 됩니다.",
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}
