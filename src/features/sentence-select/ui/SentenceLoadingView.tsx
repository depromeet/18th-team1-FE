"use client";

import Lottie from "lottie-react";

import booksOpenJson from "../assets/books-open.json";

export const SentenceLoadingView = () => (
  <div className="flex h-full flex-col items-center justify-center bg-background">
    <Lottie animationData={booksOpenJson} style={{ width: 184, height: 151 }} loop />
    <p className="body3 text-gray-500">문장을 불러오고 있어요</p>
  </div>
);
