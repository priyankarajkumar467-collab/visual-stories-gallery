"use client"

import { categories } from "@/lib/gallery-data"
import { cn } from "@/lib/utils"

type Props = {
  active: string
  onChange: (category: string) => void
}

export function CategoryFilter({ active, onChange }: Props) {
  return (
    <nav aria-label="Filter images by category" className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {categories.map((category) => {
        const isActive = active === category
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {category}
          </button>
        )
      })}
    </nav>
  )
}
