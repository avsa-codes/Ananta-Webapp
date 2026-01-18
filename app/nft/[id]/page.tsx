"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Heart, Share2, Eye, Clock, Crown, ExternalLink, Copy } from "lucide-react"
import Link from "next/link"

export default function NFTDetailPage({ params }: { params: { id: string } }) {
  const [bidAmount, setBidAmount] = useState("")
  const [isLiked, setIsLiked] = useState(false)

  // Mock NFT data - in real app, fetch based on params.id
  const nft = {
    id: 1,
    title: "Madhubani Digital Masterpiece",
    description:
      "A stunning digital interpretation of traditional Madhubani art, featuring intricate patterns and vibrant colors that tell the story of rural Bihar's rich cultural heritage. This piece represents the fusion of ancient artistic traditions with modern digital techniques, preserving cultural narratives for future generations.",
    artist: {
      name: "Sita Devi",
      avatar: "/indian-female-artist-traditional.jpg",
      verified: true,
      followers: 2340,
      bio: "Master artist specializing in traditional Madhubani paintings with 30+ years of experience",
    },
    owner: {
      name: "Rajesh Kumar",
      avatar: "/indian-male-collector-modern.jpg",
      address: "0x742d35Cc6634C0532925a3b8D404d3aABF5F2681",
    },
    price: "2.5 ETH",
    usdPrice: "$4,200",
    highestBid: "2.3 ETH",
    image: "/madhubani-digital-nft-colorful-traditional.jpg",
    category: "Digital Art",
    rarity: "Legendary",
    likes: 234,
    views: 1520,
    timeLeft: "2d 14h 32m",
    isAuction: true,
    contractAddress: "0x742d35Cc6634C0532925a3b8D404d3aABF5F2681",
    tokenId: "1001",
    blockchain: "Ethereum",
    royalties: "10%",
    created: "March 15, 2024",
    properties: [
      { trait: "Style", value: "Traditional Madhubani", rarity: "15%" },
      { trait: "Color Palette", value: "Vibrant Multi-color", rarity: "8%" },
      { trait: "Complexity", value: "Master Level", rarity: "3%" },
      { trait: "Cultural Region", value: "Bihar", rarity: "12%" },
    ],
    history: [
      { event: "Listed", price: "2.5 ETH", from: "Rajesh Kumar", to: "Market", date: "2 days ago" },
      { event: "Bid", price: "2.3 ETH", from: "Priya Sharma", to: "Auction", date: "1 day ago" },
      { event: "Bid", price: "2.1 ETH", from: "Arjun Patel", to: "Auction", date: "1 day ago" },
      { event: "Transfer", price: "2.0 ETH", from: "Sita Devi", to: "Rajesh Kumar", date: "1 week ago" },
      { event: "Minted", price: "—", from: "—", to: "Sita Devi", date: "2 weeks ago" },
    ],
  }

  const relatedNFTs = [
    {
      id: 2,
      title: "Warli Tribal Art NFT",
      price: "1.2 ETH",
      image: "/warli-tribal-art-nft-traditional.jpg",
    },
    {
      id: 3,
      title: "Pattachitra Digital Art",
      price: "1.8 ETH",
      image: "/pattachitra-digital-art-nft.jpg",
    },
    {
      id: 4,
      title: "Kalamkari Heritage NFT",
      price: "1.5 ETH",
      image: "/kalamkari-heritage-nft-traditional.jpg",
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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/nft-gallery" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Gallery</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on OpenSea
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* NFT Image */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={nft.image || "/placeholder.svg"}
                  alt={nft.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`${getRarityColor(nft.rarity)} text-white`}>{nft.rarity}</Badge>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {nft.properties.map((property, index) => (
                    <div key={index} className="bg-muted/50 rounded-lg p-3 text-center">
                      <div className="text-sm text-muted-foreground mb-1">{property.trait}</div>
                      <div className="font-semibold">{property.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{property.rarity} have this trait</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* NFT Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">{nft.category}</Badge>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Eye className="w-4 h-4 mr-1" />
                  {nft.views} views
                </div>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Heart className="w-4 h-4 mr-1" />
                  {nft.likes} likes
                </div>
              </div>
              <h1 className="text-3xl font-serif font-bold mb-4">{nft.title}</h1>
              <p className="text-muted-foreground leading-relaxed">{nft.description}</p>
            </div>

            {/* Artist & Owner */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground mb-2">Created by</div>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={nft.artist.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{nft.artist.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold">{nft.artist.name}</span>
                        {nft.artist.verified && <Crown className="w-4 h-4 text-accent" />}
                      </div>
                      <div className="text-sm text-muted-foreground">{nft.artist.followers} followers</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground mb-2">Owned by</div>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={nft.owner.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{nft.owner.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{nft.owner.name}</div>
                      <div className="text-sm text-muted-foreground font-mono">
                        {nft.owner.address.slice(0, 6)}...{nft.owner.address.slice(-4)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Auction/Price Info */}
            <Card>
              <CardContent className="p-6">
                {nft.isAuction ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Current bid</div>
                        <div className="text-2xl font-bold text-primary">{nft.highestBid}</div>
                        <div className="text-muted-foreground">{nft.usdPrice}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Auction ends in</div>
                        <div className="text-xl font-bold text-red-500 flex items-center">
                          <Clock className="w-5 h-5 mr-1" />
                          {nft.timeLeft}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Enter bid amount (ETH)"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                        />
                        <Button>Place Bid</Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Minimum bid: {Number.parseFloat(nft.highestBid) + 0.1} ETH
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <div className="text-sm text-muted-foreground">Price</div>
                      <div className="text-2xl font-bold text-primary">{nft.price}</div>
                      <div className="text-muted-foreground">{nft.usdPrice}</div>
                    </div>
                    <Button className="w-full" size="lg">
                      Buy Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Details */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="related">Related</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contract Address</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm">
                            {nft.contractAddress.slice(0, 6)}...{nft.contractAddress.slice(-4)}
                          </span>
                          <Button size="sm" variant="ghost">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Token ID</span>
                        <span className="font-semibold">{nft.tokenId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Blockchain</span>
                        <span className="font-semibold">{nft.blockchain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Creator Royalties</span>
                        <span className="font-semibold">{nft.royalties}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created</span>
                        <span className="font-semibold">{nft.created}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {nft.history.map((event, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <Badge
                              variant={
                                event.event === "Sale"
                                  ? "default"
                                  : event.event === "Bid"
                                    ? "secondary"
                                    : event.event === "Transfer"
                                      ? "outline"
                                      : "destructive"
                              }
                            >
                              {event.event}
                            </Badge>
                            <div>
                              <div className="font-medium text-sm">
                                {event.from} → {event.to}
                              </div>
                              <div className="text-muted-foreground text-xs">{event.date}</div>
                            </div>
                          </div>
                          <div className="font-bold text-primary text-sm">{event.price}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="related" className="mt-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {relatedNFTs.map((relatedNFT) => (
                    <Card key={relatedNFT.id} className="group hover:shadow-lg transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <img
                          src={relatedNFT.image || "/placeholder.svg"}
                          alt={relatedNFT.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-sm mb-2">{relatedNFT.title}</h4>
                        <div className="font-bold text-primary text-sm">{relatedNFT.price}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
