"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { GalleryImage } from "@/lib/gallery-data"

type Props = {
  images: GalleryImage[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ images, index, onClose, onNavigate }: Props) {
  const [visible, setVisible] = useState(false)
  const image = images[index]

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + images.length) % images.length)
  }, [index, images.length, onNavigate])

  const goNext = useCallback(() => {
    onNavigate((index + 1) % images.length)
  }, [index, images.length, onNavigate])

  const handleClose = useCallback(() => {
    setVisible(false)
    // Wait for the closing transition before unmounting.
    window.setTimeout(onClose, 200)
  }, [onClose])

  // Trigger the enter animation on mount.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setVisible(true))
    return () => window.cancelAnimationFrame(id)
  }, [])

  // Keyboard navigation.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose()
      else if (event.key === "ArrowLeft") goPrev()
      else if (event.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [handleClose, goPrev, goNext])

  // Lock background scroll while open.
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  if (!image) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${image.title}, ${image.category}`}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={handleClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/80 backdrop-blur-sm"
      />

      <button
        type="button"
        onClick={handleClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={goNext}
        aria-label="Next image"
        className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <figure
        className={`relative z-[1] flex max-h-full w-full max-w-5xl flex-col items-center transition-all duration-300 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        </div>
        <figcaption className="mt-4 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">{image.category}</p>
          <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">{image.title}</h2>
          <p className="mt-1 text-sm text-white/50">
            {index + 1} / {images.length}
          </p>
        </figcaption>
      </figure>
    </div>
  )
}
