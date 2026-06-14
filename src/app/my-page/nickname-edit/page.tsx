"use client";

import { useRouter } from "next/navigation";

import { NicknameEditView } from "@/widgets/my-page";

const NicknameEditPage = () => {
  const router = useRouter();
  return <NicknameEditView onBack={() => router.back()} />;
};

export default NicknameEditPage;
