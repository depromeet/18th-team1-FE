"use client";

import { useState } from "react";

import { TodaysSentenceCard } from "@/entities/sentence";

const MOCK_CARDS = [
  {
    id: 1,
    label: "긴 문장 (3줄) + 책 표지 있음",
    date: "2025년 6월 19일 목요일",
    quote: "우리는 모두 별빛으로 만들어졌다\n그 별빛이 우리를 연결하고\n우주 속에 이어지게 한다",
    bookTitle: "코스모스",
    bookAuthor: "칼 세이건",
    bookCoverImage: "https://image.aladin.co.kr/product/2248/21/cover/8983712252_1.jpg",
  },
  {
    id: 2,
    label: "짧은 문장 (1줄) + 책 표지 없음",
    date: "2025년 6월 18일 수요일",
    quote: "삶이란 가까이서 보면 비극이지만 멀리서 보면 희극이다",
    bookTitle: "채플린 자서전",
    bookAuthor: "찰리 채플린",
    bookCoverImage: undefined,
  },
  {
    id: 3,
    label: "중간 문장 (2줄) + animateWords",
    date: "2025년 6월 17일 화요일",
    quote: "책을 읽는다는 것은\n다른 사람의 눈으로 세상을 보는 것이다",
    bookTitle: "독서의 즐거움",
    bookAuthor: "헤르만 헤세",
    bookCoverImage: "https://image.aladin.co.kr/product/30736/44/cover/8937460726_1.jpg",
    animateWords: true,
  },
];

export default function SentenceCardTestPage() {
  const [selectedId, setSelectedId] = useState(MOCK_CARDS[0].id);
  const selected = MOCK_CARDS.find((c) => c.id === selectedId) ?? MOCK_CARDS[0];

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 bg-gray-100 px-5 py-10">
      <h1 className="text-lg font-bold text-gray-700">TodaysSentenceCard 테스트</h1>

      {/* 케이스 선택 */}
      <div className="flex flex-col gap-2 w-full max-w-xs">
        {MOCK_CARDS.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => setSelectedId(card.id)}
            className={`rounded-lg px-4 py-2 text-sm text-left transition-colors ${
              selectedId === card.id ? "bg-key-secondary text-white" : "bg-white text-gray-600"
            }`}
          >
            {card.label}
          </button>
        ))}
      </div>

      {/* 카드 */}
      <TodaysSentenceCard
        key={selected.id}
        date={selected.date}
        quote={selected.quote}
        bookTitle={selected.bookTitle}
        bookAuthor={selected.bookAuthor}
        bookCoverImage={selected.bookCoverImage}
        animateWords={"animateWords" in selected ? selected.animateWords : false}
      />

      <p className="text-xs text-gray-400">2초마다 자동 반전 · 카드 클릭 시 즉시 반전</p>
    </div>
  );
}
