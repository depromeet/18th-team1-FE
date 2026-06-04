import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/shared/lib/utils";

type TypographyVariant =
  | "title1"
  | "title1-2"
  | "title2"
  | "head0"
  | "head1"
  | "head2"
  | "head3"
  | "subhead1"
  | "subhead2"
  | "subhead3"
  | "subhead4"
  | "subhead5"
  | "subhead6"
  | "body1"
  | "body2-1"
  | "body2"
  | "body3"
  | "caption1"
  | "caption2"
  | "point1"
  | "point1-2"
  | "point2"
  | "point3";

type ColorToken =
  | "gray-0"
  | "gray-50"
  | "gray-100"
  | "gray-200"
  | "gray-300"
  | "gray-400"
  | "gray-500"
  | "gray-600"
  | "gray-700"
  | "gray-700-50"
  | "key-primary"
  | "key-secondary"
  | "key-secondary2"
  | "key-primary-0"
  | "key-primary-100"
  | "key-secondary-0"
  | "key-secondary-100"
  | "key-secondary2-0"
  | "sub-saturday"
  | "sub-sunday";

type TextOwnProps<T extends ElementType> = {
  as?: T;
  variant?: TypographyVariant;
  color?: ColorToken;
};

type TextProps<T extends ElementType = "p"> = TextOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T> | "color">;

/**
 * 디자인 시스템 토큰을 조합하는 텍스트 컴포넌트
 *
 * @example
 * // 기본 (p 태그, body1, gray-700)
 * <Text>오늘의 기록</Text>
 *
 * // variant, color 지정
 * <Text variant="title1" color="key-primary">책 문장 일기</Text>
 *
 * // 시맨틱 태그 변경
 * <Text as="span" variant="caption2" color="gray-100">보조 텍스트</Text>
 */
export const Text = <T extends ElementType = "p">({
  as,
  variant = "body1",
  color = "gray-700",
  className,
  ...props
}: TextProps<T>) => {
  const Component = (as ?? "p") as ElementType;
  return <Component className={cn(variant, color && `text-${color}`, className)} {...props} />;
};
