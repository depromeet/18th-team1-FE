"use client";

import { Checkbox as CheckboxPrimitive } from "radix-ui";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/lib/utils";
import { IcCheck } from "@/shared/ui/icons";

type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

/**
 * 체크박스 컴포넌트
 *
 * @example
 * <Checkbox />
 * <Checkbox defaultChecked />
 * <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
 * <Checkbox disabled />
 */
export const Checkbox = ({ className, ...props }: CheckboxProps): React.ReactElement => {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "group relative flex size-5 shrink-0 items-center justify-center rounded-[4px] outline-none transition-colors",
        "bg-gray-50 data-[state=checked]:bg-key-secondary2",
        "focus-visible:ring-2 focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <IcCheck
        size={20}
        className="text-gray-200 transition-colors group-data-[state=checked]:text-key-secondary"
      />
    </CheckboxPrimitive.Root>
  );
};
