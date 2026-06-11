import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta = {
  title: "@tokens",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

// ─── Color Palette ───────────────────────────────────────────────────────────

const grayScale: { label: string; tw: string; hex: string }[] = [
  { label: "gray-0", tw: "bg-gray-0", hex: "#ffffff" },
  { label: "gray-50", tw: "bg-gray-50", hex: "#f7f7f7" },
  { label: "gray-100", tw: "bg-gray-100", hex: "#eaebeb" },
  { label: "gray-200", tw: "bg-gray-200", hex: "#dcdcdc" },
  { label: "gray-300", tw: "bg-gray-300", hex: "#8a8a8a" },
  { label: "gray-400", tw: "bg-gray-400", hex: "#737373" },
  { label: "gray-500", tw: "bg-gray-500", hex: "#5c5c5c" },
  { label: "gray-600", tw: "bg-gray-600", hex: "#3a3a3a" },
  { label: "gray-700", tw: "bg-gray-700", hex: "#222222" },
];

const grayOpacity: { label: string; tw: string; hex: string }[] = [
  { label: "gray-0-20", tw: "bg-gray-0-20", hex: "#ffffff / 20%" },
  { label: "gray-0-70", tw: "bg-gray-0-70", hex: "#ffffff / 70%" },
  { label: "gray-500-50", tw: "bg-gray-500-50", hex: "#5c5c5c / 50%" },
  { label: "gray-600-15", tw: "bg-gray-600-15", hex: "#3a3a3a / 15%" },
  { label: "gray-700-50", tw: "bg-gray-700-50", hex: "#090909 / 50%" },
];

const keyColors: { label: string; tw: string; hex: string }[] = [
  { label: "key-primary", tw: "bg-key-primary", hex: "#a4d4d6" },
  { label: "key-secondary", tw: "bg-key-secondary", hex: "#6b1e3c" },
  { label: "key-point", tw: "bg-key-point", hex: "#ab9d44" },
];

const keyColorVariations: { label: string; tw: string; hex: string }[] = [
  { label: "key-primary-0", tw: "bg-key-primary-0", hex: "#e2f1f2" },
  { label: "key-primary-100", tw: "bg-key-primary-100", hex: "#287f83" },
  { label: "key-secondary-0", tw: "bg-key-secondary-0", hex: "#f5edf0" },
  { label: "key-secondary-50", tw: "bg-key-secondary-50", hex: "#e5d1d9" },
  { label: "key-point-0", tw: "bg-key-point-0", hex: "#f3f1e1" },
  { label: "key-point-50", tw: "bg-key-point-50", hex: "#e7e4c4" },
  { label: "key-point-100", tw: "bg-key-point-100", hex: "#6a6103" },
];

const subColors: { label: string; tw: string; hex: string }[] = [
  { label: "sub-saturday", tw: "bg-sub-saturday", hex: "#2e7df6" },
  { label: "sub-sunday", tw: "bg-sub-sunday", hex: "#ff6f36" },
  { label: "sub-error", tw: "bg-sub-error", hex: "#ff4668" },
];

const labelColors: { label: string; tw: string; hex: string }[] = [
  { label: "label-strong", tw: "bg-label-strong", hex: "#000000" },
  { label: "label-normal", tw: "bg-label-normal", hex: "#171719" },
  { label: "label-alternative", tw: "bg-label-alternative", hex: "rgba(55,56,60,0.61)" },
  { label: "background-alternative", tw: "bg-background-alternative", hex: "#f7f7f8" },
  { label: "line-normal", tw: "bg-line-normal", hex: "rgba(112,115,124,0.22)" },
];

const semanticColors: { label: string; tw: string; hex: string }[] = [
  { label: "background", tw: "bg-background", hex: "→ gray-0" },
  { label: "foreground", tw: "bg-foreground", hex: "→ gray-700" },
  { label: "muted", tw: "bg-muted", hex: "→ gray-50" },
  { label: "muted-foreground", tw: "bg-muted-foreground", hex: "→ gray-400" },
  { label: "border", tw: "bg-border", hex: "→ gray-100" },
  { label: "primary", tw: "bg-primary", hex: "→ gray-700" },
  { label: "primary-foreground", tw: "bg-primary-foreground", hex: "→ gray-0" },
  { label: "destructive", tw: "bg-destructive", hex: "#ff4242" },
  { label: "destructive-foreground", tw: "bg-destructive-foreground", hex: "→ gray-0" },
  { label: "accent", tw: "bg-accent", hex: "→ gray-50" },
  { label: "accent-foreground", tw: "bg-accent-foreground", hex: "→ gray-700" },
];

const ColorSwatch = ({ label, tw, hex }: { label: string; tw: string; hex: string }) => (
  <div className="flex flex-col gap-1.5">
    <div className={`h-14 w-full rounded-lg border border-gray-100 ${tw}`} />
    <div>
      <p className="caption1 text-foreground">{label}</p>
      <p className="caption2 text-muted-foreground">{hex}</p>
    </div>
  </div>
);

export const Color: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <section>
        <h2 className="subhead1 text-foreground mb-4">Gray Scale</h2>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          {grayScale.map((color) => (
            <ColorSwatch key={color.label} {...color} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="subhead1 text-foreground mb-4">Gray Scale — Opacity</h2>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          {grayOpacity.map((color) => (
            <ColorSwatch key={color.label} {...color} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="subhead1 text-foreground mb-4">Key Color</h2>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          {keyColors.map((color) => (
            <ColorSwatch key={color.label} {...color} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="subhead1 text-foreground mb-4">Key Color Variation</h2>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          {keyColorVariations.map((color) => (
            <ColorSwatch key={color.label} {...color} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="subhead1 text-foreground mb-4">Sub Color</h2>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          {subColors.map((color) => (
            <ColorSwatch key={color.label} {...color} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="subhead1 text-foreground mb-4">Label / UI</h2>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          {labelColors.map((color) => (
            <ColorSwatch key={color.label} {...color} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="subhead1 text-foreground mb-4">Semantic (shadcn/ui)</h2>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          {semanticColors.map((color) => (
            <ColorSwatch key={color.label} {...color} />
          ))}
        </div>
      </section>
    </div>
  ),
};

// ─── Typography ──────────────────────────────────────────────────────────────

const pretendardTokens: { cls: string; size: string; weight: string; usage: string }[] = [
  { cls: "title1", size: "1.75rem", weight: "700", usage: "Title/Title1" },
  { cls: "title2", size: "1.625rem", weight: "700", usage: "Title/Title2" },
  { cls: "title3", size: "1.5rem", weight: "700", usage: "Title/Title3" },
  { cls: "title4", size: "1.375rem", weight: "700", usage: "Title/Title4" },
  { cls: "head1", size: "1.25rem", weight: "700 / -0.04em", usage: "head/head1" },
  { cls: "head2", size: "1.25rem", weight: "700", usage: "head/head2" },
  { cls: "head3", size: "1.25rem", weight: "600", usage: "head/head3" },
  { cls: "head4", size: "1.125rem", weight: "700", usage: "head/head4" },
  { cls: "subhead1", size: "1.125rem", weight: "600", usage: "subhead/subhead1" },
  { cls: "subhead2", size: "1.125rem", weight: "500", usage: "subhead/subhead2" },
  { cls: "subhead3", size: "1rem", weight: "700", usage: "subhead/subhead3" },
  { cls: "subhead4", size: "1rem", weight: "600", usage: "subhead/subhead4" },
  { cls: "subhead5", size: "0.875rem", weight: "700", usage: "subhead/subhead5" },
  { cls: "body1", size: "1rem", weight: "500", usage: "body/body1" },
  { cls: "body2", size: "0.875rem", weight: "600", usage: "body/body2" },
  { cls: "body3", size: "0.875rem", weight: "500", usage: "body/body3" },
  { cls: "body4", size: "0.875rem", weight: "400", usage: "body/body4" },
  { cls: "caption1", size: "0.75rem", weight: "600", usage: "caption/caption1" },
  { cls: "caption2", size: "0.75rem", weight: "500", usage: "caption/caption2" },
  { cls: "caption3", size: "0.75rem", weight: "400", usage: "caption/caption3" },
];

const pointTokens: { cls: string; size: string; weight: string; font: string; usage: string }[] = [
  {
    cls: "point1",
    size: "1.5rem",
    weight: "700",
    font: "GT Pressura Trial",
    usage: "point/point1",
  },
  {
    cls: "point2",
    size: "1.125rem",
    weight: "700",
    font: "GT Pressura Trial",
    usage: "point/point2",
  },
  {
    cls: "point3",
    size: "1rem",
    weight: "700",
    font: "GT Pressura Trial",
    usage: "point/point3",
  },
  {
    cls: "point4",
    size: "0.625rem",
    weight: "400",
    font: "GT Pressura Trial",
    usage: "point/point4",
  },
  {
    cls: "point-eng",
    size: "1.25rem",
    weight: "700",
    font: "Milling Trial",
    usage: "point/point_eng",
  },
];

const SAMPLE_TEXT = "책 속 한 문장이 오늘의 하루를 바꾼다";
const POINT_SAMPLE_TEXT = "1234567890@";

const TypographyRow = ({
  cls,
  size,
  weight,
  usage,
  sampleText = SAMPLE_TEXT,
}: {
  cls: string;
  size: string;
  weight: string;
  usage: string;
  sampleText?: string;
}) => (
  <div className="flex items-baseline gap-6 border-b border-border py-4 last:border-0">
    <div className="w-28 shrink-0">
      <p className="caption1 text-muted-foreground">.{cls}</p>
      <p className="caption2 text-muted-foreground">
        {size} / {weight}
      </p>
      <p className="caption2 text-muted-foreground">{usage}</p>
    </div>
    <p className={`${cls} text-foreground`}>{sampleText}</p>
  </div>
);

export const Typography: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <section>
        <h2 className="subhead1 text-foreground mb-1">Pretendard</h2>
        <p className="caption2 text-muted-foreground mb-4">
          title · head · subhead · body · caption
        </p>
        <div>
          {pretendardTokens.map((token) => (
            <TypographyRow key={token.cls} {...token} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="subhead1 text-foreground mb-1">GT Pressura Trial / Milling Trial</h2>
        <p className="caption2 text-muted-foreground mb-4">point — 숫자·영문 강조용 보조 서체</p>
        <div>
          {pointTokens.map((token) => (
            <TypographyRow
              key={token.cls}
              cls={token.cls}
              size={token.size}
              weight={`${token.weight} · ${token.font}`}
              usage={token.usage}
              sampleText={POINT_SAMPLE_TEXT}
            />
          ))}
        </div>
      </section>
    </div>
  ),
};
