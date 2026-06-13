"use client";

import { useRouter } from "next/navigation";

import { NicknameEditView } from "@/widgets/my-page";

export default function NicknameEditPage(): React.ReactElement {
  const router = useRouter();
  return <NicknameEditView onBack={() => router.back()} />;
}
