import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium border transition-colors",
  {
    variants: {
      variant: {
        default: "bg-transparent text-neutral-700 border-neutral-300",
        urgent: "bg-danger/10 text-danger border-danger/30",
        high: "bg-warning/10 text-warning border-warning/30",
        normal: "bg-navy-light text-navy border-navy-light",
        success: "bg-success/10 text-success border-success/30",
        muted: "bg-neutral-50 text-neutral-500 border-neutral-200",
        outline: "bg-transparent text-navy border-navy",
        info: "bg-info/10 text-info border-info/30",
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
