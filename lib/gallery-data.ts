export type Category = "Nature" | "Travel" | "Architecture" | "Animals"

export type GalleryImage = {
  id: string
  src: string
  title: string
  category: Category
}

export const categories: Array<"All" | Category> = ["All", "Nature", "Travel", "Architecture", "Animals"]

export const images: GalleryImage[] = [
  { id: "nature-1", src: "/gallery/nature-1.png", title: "Whispering Pines", category: "Nature" },
  { id: "nature-2", src: "/gallery/nature-2.png", title: "Alpine Mirror", category: "Nature" },
  { id: "nature-3", src: "/gallery/nature-3.png", title: "Emerald Falls", category: "Nature" },
  { id: "travel-1", src: "/gallery/travel-1.png", title: "Aegean Sunset", category: "Travel" },
  { id: "travel-2", src: "/gallery/travel-2.png", title: "Tokyo After Rain", category: "Travel" },
  { id: "travel-3", src: "/gallery/travel-3.png", title: "Cappadocia Dawn", category: "Travel" },
  { id: "architecture-1", src: "/gallery/architecture-1.png", title: "Glass & Sky", category: "Architecture" },
  { id: "architecture-2", src: "/gallery/architecture-2.png", title: "The Spiral", category: "Architecture" },
  { id: "architecture-3", src: "/gallery/architecture-3.png", title: "Sacred Arches", category: "Architecture" },
  { id: "animals-1", src: "/gallery/animals-1.png", title: "Winter Fox", category: "Animals" },
  { id: "animals-2", src: "/gallery/animals-2.png", title: "Gentle Giant", category: "Animals" },
  { id: "animals-3", src: "/gallery/animals-3.png", title: "Rainforest Jewel", category: "Animals" },
]
