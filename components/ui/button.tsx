import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-muted hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-accent underline-offset-4 hover:underline",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_0_1px_hsl(var(--accent)/0.4)]",
        whatsapp:
          "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90",
        halo:
          "relative isolate bg-accent text-accent-foreground transition-colors duration-200 hover:bg-accent/95 before:content-[''] before:absolute before:inset-0 before:-m-2 before:rounded-full before:bg-accent before:opacity-40 before:blur-lg before:pointer-events-none before:-z-10 before:transition-all before:duration-300 before:ease-out hover:before:opacity-70 hover:before:blur-xl hover:before:-m-3",
        whatsappHalo:
          "relative isolate bg-whatsapp text-whatsapp-foreground transition-colors duration-200 hover:bg-whatsapp/95 before:content-[''] before:absolute before:inset-0 before:-m-2 before:rounded-full before:bg-whatsapp before:opacity-40 before:blur-lg before:pointer-events-none before:-z-10 before:transition-all before:duration-300 before:ease-out hover:before:opacity-70 hover:before:blur-xl hover:before:-m-3",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-6 text-base",
        xl: "h-14 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
