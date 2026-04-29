import * as React from "react"
import { Pressable, type PressableProps } from "react-native"

type Variant = "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
type Size = "default" | "xs" | "sm" | "lg" | "icon"

const variantClass: Record<Variant, string> = {
  default: "bg-primary items-center justify-center",
  outline: "border border-border bg-background items-center justify-center",
  secondary: "bg-secondary items-center justify-center",
  ghost: "items-center justify-center",
  destructive: "bg-red-100 items-center justify-center",
  link: "items-center justify-center",
}

const sizeClass: Record<Size, string> = {
  default: "h-12 px-4 flex-row gap-2 rounded-lg",
  xs: "h-6 px-2 rounded-md",
  sm: "h-9 px-3 rounded-lg",
  lg: "h-14 px-6 rounded-lg",
  icon: "w-12 h-12 rounded-lg",
}

interface ButtonProps extends PressableProps {
  variant?: Variant
  size?: Size
  className?: string
}

function Button({
  variant = "default",
  size = "default",
  className,
  disabled,
  ...props
}: ButtonProps) {
  const classes = [variantClass[variant], sizeClass[size], disabled ? "opacity-50" : "", className]
    .filter(Boolean)
    .join(" ")

  return (
    <Pressable
      className={classes}
      disabled={disabled}
      {...props}
    />
  )
}

export { Button }
export type { ButtonProps }
