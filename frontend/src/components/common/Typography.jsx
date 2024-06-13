import * as React from "react";
import { cva } from "class-variance-authority";

const textVariants = cva("", {
  variants: {
    variant: {
      title:
        "font-archivo text-heading_sm font-bold tracking-tight md:text-heading leading-[1.1]",
      title2:
        "font-archivo text-heading3_sm font-bold tracking-tight md:text-heading3 leading-[1.2]",
      heading:
        "font-raleway text-[16px] font-extrabold tracking-widest underline decoration-2 underline-offset-[4px]",
      subheading:
        "font-archivo text-heading2_sm md:text-heading2 font-semibold tracking-tight leading-[1.2]",
      body: "font-raleway text-[16px] leading-relaxed font-medium md:text-[18px]",
      body2: "font-raleway text-[14px] font-medium md:text-[16px]",
      caption: "text-sm",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

const Typography = React.forwardRef(
  ({ className, variant, displayAs = "p", ...props }, ref) => {
    const Tag = displayAs;
    return (
      <Tag
        className={textVariants({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Typography.displayName = "Typography";

export { Typography, textVariants };
