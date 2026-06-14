"use client";

import { useRouter } from "next/navigation";

import { NicknameEditView } from "@/widgets/my-page";

export default function NicknameEditPage() {
  const router = useRouter();
  return <NicknameEditView onBack={() => router.back()} />;
}
