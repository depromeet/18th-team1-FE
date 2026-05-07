import { type ChangeEvent, useEffect, useRef } from "react";

import { MOCK_SITUATIONS } from "@/mock";

import { useDiaryEmotionStore } from "../model/useDiaryEmotionStore";
import { TagChip } from "./TagChip";

interface SituationDescriptionStepProps {
  onValidChange: (isNextDisabled: boolean) => void;
}

const MIN_TEXTAREA_HEIGHT = 180;
const BUTTON_AREA = 100;

const adjustHeight = (el: HTMLTextAreaElement): void => {
  el.style.height = "auto";
  el.style.height = `${Math.max(el.scrollHeight, MIN_TEXTAREA_HEIGHT)}px`;
};

export const SituationDescriptionStep = ({
  onValidChange,
}: SituationDescriptionStepProps): React.ReactElement => {
  const { selectedSituationIds, situationDescription, setSituationDescription } =
    useDiaryEmotionStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollParentRef = useRef<HTMLElement | null>(null);
  const selectedChips = MOCK_SITUATIONS.filter((s) => selectedSituationIds.includes(s.id));

  useEffect(() => {
    onValidChange(situationDescription.trim() === "");
  }, [situationDescription, onValidChange]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // 스크롤 컨테이너를 마운트 시 한 번만 캐시
    let parent: HTMLElement | null = textarea.parentElement;
    while (parent && getComputedStyle(parent).overflowY !== "auto") {
      parent = parent.parentElement;
    }
    scrollParentRef.current = parent;

    adjustHeight(textarea);
  }, []);

  const scrollToCursor = (textarea: HTMLTextAreaElement): void => {
    const sp = scrollParentRef.current;
    if (!sp) return;

    requestAnimationFrame(() => {
      const textareaRect = textarea.getBoundingClientRect();
      const containerRect = sp.getBoundingClientRect();
      const textareaBottom = textareaRect.bottom - containerRect.top + sp.scrollTop;
      const visibleBottom = sp.scrollTop + sp.clientHeight;

      if (textareaBottom > visibleBottom - BUTTON_AREA) {
        sp.scrollTop = textareaBottom - sp.clientHeight + BUTTON_AREA;
      }
    });
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setSituationDescription(e.target.value);
    adjustHeight(e.currentTarget);
    scrollToCursor(e.currentTarget);
  };

  return (
    <div className="flex flex-col pt-8.5">
      <div className="flex flex-wrap gap-x-2.5 gap-y-3.5">
        {selectedChips.map((chip) => (
          <TagChip key={chip.id} label={chip.label} isSelected />
        ))}
      </div>
      <textarea
        ref={textareaRef}
        // biome-ignore lint/a11y/noAutofocus: 감정 입력 스텝에서 즉시 입력 유도를 위해 의도적으로 사용
        autoFocus
        style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
        className="head1 mt-14 w-full resize-none bg-transparent text-foreground outline-none placeholder:text-[rgba(9,9,9,0.2)]"
        placeholder={"왜 이런 감정을\n느끼셨나요?"}
        value={situationDescription}
        onChange={handleChange}
      />
    </div>
  );
};
