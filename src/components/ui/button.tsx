import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#020086] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#020086] text-white hover:bg-[#010060] active:bg-[#010050]",
        secondary: "bg-white text-[#020086] border border-[#020086] hover:bg-[rgba(2,0,134,0.05)] active:bg-[rgba(2,0,134,0.1)]",
        ghost: "text-[#020086] hover:bg-[rgba(2,0,134,0.05)] hover:text-[#020086]",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-[#020086] bg-transparent text-[#020086] hover:bg-[rgba(2,0,134,0.05)]",
        accent: "bg-[#57e4d7] text-[#020086] hover:bg-[#3ecfc3] active:bg-[#2bbfb3] font-semibold",
        link: "text-[#020086] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-7 px-3 text-xs",
        lg: "h-11 px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
