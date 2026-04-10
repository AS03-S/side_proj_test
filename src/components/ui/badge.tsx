import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium border transition-colors",
  {
    variants: {
      variant: {
        default: "bg-transparent text-[#020086] border-[rgba(2,0,134,0.3)]",
        urgent: "bg-[#57e4d7] text-[#020086] border-[#57e4d7]",
        high: "bg-amber-50 text-amber-700 border-amber-200",
        normal: "bg-[rgba(87,228,215,0.15)] text-[#020086] border-[rgba(87,228,215,0.4)]",
        success: "bg-[rgba(87,228,215,0.2)] text-[#020086] border-[rgba(87,228,215,0.4)]",
        muted: "bg-neutral-50 text-neutral-500 border-neutral-200",
        outline: "bg-transparent text-[#020086] border-[#020086]",
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
