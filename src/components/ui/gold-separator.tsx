import type * as React from "react"

import { cn } from "@/lib/utils"

type GoldSeparatorProps = React.ComponentProps<"div"> & {
  variant?: "full" | "centered"
}

function GoldSeparator({
  className,
  variant = "centered",
  ...props
}: GoldSeparatorProps) {
  return (
    <div
      data-slot="gold-separator"
      className={cn("h-1", className)}
      style={{
        background:
          variant === "full"
            ? "linear-gradient(90deg, var(--orthodox-gold-dark), var(--orthodox-gold), var(--orthodox-gold-dark))"
            : "linear-gradient(90deg, transparent, var(--orthodox-gold), transparent)",
      }}
      {...props}
    />
  )
}

export { GoldSeparator }
