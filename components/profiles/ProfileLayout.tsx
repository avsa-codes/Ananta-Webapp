"use client"

import { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Share2, Heart } from "lucide-react"

type ProfileLayoutProps = {
  profile: any
  children: ReactNode
}

export default function ProfileLayout({ profile, children }: ProfileLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={profile.image || "/placeholder.svg"}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-background rounded-xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="capitalize">
                {profile.type}
              </Badge>
            </div>

            <h1 className="text-3xl font-serif font-bold">
              {profile.name}
            </h1>

            <div className="flex items-center gap-4 mt-2 text-muted-foreground">
              {profile.location && (
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </div>
              )}

              {profile.rating && (
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {profile.rating}
                  {profile.rating_count && (
                    <span className="text-xs text-muted-foreground">
                      ({profile.rating_count})
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button>
              <Heart className="w-4 h-4 mr-2" />
              Follow
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        {children}
      </div>
    </div>
  )
}
