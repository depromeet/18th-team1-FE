import type { Diary, DiaryDetail, TodayDiary } from "@/entities/diary";
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

export const MOCK_USER_PROFILE = {
  nickname: "연결한 계정의 이름",
  profileImageUrl: "",
};

export const MOCK_CALENDAR_DIARIES: {
  start: string;
  end: string;
  diaries: DiaryDetail[];
} = {
  start: "2026-05-01",
  end: "2026-05-31",
  diaries: [
    {
      id: 1,
      createdAt: "2026-04-23",
      content: null,
      diaryImageUrl: null,
      emotionIntensity: "LOW",
      emotions: ["사색적인", "그리운", "따뜻한"],
      quoteContent:
        "슬픔은 스스로 돌볼 수 있지만, 기쁨의 가치를 충분히 누리려면 그것을 함께 나눌 누군가가 있어야 한다.",
      coverImageUrl: "https://image.aladin.co.kr/product/240/62/cover500/8971847816_2.jpg",
      author: "마크 트웨인",
      title: "허클베리 핀의 모험",
      aladinLink: "https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=2406291",
    },
    {
      id: 2,
      createdAt: "2026-04-27",
      content:
        "오랫동안 간절히 바랐던 프로젝트 결과가 나왔다. 과정은 힘들었지만 결국 우주가 나를 돕고 있었다는 생각이 든다. 이 확신을 잊지 말아야지.",
      diaryImageUrl: null,
      emotionIntensity: "HIGH",
      emotions: ["자신감 있는", "희망찬", "벅찬"],
      quoteContent: "자네가 무언가를 간절히 원할 때, 온 우주는 자네의 꿈이 실현되도록 도와준다네.",
      coverImageUrl: "https://image.aladin.co.kr/product/7162/36/cover500/8954638570_1.jpg",
      author: "파울로 코엘료",
      title: "연금술사",
      aladinLink: "https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=307361",
    },
    {
      id: 3,
      createdAt: "2026-05-02",
      content:
        "공들여 준비한 일이 어긋나서 잠시 속상했지만, 오히려 그 덕분에 생각지도 못한 여유로운 카페를 발견했다. 역시 인생은 계획대로 되지 않아 더 흥미진진한 법이다.",
      diaryImageUrl: null,
      emotionIntensity: "HIGH",
      emotions: ["긍정적인", "기분좋은", "기대되는"],
      quoteContent:
        "생각대로 되지 않는다는 건 정말 멋지네요. 생각지도 못했던 일이 일어난다는 거니까요!",
      coverImageUrl: "https://image.aladin.co.kr/product/38364/15/cover500/k912135468_1.jpg",
      author: "루시 모드 몽고메리",
      title: "빨강 머리 앤",
      aladinLink: "https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=383641515",
    },
    {
      id: 4,
      createdAt: "2026-05-03",
      content: null,
      diaryImageUrl: null,
      emotionIntensity: "MID",
      emotions: ["차분한", "성찰하는", "순수한"],
      quoteContent: "가장 중요한 것은 보이지 않는다.",
      coverImageUrl: "https://image.aladin.co.kr/product/25184/75/cover500/8931021291_1.jpg",
      author: "앙투안 드 생텍쥐페리",
      title: "어린 왕자",
      aladinLink: "https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=251847567",
    },
    {
      id: 5,
      createdAt: "2026-05-04",
      content:
        "기대했던 결과가 나오지 않아 마음이 무거웠지만, 문득 이 힘든 시간이 나를 성장시키고 있다는 확신이 들었다. 아프기만 한 고통이 아니라 나를 변화시키는 과정이라 믿으니 마음이 한결 편안해진다.",
      diaryImageUrl:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      emotionIntensity: "LOW",
      emotions: ["담담한", "의연한", "성숙한"],
      quoteContent: "세상에는 두 종류의 고통이 있다. 너를 아프게 하는 고통과 너를 변하게 하는 고통",
      coverImageUrl: "https://image.aladin.co.kr/product/30768/99/cover500/k252830652_2.jpg",
      author: "히가시노 게이고",
      title: "나미야 잡화점",
      aladinLink: "https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=307689982",
    },
    {
      id: 6,
      createdAt: "2026-05-06",
      content:
        "안정적인 지금의 환경을 벗어나는 게 무서웠다. 하지만 새로운 나를 만나기 위해서는 지금의 세계를 깨고 나가야만 한다. 두렵지만 설레는 시작이다.",
      diaryImageUrl: null,
      emotionIntensity: "MID",
      emotions: ["용기있는", "비장한", "기대되는"],
      quoteContent:
        "새는 알을 깨고 나오려고 투쟁한다. 알은 세계이다. 태어나려는 자는 하나의 세계를 깨뜨려야 한다.",
      coverImageUrl: "https://image.aladin.co.kr/product/26/0/cover500/s742633278_2.jpg",
      author: "헤르만 헤세",
      title: "데미안",
      aladinLink: "https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=260084",
    },
  ],
};
