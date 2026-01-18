"use client"

import ProfileLayout from "@/components/profiles/ProfileLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users } from "lucide-react"

type NGOProfileProps = {
  profile: any
}

export default function NGOProfile({ profile }: NGOProfileProps) {
  return (
    <ProfileLayout profile={profile}>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-serif font-semibold mb-4">
                About the NGO
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {profile.description}
              </p>
            </CardContent>
          </Card>

          {profile.focus_areas?.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Focus Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.focus_areas.map((area: string) => (
                    <Badge key={area} variant="secondary">
                      {area}
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
            <CardContent className="p-6 text-center">
              <div className="flex justify-center items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">
                  {profile.rating ?? "—"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {profile.rating_count
                  ? `${profile.rating_count} reviews`
                  : "No ratings yet"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Artisans Supported
                </span>
                <span className="font-semibold">
                  {profile.artisans_supported ?? "—"}
                </span>
              </div>

              {profile.years_active && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Years Active
                  </span>
                  <span className="font-semibold">
                    {profile.years_active}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProfileLayout>
  )
}
