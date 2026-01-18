import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Heart, Globe, Users, Sparkles, Star, MapPin } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-secondary/10" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary text-primary-foreground border-primary">
              🎨 Cultural Heritage Marketplace
            </Badge>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 text-balance">
              Preserve Culture.
              <br />
              <span className="text-primary">Empower Artisans.</span>
              <br />
              Own a Story.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Connect with authentic cultural treasures from NGOs and artisans worldwide. Every purchase preserves
              heritage and empowers communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Start Exploring
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Watch Stories
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Cultural Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-accent" />
          </div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "1s" }}>
          <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
            <Globe className="w-6 h-6 text-secondary" />
          </div>
        </div>
        <div className="absolute bottom-20 left-1/4 animate-float" style={{ animationDelay: "2s" }}>
          <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
            <Users className="w-7 h-7 text-primary" />
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Three Pillars of Ananta</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform is built on three foundational principles that drive cultural preservation and artisan
              empowerment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4">Shop</h3>
                <p className="text-muted-foreground mb-6">
                  Discover authentic handcrafted treasures from artisans across the globe. Each piece tells a story of
                  heritage and tradition.
                </p>
                <Button
                  variant="outline"
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                >
                  Explore Marketplace
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                  <Sparkles className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4">Experience</h3>
                <p className="text-muted-foreground mb-6">
                  Immerse yourself in cultural stories through gamified experiences, treasure hunts, and interactive
                  heritage journeys.
                </p>
                <Button
                  variant="outline"
                  className="group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors bg-transparent"
                >
                  Start Journey
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4">Preserve</h3>
                <p className="text-muted-foreground mb-6">
                  Own digital heritage cards and NFTs that preserve cultural stories for future generations while
                  supporting artisan communities.
                </p>
                <Button
                  variant="outline"
                  className="group-hover:bg-accent group-hover:text-accent-foreground transition-colors bg-transparent"
                >
                  View Collection
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cultural Festival Highlight */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Badge className="mb-4 bg-primary text-primary-foreground">🎊 Festival Special</Badge>
                <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Diwali Specials Live Now!</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Celebrate the festival of lights with exclusive handcrafted diyas, rangoli art, and traditional
                  textiles from artisans across India.
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Shop Festival Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card rounded-xl p-4 border border-border/50">
                    <div className="w-full h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg mb-3 flex items-center justify-center">
                      <Star className="w-8 h-8 text-accent" />
                    </div>
                    <p className="text-sm font-medium">Handcrafted Diyas</p>
                  </div>
                  <div className="bg-card rounded-xl p-4 border border-border/50">
                    <div className="w-full h-32 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg mb-3 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-secondary" />
                    </div>
                    <p className="text-sm font-medium">Rangoli Art</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Counter */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Our Global Impact</h2>
            <p className="text-lg text-muted-foreground">
              Together, we're preserving culture and empowering communities worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-2">2,847</div>
              <p className="text-muted-foreground">Artisans Supported</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-secondary mb-2">156</div>
              <p className="text-muted-foreground">NGOs Partnered</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-accent mb-2">₹12.5L</div>
              <p className="text-muted-foreground">Funds Raised</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-2">45</div>
              <p className="text-muted-foreground">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-2xl font-serif font-bold">Ananta</span>
              </div>
              <p className="text-muted-foreground">
                Preserving culture, empowering artisans, and connecting communities worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Marketplace</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/marketplace" className="hover:text-primary transition-colors">
                    Browse All
                  </Link>
                </li>
                <li>
                  <Link href="/textiles" className="hover:text-primary transition-colors">
                    Textiles
                  </Link>
                </li>
                <li>
                  <Link href="/pottery" className="hover:text-primary transition-colors">
                    Pottery
                  </Link>
                </li>
                <li>
                  <Link href="/paintings" className="hover:text-primary transition-colors">
                    Paintings
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Experience</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/treasure-hunt" className="hover:text-primary transition-colors">
                    Treasure Hunt
                  </Link>
                </li>
                <li>
                  <Link href="/passport" className="hover:text-primary transition-colors">
                    Heritage Passport
                  </Link>
                </li>
                <li>
                  <Link href="/stories" className="hover:text-primary transition-colors">
                    Artisan Stories
                  </Link>
                </li>
                <li>
                  <Link href="/festivals" className="hover:text-primary transition-colors">
                    Festivals
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/impact" className="hover:text-primary transition-colors">
                    Our Impact
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="hover:text-primary transition-colors">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Ananta. Preserving culture, one story at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
