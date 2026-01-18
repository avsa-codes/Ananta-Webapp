"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Filter, Search, MapPin, Star, Eye, ShoppingCart, Sparkles, Heart, ArrowLeft } from "lucide-react"
import { SwipeDiscovery } from "@/components/swipe-discovery"
import { ProductFilters } from "@/components/product-filters"
import Link from "next/link"
import { supabase } from '@/lib/supabaseClient'

type MarketplaceProduct = {
  id: string
  title: string
  price: number
  images: string[]
  artisan: {
    name: string
  } | null
}


export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<"swipe" | "grid">("swipe")
  const [showFilters, setShowFilters] = useState(false)
  const [products, setProducts] = useState<MarketplaceProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          title,
          price,
          images,
          artisan:profiles!fk_artisan ( name )
        `)
        .eq("is_active", true)

      if (!error && data) {
        const normalized = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          images: p.images,
          artisan: p.artisan
            ? Array.isArray(p.artisan)
              ? p.artisan[0] ?? null
              : p.artisan
            : null
        }))

        setProducts(normalized)
      }

      setLoading(false)
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-2xl font-serif font-bold text-foreground">Ananta</span>
            </Link>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search crafts, regions, artisans..." className="pl-10 bg-muted/50" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant={viewMode === "swipe" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("swipe")}
            >
              Swipe Mode
            </Button>
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              Grid View
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </nav>

      {/* Filters Panel */}
      {showFilters && (
        <div className="border-b border-border bg-muted/30 p-4">
          <ProductFilters />
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {viewMode === "swipe" ? (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Discover Cultural Treasures</h1>
              <p className="text-muted-foreground">
                Swipe right to love, left to pass. Find your perfect cultural piece.
              </p>
            </div>
            {loading ? (
  <p>Loading products...</p>
) : (
  <SwipeDiscovery products={products} />
)}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Cultural Marketplace</h1>
                <p className="text-muted-foreground">
                  Discover authentic handcrafted treasures from artisans worldwide
                </p>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                2,847 Products Available
              </Badge>
            </div>

            {loading ? (
  <p>Loading products...</p>
) : (
  <ProductGrid products={products} />
)}

          </div>
        )}
      </main>
    </div>
  )
}

function ProductGrid({ products }: { products: MarketplaceProduct[] }) {
  if (products.length === 0) {
    return <p>No products available.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link href={`/product/${product.id}`}>
        <Card
          key={product.id}
          className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          <div className="relative">
            <img
              src={product.images?.[0] || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <CardContent className="p-4">
            <h3 className="font-serif font-semibold text-lg mb-1 line-clamp-1">
              {product.title}
            </h3>

            <p className="text-sm text-muted-foreground mb-3">
              by {product.artisan?.name ?? "—"}
            </p>

            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-lg">₹{product.price}</span>
            </div>

            <Button className="w-full" size="sm">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </CardContent>
        </Card>
        </Link>
      ))}
    </div>
  )
}

