"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Heart, Share2, Star, MapPin, Users, Award, Play, Eye, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function ArtisanProfilePage({ params }: { params: { id: string } }) {
  const [isFollowing, setIsFollowing] = useState(false)

  // Mock artisan data - in real app, fetch based on params.id
  const artisan = {
    id: 1,
    name: "Meera Devi",
    speciality: "Banarasi Silk Weaving",
    region: "Varanasi, Uttar Pradesh",
    experience: "25 years",
    rating: 4.9,
    reviews: 127,
    followers: 1240,
    image: "/indian-woman-artisan-weaver-traditional.jpg",
    coverImage: "/banarasi-weaving-workshop-traditional-loom.jpg",
    story:
      "Meera Devi has been weaving Banarasi sarees for over two decades, learning the craft from her grandmother who was also a master weaver. She leads a collective of 15 women weavers in her village, providing them with steady income and preserving the ancient art of silk weaving. Her work has been featured in international exhibitions and she has trained over 50 young women in the traditional techniques.",
    mission:
      "To preserve the 500-year-old tradition of Banarasi weaving while empowering women in rural communities through sustainable livelihood opportunities.",
    badges: ["Master Craftsperson", "Women Empowerment Leader", "Heritage Keeper", "UNESCO Recognition"],
    impact: {
      womenEmpowered: 15,
      productsCreated: 450,
      incomeGenerated: "₹12L",
      yearsActive: 25,
      apprenticesTrained: 50,
      awardsReceived: 8,
    },
    skills: ["Silk Weaving", "Zari Work", "Pattern Design", "Loom Setup", "Quality Control"],
    achievements: [
      "UNESCO Intangible Cultural Heritage Recognition",
      "National Award for Master Craftsperson",
      "Featured in Smithsonian Museum Exhibition",
      "Government of India Shilp Guru Award",
    ],
    products: [
      {
        id: 1,
        name: "Golden Brocade Banarasi Saree",
        price: "₹15,000",
        image: "/beautiful-banarasi-silk-saree-golden-threads.jpg",
        rating: 4.9,
      },
      {
        id: 2,
        name: "Traditional Wedding Saree",
        price: "₹22,000",
        image: "/banarasi-wedding-saree-red-gold-traditional.jpg",
        rating: 4.8,
      },
      {
        id: 3,
        name: "Silk Dupatta Set",
        price: "₹8,500",
        image: "/banarasi-silk-dupatta-golden-border.jpg",
        rating: 4.7,
      },
    ],
    videos: [
      {
        id: 1,
        title: "The Art of Banarasi Weaving",
        duration: "5:32",
        thumbnail: "/banarasi-weaving-process-video-thumbnail.jpg",
      },
      {
        id: 2,
        title: "Meera's Story: From Tradition to Innovation",
        duration: "8:15",
        thumbnail: "/meera-story-video-thumbnail.jpg",
      },
    ],
    testimonials: [
      {
        name: "Priya Sharma",
        text: "The saree I bought from Meera is absolutely stunning. The craftsmanship is exceptional!",
        rating: 5,
      },
      {
        name: "Sarah Johnson",
        text: "Supporting Meera's work feels meaningful. The quality and story behind each piece is incredible.",
        rating: 5,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/artisans" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Artisans</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share Profile
            </Button>
            <Button
              variant={isFollowing ? "secondary" : "default"}
              size="sm"
              onClick={() => setIsFollowing(!isFollowing)}
            >
              <Heart className={`w-4 h-4 mr-2 ${isFollowing ? "fill-current" : ""}`} />
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-64 overflow-hidden">
        <img
          src={artisan.coverImage || "/placeholder.svg"}
          alt="Artisan workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex flex-wrap gap-2 mb-3">
            {artisan.badges.map((badge) => (
              <Badge key={badge} className="bg-white/20 text-white border-white/30">
                {badge}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-serif font-bold mb-2">{artisan.name}</h1>
          <p className="text-lg opacity-90">{artisan.speciality}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="story" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="story">Story</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="impact">Impact</TabsTrigger>
              </TabsList>

              <TabsContent value="story" className="mt-8">
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-serif font-semibold text-xl mb-4">Artisan Story</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">{artisan.story}</p>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Mission</h4>
                        <p className="text-muted-foreground">{artisan.mission}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-serif font-semibold text-xl mb-4">Skills & Expertise</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {artisan.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <h4 className="font-semibold mb-3">Achievements</h4>
                      <ul className="space-y-2">
                        {artisan.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Award className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="products" className="mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {artisan.products.map((product) => (
                    <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                              <ShoppingCart className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">{product.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary">{product.price}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-accent text-accent" />
                            <span className="text-sm">{product.rating}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="videos" className="mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {artisan.videos.map((video) => (
                    <Card key={video.id} className="group hover:shadow-lg transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Button size="lg" className="rounded-full w-16 h-16">
                            <Play className="w-6 h-6" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                          {video.duration}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{video.title}</h4>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="impact" className="mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-serif font-semibold text-xl mb-4">Impact Metrics</h3>
                      <div className="space-y-4">
                        {Object.entries(artisan.impact).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center py-2 border-b border-border">
                            <span className="capitalize text-muted-foreground">{key.replace(/([A-Z])/g, " $1")}</span>
                            <span className="font-semibold text-primary">{value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-serif font-semibold text-xl mb-4">Customer Testimonials</h3>
                      <div className="space-y-4">
                        {artisan.testimonials.map((testimonial, index) => (
                          <div key={index} className="bg-muted/50 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                              <div className="flex">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                                ))}
                              </div>
                              <span className="ml-2 font-medium text-sm">{testimonial.name}</span>
                            </div>
                            <p className="text-muted-foreground text-sm">{testimonial.text}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <img
                  src={artisan.image || "/placeholder.svg"}
                  alt={artisan.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-serif font-semibold text-xl mb-2">{artisan.name}</h3>
                <p className="text-muted-foreground mb-4">{artisan.speciality}</p>
                <div className="flex items-center justify-center text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {artisan.region}
                </div>
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="text-center">
                    <div className="font-semibold text-primary">{artisan.followers}</div>
                    <div className="text-xs text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-primary">{artisan.products.length}</div>
                    <div className="text-xs text-muted-foreground">Products</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-1 mb-4">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-medium">{artisan.rating}</span>
                  <span className="text-muted-foreground">({artisan.reviews} reviews)</span>
                </div>
                <Button
                  className="w-full"
                  variant={isFollowing ? "secondary" : "default"}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFollowing ? "fill-current" : ""}`} />
                  {isFollowing ? "Following" : "Follow Artisan"}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Quick Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium">{artisan.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Products Created</span>
                    <span className="font-medium">{artisan.impact.productsCreated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Women Empowered</span>
                    <span className="font-medium">{artisan.impact.womenEmpowered}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Awards</span>
                    <span className="font-medium">{artisan.impact.awardsReceived}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    Visit Workshop
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Interview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
