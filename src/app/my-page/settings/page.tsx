"use client";

import { useRouter } from "next/navigation";

import { SettingsView } from "@/widgets/settings";

const SettingsPage = () => {
  const router = useRouter();
  return <SettingsView onBack={() => router.back()} />;
};

export default SettingsPage;
