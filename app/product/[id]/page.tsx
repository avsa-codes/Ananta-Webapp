"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Heart, Share2, Star, MapPin, ShoppingCart, Sparkles, Play, Award } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"




type Product = {
  id: string
  title: string
  description: string | null
  price: number
  images: string[]
  artisan: {
    name: string
  } | null
}


export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
const { addToCart, clearCart } = useCart()
const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
  console.log("CART AFTER ADD:", localStorage.getItem("cart"))
}, [])


useEffect(() => {
  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        title,
        description,
        price,
        images,
        artisan:profiles!fk_artisan (
          name
        )
      `)
      .eq("id", params.id)
      .single()

    if (!error && data) {
      const normalizedProduct: Product = {
        id: data.id,
        title: data.title,
        description: data.description,
        price: data.price,
        images: data.images,
        artisan: Array.isArray(data.artisan)
          ? data.artisan[0] ?? null
          : data.artisan
      }

      setProduct(normalizedProduct)
    }

    setLoading(false)
  }

  fetchProduct()
}, [params.id])



if (loading) {
  return <p className="p-8">Loading product...</p>
}

if (!product) {
  return <p className="p-8">Product not found.</p>
}




 return (
  <div className="min-h-screen bg-background">
    {/* Navigation */}
    <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/marketplace" className="flex items-center space-x-2">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Marketplace</span>
        </Link>
      </div>
    </nav>

    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.images?.[selectedImage] || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
          <h1 className="text-4xl font-serif font-bold tracking-tight mb-2">
  {product.title}
</h1>

<div className="flex items-center gap-2 text-muted-foreground mb-4">
  <MapPin className="w-4 h-4" />
  <span>
    Crafted by <span className="font-medium text-foreground">
      {product.artisan?.name ?? "Independent Artisan"}
    </span>
  </span>
</div>


<div className="flex items-end gap-4 mb-6">
  <span className="text-4xl font-bold text-primary">
    ₹{product.price}
  </span>
  <Badge variant="secondary" className="mb-1">
    Handcrafted
  </Badge>
</div>


            {product.description && (
             <div className="prose prose-neutral max-w-none">
             <p>{product.description}</p>
           </div>
           
            )}
          </div>

          {/* Purchase Section */}
          <Card className="border-primary/20 bg-primary/5">
  <CardContent className="p-6 space-y-5">
    
    {/* Quantity */}
    <div className="flex items-center justify-between">
      <span className="font-medium">Quantity</span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          −
        </Button>
        <span className="w-10 text-center font-medium">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </Button>
      </div>
    </div>

    {/* Primary CTA */}
    <Button
  size="lg"
  className="w-full"
  onClick={() =>
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0],
      quantity
    })
  }
>
  <ShoppingCart className="w-5 h-5 mr-2" />
  Add to Cart
</Button>


    {/* Secondary CTA */}
    <Button
  variant="outline"
  size="lg"
  className="w-full"
  onClick={() => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0],
      quantity,
    })
    router.push("/checkout")
  }}
>
  Buy Now
</Button>



    {/* Trust Signals */}
    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
      <span>✔ Authentic</span>
      <span>✔ Secure Payment</span>
      <span>✔ Direct from Artisan</span>
    </div>

  </CardContent>
</Card>

        </div>
      </div>

      {/* MVP NOTE */}
      <div className="mt-16 text-sm text-muted-foreground">
        <p>
          ✨ More cultural stories, artisan profiles, and impact details coming soon.
        </p>
      </div>
    </div>
  </div>
)

}
