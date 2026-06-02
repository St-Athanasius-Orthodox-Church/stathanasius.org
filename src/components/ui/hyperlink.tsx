import type * as React from "react"

import Link from 'next/link'

import { cn } from "@/lib/utils"

interface HyperlinkProps
  extends Omit<React.ComponentProps<typeof Link>, "className"> {
  className?: string
}

function Hyperlink({
  className,
  ...props
}: HyperlinkProps) {
  return (
    <Link
      className={cn(
        "text-burgundy underline underline-offset-2 hover:text-burgundy-dark p-0 h-auto",
        className
      )}
      {...props}
    />
  )
}

export { Hyperlink }

