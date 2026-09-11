"use client"

import { useMemo, useState } from "react"
import { images as allImages } from "@/lib/gallery-data"
import { GalleryHeader } from "@/components/gallery-header"
import { CategoryFilter } from "@/components/category-filter"
import { GalleryGrid } from "@/components/gallery-grid"
import { Lightbox } from "@/components/lightbox"

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return allImages
    return allImages.filter((image) => image.category === activeCategory)
  }, [activeCategory])

  function handleCategoryChange(category: string) {
    setActiveCategory(category)
    setLightboxIndex(null)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <GalleryHeader />

      <div className="mt-10 sm:mt-12">
        <CategoryFilter active={activeCategory} onChange={handleCategoryChange} />
      </div>

      <div className="mt-8 sm:mt-10">
        <GalleryGrid images={filteredImages} onSelect={setLightboxIndex} />
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </main>
  )
}
