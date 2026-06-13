interface DiaryPurposeSectionProps {
  purpose: string;
}

export const DiaryPurposeSection = ({ purpose }: DiaryPurposeSectionProps) => (
  <div className="flex flex-col gap-3">
    <p className="body3 text-gray-400">문장의 목적</p>
    <div className="rounded-md bg-muted px-3.5 py-2.5">
      <p className="body3 whitespace-pre-wrap text-gray-500">{purpose}</p>
    </div>
  </div>
);
