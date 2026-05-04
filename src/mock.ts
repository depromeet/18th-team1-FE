import type { Diary, TodayDiary } from "@/entities/diary";
import type { RecommendedSentence } from "@/entities/sentence";

export const MOCK_TODAY_DIARY: TodayDiary = {
  temperature: 72,
  temperatureColor: "#df8b4a",
  quote: "세상에는 두 종류의 고통이 있다. 너를 아프게 하는 고통과 너를 변하게 하는 고통",
  bookTitle: "나미야 잡화",
  bookAuthor: "히가시노 게이고",
  note: "회의가 길어져서 지쳤지만, 저녁에 동네를 한 바퀴 돌았다. 벚꽃은 이미 다 졌지만 잎이 푸르게 올라온 것만으로도, 변하게 하는 고통이라는 문장이 조금 이해되었다. 이해되었다라니이...",
};

export const MOCK_DIARIES: Diary[] = [
  { day: 24, sentence: "모든 끝은 새로운 시작이다", temperature: 78, dotColor: "#34c759" },
  { day: 23, sentence: "우리는 서로의 거울이 된다", temperature: 74, dotColor: "#ff9500" },
  { day: 22, sentence: "세상에는 두 종류의 고통이 있다", temperature: 72, dotColor: "#c7c7cc" },
  { day: 21, sentence: "우리가 사랑이라 부르는 것들", temperature: 80, dotColor: "#34c759" },
  { day: 20, sentence: "그리고 아무 말도 하지 않았다", temperature: 55, dotColor: "#ff9500" },
  { day: 19, sentence: "바람이 불어오는 곳", temperature: 70, dotColor: "#34c759" },
  { day: 18, sentence: "여름은 오래 그곳에 남아", temperature: 68, dotColor: "#30d158" },
  { day: 17, sentence: "우리는 모두 별에서 왔다", temperature: 68, dotColor: "#34c759" },
  { day: 16, sentence: "시간은 모든 것을 해결해 준다", temperature: 65, dotColor: "#ff9500" },
  { day: 15, sentence: "행복은 작은 것들로 이루어진다", temperature: 82, dotColor: "#30d158" },
  {
    day: 14,
    sentence: "사람은 결국 혼자다, 그래서 아름답다",
    temperature: 60,
    dotColor: "#c7c7cc",
  },
  { day: 13, sentence: "기억은 우리를 살게 한다", temperature: 75, dotColor: "#34c759" },
  { day: 12, sentence: "두려움 없이 살 수는 없다", temperature: 50, dotColor: "#ff3b30" },
  { day: 11, sentence: "말하지 못한 것들이 우리를 만든다", temperature: 63, dotColor: "#ff9500" },
  { day: 10, sentence: "오늘도 충분히 잘 살았다", temperature: 85, dotColor: "#30d158" },
  { day: 9, sentence: "사랑은 이해가 아니라 받아들임이다", temperature: 77, dotColor: "#34c759" },
  { day: 8, sentence: "빛이 있는 곳에 반드시 그림자가 있다", temperature: 58, dotColor: "#c7c7cc" },
  { day: 7, sentence: "우리는 이야기로 살아간다", temperature: 72, dotColor: "#34c759" },
  { day: 6, sentence: "고요함 속에서 진실이 보인다", temperature: 69, dotColor: "#30d158" },
  { day: 5, sentence: "변화는 두려움이 아닌 용기에서 온다", temperature: 76, dotColor: "#ff9500" },
  { day: 4, sentence: "나는 내가 생각하는 것보다 강하다", temperature: 83, dotColor: "#34c759" },
  {
    day: 3,
    sentence: "잃어버린 것들은 다른 형태로 돌아온다",
    temperature: 61,
    dotColor: "#c7c7cc",
  },
  { day: 2, sentence: "봄은 기억하지 못하는 사이에 온다", temperature: 74, dotColor: "#30d158" },
  { day: 1, sentence: "모든 사람은 자신만의 속도가 있다", temperature: 70, dotColor: "#34c759" },
];

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

export const MOCK_SENTENCES: RecommendedSentence[] = [
  {
    id: "1",
    quote: "세상에는 두 종류의 고통이 있다. 너를 아프게 하는 고통과 너를 변하게 하는 고통",
    bookTitle: "나미야 잡화점",
    bookAuthor: "히가시노 게이고",
    date: "4월 19일 목요일",
  },
  {
    id: "2",
    quote: "우리는 모두 누군가의 이야기 속에 살고 있다.",
    bookTitle: "용의자 X의 헌신",
    bookAuthor: "히가시노 게이고",
    date: "4월 19일 목요일",
  },
  {
    id: "3",
    quote: "사랑은 이해가 아니라 받아들임이다.",
    bookTitle: "용의자 X의 헌신",
    bookAuthor: "히가시노 게이고",
    date: "4월 19일 목요일",
  },
  {
    id: "4",
    quote: "모든 끝은 새로운 시작의 다른 이름이다.",
    bookTitle: "용의자 X의 헌신",
    bookAuthor: "히가시노 게이고",
    date: "4월 19일 목요일",
  },
  {
    id: "5",
    quote: "빛이 있는 곳에 반드시 그림자가 있다.",
    bookTitle: "용의자 X의 헌신",
    bookAuthor: "히가시노 게이고",
    date: "4월 19일 목요일",
  },
  {
    id: "6",
    quote: "우리는 이야기로 살아간다.",
    bookTitle: "용의자 X의 헌신",
    bookAuthor: "히가시노 게이고",
    date: "4월 19일 목요일",
  },
  {
    id: "7",
    quote: "기억은 우리를 살게 한다.",
    bookTitle: "용의자 X의 헌신",
    bookAuthor: "히가시노 게이고",
    date: "4월 19일 목요일",
  },
  {
    id: "8",
    quote: "고요함 속에서 진실이 보인다.",
    bookTitle: "용의자 X의 헌신",
    bookAuthor: "히가시노 게이고",
    date: "4월 19일 목요일",
  },
  {
    id: "9",
    quote: "변화는 두려움이 아닌 용기에서 온다.",
    bookTitle: "용의자 X의 헌신",
    bookAuthor: "히가시노 게이고",
    date: "4월 19일 목요일",
  },
];

export const MOCK_SENTENCE: RecommendedSentence | undefined = MOCK_SENTENCES[0];
