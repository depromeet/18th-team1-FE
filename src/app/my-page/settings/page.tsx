"use client";

import { useRouter } from "next/navigation";

import { SettingsView } from "@/widgets/settings";

export default function SettingsPage() {
  const router = useRouter();
  return <SettingsView onBack={() => router.back()} />;
}
