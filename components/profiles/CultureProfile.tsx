"use client"

import ProfileLayout from "@/components/profiles/ProfileLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from "lucide-react"

type CultureProfileProps = {
  profile: any
}

export default function CultureProfile({ profile }: CultureProfileProps) {
  return (
    <ProfileLayout profile={profile}>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-serif font-semibold mb-4">
                About the Culture
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {profile.description}
              </p>
            </CardContent>
          </Card>

          {profile.traits?.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Key Characteristics</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.traits.map((trait: string) => (
                    <Badge key={trait} variant="secondary">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{profile.location ?? "—"}</span>
              </div>

              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">
                  {profile.rating ?? "—"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {profile.rating_count ? `(${profile.rating_count})` : ""}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProfileLayout>
  )
}
