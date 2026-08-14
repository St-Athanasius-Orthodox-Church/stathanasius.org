"use client"

import type * as React from "react"

import { type VariantProps } from "class-variance-authority"
import { Slot as SlotPrimitive } from "radix-ui"

import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? SlotPrimitive.Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
