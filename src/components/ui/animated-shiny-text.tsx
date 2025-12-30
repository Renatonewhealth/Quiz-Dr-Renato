import { ComponentPropsWithoutRef, CSSProperties, FC } from "react"

import { cn } from "@/lib/utils"

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "inline-block",
        
        // Shine effect
        "animate-shiny-text",
        "bg-clip-text text-transparent",
        "bg-no-repeat",
        "[background-size:var(--shiny-width)_100%]",
        "[background-position:calc(-100%_-_var(--shiny-width))_0]",

        // Shine gradient - usando as cores do projeto
        "bg-gradient-to-r from-gray-700 via-[#667eea] via-50% to-gray-700",

        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

