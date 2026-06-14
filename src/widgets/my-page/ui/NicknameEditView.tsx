"use client";

import { useUserProfileQuery } from "@/entities/user";
import { NicknameInputField, useNicknameEdit } from "@/features/my-profile";
import { useViewportHeight } from "@/shared/hooks/useViewportHeight";
import { NewButton } from "@/shared/ui/new-button";
import { Header } from "@/widgets/header";

interface NicknameEditViewProps {
  onBack: () => void;
}

export const NicknameEditView = ({ onBack }: NicknameEditViewProps) => {
  useViewportHeight();
  const { data: profile } = useUserProfileQuery();
  const initialNickname = profile?.nickname ?? "";

  const { value, isValid, validationError, handleChange, handleClear, maxLength } =
    useNicknameEdit(initialNickname);

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 flex flex-col bg-background md:left-1/2 md:right-auto md:w-93.75 md:-translate-x-1/2"
      style={{ height: "var(--vh, 100dvh)" }}
    >
      <Header title="닉네임 수정" onBack={onBack} />
      <div className="flex-1 px-5 pt-2.5">
        <NicknameInputField
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          placeholder={initialNickname}
          maxLength={maxLength}
          errorMessage={validationError}
        />
      </div>
      <div style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <NewButton label="변경 완료" disabled={!isValid} onClick={onBack} />
      </div>
    </div>
  );
};
