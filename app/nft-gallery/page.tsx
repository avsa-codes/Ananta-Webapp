"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  Share2,
  Eye,
  Zap,
  Crown,
  Palette,
  Music,
  Camera,
  Sparkles,
  Search,
  TrendingUp,
  Clock,
} from "lucide-react"

export default function NFTGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", name: "All Collections", icon: Sparkles },
    { id: "art", name: "Digital Art", icon: Palette },
    { id: "music", name: "Cultural Music", icon: Music },
    { id: "photography", name: "Heritage Photos", icon: Camera },
    { id: "rare", name: "Rare Artifacts", icon: Crown },
  ]

  const featuredNFTs = [
    {
      id: 1,
      title: "Madhubani Digital Masterpiece",
      artist: "Sita Devi",
      price: "2.5 ETH",
      usdPrice: "$4,200",
      image: "/madhubani-digital-nft-colorful-traditional.jpg",
      category: "art",
      rarity: "Legendary",
      likes: 234,
      views: 1520,
      timeLeft: "2d 14h",
      isAuction: true,
      description:
        "A stunning digital interpretation of traditional Madhubani art, featuring intricate patterns and vibrant colors that tell the story of rural Bihar's rich cultural heritage.",
    },
    {
      id: 2,
      title: "Tanjore Painting NFT",
      artist: "Ravi Kumar",
      price: "1.8 ETH",
      usdPrice: "$3,024",
      image: "/tanjore-painting-digital-nft-gold-traditional.jpg",
      category: "art",
      rarity: "Epic",
      likes: 189,
      views: 987,
      timeLeft: "5d 8h",
      isAuction: true,
      description:
        "Digital recreation of classical Tanjore painting with gold leaf effects, depicting Lord Krishna in traditional South Indian artistic style.",
    },
    {
      id: 3,
      title: "Rajasthani Folk Music Collection",
      artist: "Manganiyar Collective",
      price: "0.75 ETH",
      usdPrice: "$1,260",
      image: "/rajasthani-folk-music-nft-instruments.jpg",
      category: "music",
      rarity: "Rare",
      likes: 156,
      views: 743,
      timeLeft: "1d 22h",
      isAuction: false,
      description:
        "Exclusive collection of traditional Rajasthani folk songs recorded by master musicians from the Thar Desert.",
    },
    {
      id: 4,
      title: "Hampi Heritage Photography",
      artist: "Arjun Menon",
      price: "1.2 ETH",
      usdPrice: "$2,016",
      image: "/hampi-heritage-photography-nft-ruins.jpg",
      category: "photography",
      rarity: "Epic",
      likes: 298,
      views: 1834,
      timeLeft: "3d 16h",
      isAuction: true,
      description:
        "Breathtaking photography series capturing the architectural marvels of Hampi's ancient Vijayanagara Empire.",
    },
    {
      id: 5,
      title: "Ancient Indus Valley Artifact",
      artist: "Archaeological Society",
      price: "5.0 ETH",
      usdPrice: "$8,400",
      image: "/indus-valley-artifact-nft-ancient.jpg",
      category: "rare",
      rarity: "Mythic",
      likes: 445,
      views: 2156,
      timeLeft: "6d 12h",
      isAuction: true,
      description:
        "Rare digital representation of Indus Valley civilization artifacts, authenticated by leading archaeologists.",
    },
    {
      id: 6,
      title: "Bharatanatyam Dance Sequence",
      artist: "Lakshmi Priya",
      price: "0.95 ETH",
      usdPrice: "$1,596",
      image: "/bharatanatyam-dance-nft-classical.jpg",
      category: "art",
      rarity: "Rare",
      likes: 167,
      views: 892,
      timeLeft: "4d 7h",
      isAuction: false,
      description: "Animated NFT capturing the grace and beauty of classical Bharatanatyam dance movements.",
    },
  ]

  const trendingCollections = [
    {
      name: "Heritage Temples",
      items: 24,
      floorPrice: "0.5 ETH",
      volume: "45.2 ETH",
      change: "+12.5%",
      image: "/heritage-temples-collection-nft.jpg",
    },
    {
      name: "Folk Art Masters",
      items: 18,
      floorPrice: "0.8 ETH",
      volume: "32.1 ETH",
      change: "+8.3%",
      image: "/folk-art-masters-collection-nft.jpg",
    },
    {
      name: "Cultural Festivals",
      items: 36,
      floorPrice: "0.3 ETH",
      volume: "28.7 ETH",
      change: "+15.2%",
      image: "/cultural-festivals-collection-nft.jpg",
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "bg-gray-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      case "mythic":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredNFTs = featuredNFTs.filter((nft) => {
    const matchesCategory = selectedCategory === "all" || nft.category === selectedCategory
    const matchesSearch =
      nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.artist.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4">Cultural NFT Gallery</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover, collect, and own unique digital cultural artifacts that preserve India's rich heritage for
              future generations
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search NFTs, artists, or collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="featured">Featured NFTs</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNFTs.map((nft) => (
                <Card key={nft.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={nft.image || "/placeholder.svg"}
                      alt={nft.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getRarityColor(nft.rarity)} text-white`}>{nft.rarity}</Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                    {nft.isAuction && (
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {nft.timeLeft}
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-serif font-semibold text-lg mb-1">{nft.title}</h3>
                        <p className="text-muted-foreground text-sm">by {nft.artist}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{nft.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-bold text-lg text-primary">{nft.price}</div>
                        <div className="text-muted-foreground text-sm">{nft.usdPrice}</div>
                      </div>
                      <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {nft.likes}
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {nft.views}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1">{nft.isAuction ? "Place Bid" : "Buy Now"}</Button>
                      <Button variant="outline" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collections" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingCollections.map((collection, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-serif font-semibold text-xl mb-2">{collection.name}</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Items</div>
                        <div className="font-semibold">{collection.items}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Floor Price</div>
                        <div className="font-semibold">{collection.floorPrice}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Volume</div>
                        <div className="font-semibold">{collection.volume}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">24h Change</div>
                        <div className="font-semibold text-green-600">{collection.change}</div>
                      </div>
                    </div>
                    <Button className="w-full">View Collection</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Top Sales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-accent" />
                    Top Sales (24h)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredNFTs.slice(0, 5).map((nft, index) => (
                      <div
                        key={nft.id}
                        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <img
                          src={nft.image || "/placeholder.svg"}
                          alt={nft.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{nft.title}</h4>
                          <p className="text-muted-foreground text-xs">by {nft.artist}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary text-sm">{nft.price}</div>
                          <div className="text-muted-foreground text-xs">{nft.usdPrice}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Feed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-accent" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "Sale", nft: "Madhubani Digital Masterpiece", price: "2.5 ETH", time: "2 min ago" },
                      { action: "Bid", nft: "Tanjore Painting NFT", price: "1.9 ETH", time: "5 min ago" },
                      { action: "Listed", nft: "Bharatanatyam Dance Sequence", price: "0.95 ETH", time: "12 min ago" },
                      { action: "Sale", nft: "Rajasthani Folk Music", price: "0.75 ETH", time: "18 min ago" },
                      { action: "Bid", nft: "Hampi Heritage Photography", price: "1.3 ETH", time: "25 min ago" },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant={
                              activity.action === "Sale"
                                ? "default"
                                : activity.action === "Bid"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {activity.action}
                          </Badge>
                          <div>
                            <div className="font-medium text-sm">{activity.nft}</div>
                            <div className="text-muted-foreground text-xs">{activity.time}</div>
                          </div>
                        </div>
                        <div className="font-bold text-primary text-sm">{activity.price}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
