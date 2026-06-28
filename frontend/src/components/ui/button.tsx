import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    
    const variants = {
      default: "bg-[var(--color-primary)] text-white hover:opacity-90 shadow-sm",
      destructive: "bg-[var(--color-destructive)] text-white hover:opacity-90 shadow-sm",
      outline: "border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-muted)] text-[var(--color-foreground)]",
      secondary: "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:opacity-90 shadow-sm",
      ghost: "hover:bg-[var(--color-muted)] text-[var(--color-foreground)]",
      link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    }
    
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
