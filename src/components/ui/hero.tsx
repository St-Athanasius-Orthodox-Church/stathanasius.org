const heroUrl = '/assets/hero.jpg'
import type * as React from "react"

import { GoldSeparator } from "@/components/ui/gold-separator"
import { cn } from "@/lib/utils"

const sizeClasses = {
  full: "h-[600px] md:h-[700px]",
  medium: "h-[200px] md:h-[250px]",
  fullPage: "min-h-[calc(100vh-200px)] py-16",
}

const gradientStyles = {
  light:
    "linear-gradient(to bottom, rgba(30, 58, 95, 0.5), rgba(30, 58, 95, 0.7))",
  normal:
    "linear-gradient(to bottom, rgba(30, 58, 95, 0.6), rgba(30, 58, 95, 0.8))",
  dark: "linear-gradient(to bottom, rgba(30, 58, 95, 0.7), rgba(30, 58, 95, 0.85))",
}

const titleSizeClasses = {
  full: "text-4xl md:text-6xl lg:text-7xl",
  medium: "text-4xl md:text-5xl lg:text-6xl",
  fullPage: "text-4xl md:text-5xl lg:text-6xl",
}

const subtitleSizeClasses = {
  full: "text-2xl md:text-2xl lg:text-4xl",
  medium: "mt-4 text-xl md:text-2xl",
  fullPage: "mt-4 text-xl md:text-2xl",
}

type HeroProps = {
  /** Size preset for the hero section */
  size?: "full" | "medium" | "fullPage"
  /** Title text (for structured content mode) */
  title?: string
  /** Subtitle text (for structured content mode) */
  subtitle?: string
  /** Action buttons (for structured content mode) */
  actions?: React.ReactNode
  /** Custom content (for custom content mode, e.g. forms) */
  children?: React.ReactNode
  /** Gradient overlay intensity */
  gradientIntensity?: "light" | "normal" | "dark"
  /** Background image URL */
  backgroundImage?: string
  /** Whether to show the gold separator at the bottom */
  showBottomBorder?: boolean
  /** Additional CSS classes */
  className?: string
}

function Hero({
  size = "medium",
  title,
  subtitle,
  actions,
  children,
  gradientIntensity = "normal",
  backgroundImage = heroUrl,
  showBottomBorder = true,
  className,
}: HeroProps) {
  const hasStructuredContent = title || subtitle || actions

  return (
    <section
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden",
        sizeClasses[size],
        className,
      )}
    >
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="St. Athanasius Orthodox Church"
        className="absolute top-0 left-0 h-full w-full object-cover"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute top-0 left-0 h-full w-full"
        style={{ background: gradientStyles[gradientIntensity] }}
      />

      {/* Content */}
      {hasStructuredContent ? (
        <div className="z-10 container mx-auto flex flex-col px-4 text-center">
          {title && (
            <h1
              className={cn(
                "font-cinzel font-semibold text-white drop-shadow-lg",
                titleSizeClasses[size],
              )}
            >
              {title}
            </h1>
          )}
          {subtitle && (
            <p
              className={cn(
                "mx-auto max-w-3xl leading-relaxed text-gray-100",
                subtitleSizeClasses[size],
              )}
            >
              {subtitle}
            </p>
          )}
          {actions && (
            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              {actions}
            </div>
          )}
        </div>
      ) : children ? (
        <div className="z-10 w-full max-w-md px-4">
          {children}
        </div>
      ) : null}

      {/* Decorative bottom border */}
      {showBottomBorder && (
        <GoldSeparator className="absolute right-0 bottom-0 left-0" />
      )}
    </section>
  )
}

export { Hero }
export type { HeroProps }
