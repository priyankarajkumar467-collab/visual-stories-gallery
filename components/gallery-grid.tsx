"use client"

import Image from "next/image"
import type { GalleryImage } from "@/lib/gallery-data"

type Props = {
  images: GalleryImage[]
  onSelect: (index: number) => void
}

export function GalleryGrid({ images, onSelect }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {images.map((image, index) => (
        <li key={image.id}>
          <button
            type="button"
            onClick={() => onSelect(index)}
            className="group relative block aspect-[3/2] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`View ${image.title}, ${image.category}`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-xs font-medium uppercase tracking-wider text-white/70">{image.category}</p>
              <h3 className="text-lg font-semibold text-white">{image.title}</h3>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}
