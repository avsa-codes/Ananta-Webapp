"use client"

import { useState } from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, MapPin, Star, Award, Users, Heart, Eye, Sparkles } from "lucide-react"
import Link from "next/link"
import { RegionMap } from "@/components/region-map"

export default function ArtisansPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"map" | "grid">("map")
  const [artisans, setArtisans] = useState<any[]>([])
  const [ngos, setNgos] = useState<any[]>([])
  const [cultures, setCultures] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const filteredArtisans = selectedRegion
    ? artisans.filter((artisan) => artisan.region.includes(selectedRegion))
    : artisans

  useEffect(() => {
  fetch("/api/admin/profiles")
    .then(res => res.json())
    .then(data => {
      const profiles = data.profiles || []

      setArtisans(profiles.filter((p: any) => p.type === "artisan"))
      setNgos(profiles.filter((p: any) => p.type === "ngo"))
      setCultures(profiles.filter((p: any) => p.type === "culture"))

      setLoading(false)
    })
}, [])

if (loading) {
  return <p className="p-8">Loading artisans...</p>
}


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
              <Input placeholder="Search artisans, crafts, regions..." className="pl-10 bg-muted/50" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant={viewMode === "map" ? "default" : "outline"} size="sm" onClick={() => setViewMode("map")}>
              Map View
            </Button>
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              Grid View
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="artisans" className="w-full">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Artisans, NGOs & Cultures</h1>
              <p className="text-muted-foreground">
                Meet the talented artisans and organizations preserving cultural heritage
              </p>
            </div>
            <TabsList className="flex gap-2">
  <TabsTrigger value="artisans">Artisans</TabsTrigger>
  <TabsTrigger value="ngos">NGOs</TabsTrigger>
  <TabsTrigger value="cultures">Cultures</TabsTrigger>
</TabsList>

          </div>

          <TabsContent value="artisans">
            {viewMode === "map" ? (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <RegionMap artisans={artisans} selectedRegion={selectedRegion} onRegionSelect={setSelectedRegion} />
                </div>
                <div className="space-y-4">
                  <h3 className="font-serif font-semibold text-xl">
                    {selectedRegion ? `Artisans in ${selectedRegion}` : "All Artisans"}
                  </h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {filteredArtisans.map((artisan) => (
                      <ArtisanCard key={artisan.id} artisan={artisan} compact />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artisans.map((artisan) => (
                  <ArtisanCard key={artisan.id} artisan={artisan} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ngos">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ngos.map((ngo) => (
                <NGOCard key={ngo.id} ngo={ngo} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="cultures">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {cultures.map(culture => (
      <Card key={culture.id}>
         <img
          src={culture.image || "/placeholder.svg"}
          alt={culture.name}
          className="w-full h-48 object-cover"
        />
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg">{culture.name}</h3>
          <p className="text-sm text-muted-foreground">
            {culture.location ?? "—"}
          </p>
          <p className="text-sm mt-2 line-clamp-3">
            {culture.description}
          </p>
          <Link href={`/profile/${culture.id}`}>
  <Button className="w-full mt-4" size="sm">
    View Culture
  </Button>
</Link>

        </CardContent>
      </Card>
    ))}
  </div>
</TabsContent>

        </Tabs>
      </main>
    </div>
  )
}

function ArtisanCard({ artisan, compact = false }: { artisan: any; compact?: boolean }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={artisan.image || "/placeholder.svg"}
          alt={artisan.name}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            compact ? "h-32" : "h-48"
          }`}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
              <Eye className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className={compact ? "p-4" : "p-6"}>
        <div className="flex flex-wrap gap-1 mb-3">
  {(artisan.badges || [])
    .slice(0, compact ? 1 : 3)
    .map((badge: string) => (
      <Badge key={badge} variant="outline" className="text-xs">
        {badge}
      </Badge>
    ))}
</div>


        <h3 className={`font-serif font-semibold mb-1 ${compact ? "text-base" : "text-lg"}`}>{artisan.name}</h3>

        <p className={`text-muted-foreground mb-2 ${compact ? "text-xs" : "text-sm"}`}>{artisan.speciality}</p>

        <div className={`flex items-center text-muted-foreground mb-3 ${compact ? "text-xs" : "text-sm"}`}>
          <MapPin className="w-3 h-3 mr-1" />
          {artisan.region}
        </div>

        {!compact && <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{artisan.story}</p>}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className={`font-medium ${compact ? "text-xs" : "text-sm"}`}>{artisan.rating}</span>
            <span className={`text-muted-foreground ${compact ? "text-xs" : "text-sm"}`}>({artisan.reviews})</span>
          </div>
          <div className={`text-muted-foreground ${compact ? "text-xs" : "text-sm"}`}>{artisan.experience}</div>
        </div>

        {!compact && (
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-primary">{artisan.impact.womenEmpowered}</div>
              <div className="text-xs text-muted-foreground">Women Empowered</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-primary">{artisan.products}</div>
              <div className="text-xs text-muted-foreground">Products</div>
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <Link href={`/profile/${artisan.id}`}>
  <Button className="flex-1" size={compact ? "sm" : "default"}>
    View Profile
  </Button>
</Link>

          <Button variant="outline" size={compact ? "sm" : "default"}>
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function NGOCard({ ngo }: { ngo: any }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={ngo.image || "/placeholder.svg"}
          alt={ngo.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-secondary text-secondary-foreground">
            <Award className="w-3 h-3 mr-1" />
            NGO Partner
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex flex-wrap gap-1 mb-3">
         {(ngo.badges || []).map((badge: string) => (
  <Badge key={badge} variant="outline" className="text-xs">
    {badge}
  </Badge>
))}

        </div>

        <h3 className="font-serif font-semibold text-lg mb-1">{ngo.name}</h3>

        <p className="text-sm text-muted-foreground mb-2">{ngo.focus}</p>

        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="w-3 h-3 mr-1" />
          {ngo.region}
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{ngo.mission}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{ngo.rating}</span>
            <span className="text-sm text-muted-foreground">({ngo.reviews})</span>
          </div>
          <div className="text-sm text-muted-foreground">Est. {ngo.established}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-primary">
  {ngo.impact?.artisansSupported ?? "—"}
</div>

            <div className="text-xs text-muted-foreground">Artisans Supported</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-primary">{ngo.artisans}</div>
            <div className="text-xs text-muted-foreground">Active Artisans</div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Link href={`/profile/${ngo.id}`}>
  <Button className="flex-1">View Profile</Button>
</Link>

          <Button variant="outline">
            <Users className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
