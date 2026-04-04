import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium border transition-colors",
  {
    variants: {
      variant: {
        default: "bg-neutral-100 text-neutral-700 border-neutral-200",
        urgent: "bg-red-50 text-red-700 border-red-200",
        high: "bg-amber-50 text-amber-700 border-amber-200",
        normal: "bg-sky-50 text-sky-700 border-sky-200",
        success: "bg-emerald-50 text-emerald-700 border-emerald-200",
        muted: "bg-neutral-50 text-neutral-500 border-neutral-200",
        outline: "bg-transparent text-neutral-700 border-neutral-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
