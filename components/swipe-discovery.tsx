"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, X, Star, MapPin, Sparkles, Eye, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
type SwipeProduct = {
  id: string
  title: string
  price: number
  images: string[]
  artisan: {
    name: string
  } | null
}




export function SwipeDiscovery({
  products,
}: {
  products: SwipeProduct[]
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const router = useRouter()


const currentProduct = products[currentIndex]
if (!currentProduct) {
  return (
    <div className="text-center text-muted-foreground">
      No more products to discover ✨
    </div>
  )
}



  const handleSwipe = (direction: "left" | "right") => {
    if (isAnimating) return

    setIsAnimating(true)

    // Animate card out
    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(${direction === "right" ? "100%" : "-100%"}) rotate(${direction === "right" ? "15deg" : "-15deg"})`
      cardRef.current.style.opacity = "0"
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
      setIsAnimating(false)
      setShowDetails(false)

      // Reset card position
      if (cardRef.current) {
        cardRef.current.style.transform = "translateX(0) rotate(0)"
        cardRef.current.style.opacity = "1"
      }
    }, 300)
  }

  if (!currentProduct) return null

return (
  <div className="relative">
    {/* Swipe Card */}
    <div className="relative h-[600px] perspective-1000">
      <Card
        ref={cardRef}
        className="absolute inset-0 transition-all duration-300 ease-out cursor-grab active:cursor-grabbing overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative h-full">
        <img
  src={currentProduct.images?.[0] || "/placeholder.svg"}
  alt={currentProduct.title}
  className="w-full h-2/3 object-cover cursor-pointer"
  onClick={() => router.push(`/product/${currentProduct.id}`)}
/>

          {/* Product Info */}
          <CardContent className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent p-6">
            <h2 className="font-serif font-bold text-xl mb-1">
              {currentProduct.title}
            </h2>

            <p className="text-muted-foreground mb-2">
              by {currentProduct.artisan?.name ?? "—"}
            </p>

            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-2xl text-primary">
                ₹{currentProduct.price}
              </span>
Link
              <Button
  variant="outline"
  size="sm"
  onClick={(e) => {
    e.stopPropagation()
    router.push(`/product/${currentProduct.id}`)
  }}
>
  <Eye className="w-4 h-4 mr-2" />
  View Details
</Button>

            </div>

            {/* Expandable Details (Safe Placeholder) */}
            {showDetails && (
              <div className="bg-muted/50 rounded-lg p-4 mb-4 animate-in slide-in-from-bottom-2">
                <p className="text-sm text-muted-foreground">
                  Authentic handcrafted product created by skilled artisans.
                </p>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </div>

    {/* Action Buttons */}
    <div className="flex justify-center space-x-6 mt-8">
      <Button
        variant="outline"
        size="lg"
        className="w-16 h-16 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
        onClick={() => handleSwipe("left")}
        disabled={isAnimating}
      >
        <X className="w-6 h-6" />
      </Button>

      <Button
        size="lg"
        className="px-8 bg-primary hover:bg-primary/90"
        disabled={isAnimating}
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Add to Cart
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="w-16 h-16 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
        onClick={() => handleSwipe("right")}
        disabled={isAnimating}
      >
        <Heart className="w-6 h-6" />
      </Button>
    </div>

    {/* Progress Indicator */}
    <div className="flex justify-center space-x-2 mt-6">
      {products.map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-colors ${
            index === currentIndex ? "bg-primary" : "bg-muted"
          }`}
        />
      ))}
    </div>

    {/* Instructions */}
    <div className="text-center mt-6 text-sm text-muted-foreground">
      <p>Swipe right to love ❤️ • Swipe left to pass ✕</p>
    </div>
  </div>
)

}
