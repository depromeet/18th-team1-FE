import type { SentenceQuote } from "@/entities/sentence";

export const MOCK_SITUATIONS = [
  { id: "1", label: "지쳐있는 순간" },
  { id: "2", label: "아무것도 하기 싫은 순간" },
  { id: "3", label: "위로가 필요한 순간" },
  { id: "4", label: "설레는 순간" },
  { id: "5", label: "슬픈 순간" },
  { id: "6", label: "행복한 순간" },
  { id: "7", label: "외로운 순간" },
  { id: "8", label: "화가 나는 순간" },
  { id: "9", label: "불안한 순간" },
  { id: "10", label: "감사한 순간" },
  { id: "11", label: "그리운 순간" },
  { id: "12", label: "두려운 순간" },
  { id: "13", label: "평온한 순간" },
  { id: "14", label: "설렘이 필요한 순간" },
  { id: "15", label: "용기가 필요한 순간" },
  { id: "16", label: "쉬고 싶은 순간" },
];

export const MOCK_SENTENCE_TYPES = [
  { id: "1", label: "위로가 되는 문장" },
  { id: "2", label: "공감해주는 문장" },
  { id: "3", label: "영감을 주는 문장" },
];

export const MOCK_SENTENCES: SentenceQuote[] = [
  {
    quoteId: 1,
    bookId: 1,
    content: "세상에는 두 종류의 고통이 있다. 너를 아프게 하는 고통과 너를 변하게 하는 고통",
    title: "나미야 잡화점",
    author: "히가시노 게이고",
    image: "",
  },
  {
    quoteId: 2,
    bookId: 2,
    content: "우리는 모두 누군가의 이야기 속에 살고 있다.",
    title: "용의자 X의 헌신",
    author: "히가시노 게이고",
    image: "",
  },
  {
    quoteId: 3,
    bookId: 2,
    content: "사랑은 이해가 아니라 받아들임이다.",
    title: "용의자 X의 헌신",
    author: "히가시노 게이고",
    image: "",
  },
  {
    quoteId: 4,
    bookId: 2,
    content: "모든 끝은 새로운 시작의 다른 이름이다.",
    title: "용의자 X의 헌신",
    author: "히가시노 게이고",
    image: "",
  },
  {
    quoteId: 5,
    bookId: 2,
    content: "빛이 있는 곳에 반드시 그림자가 있다.",
    title: "용의자 X의 헌신",
    author: "히가시노 게이고",
    image: "",
  },
  {
    quoteId: 6,
    bookId: 2,
    content: "우리는 이야기로 살아간다.",
    title: "용의자 X의 헌신",
    author: "히가시노 게이고",
    image: "",
  },
  {
    quoteId: 7,
    bookId: 2,
    content: "기억은 우리를 살게 한다.",
    title: "용의자 X의 헌신",
    author: "히가시노 게이고",
    image: "",
  },
  {
    quoteId: 8,
    bookId: 2,
    content: "고요함 속에서 진실이 보인다.",
    title: "용의자 X의 헌신",
    author: "히가시노 게이고",
    image: "",
  },
  {
    quoteId: 9,
    bookId: 2,
    content: "변화는 두려움이 아닌 용기에서 온다.",
    title: "용의자 X의 헌신",
    author: "히가시노 게이고",
    image: "",
  },
];

export const MOCK_USER_PROFILE = {
  nickname: "연결한 계정의 이름",
  profileImageUrl: "",
};
