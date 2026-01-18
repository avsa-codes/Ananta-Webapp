"use client"

import ProfileLayout from "@/components/profiles/ProfileLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

type ArtisanProfileProps = {
  profile: any
}

export default function ArtisanProfile({ profile }: ArtisanProfileProps) {
  return (
    <ProfileLayout profile={profile}>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-serif font-semibold mb-4">
                Artisan Story
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {profile.description}
              </p>
            </CardContent>
          </Card>

          {profile.skills?.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
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

          {profile.experience && (
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Experience</h4>
                <p className="text-muted-foreground">
                  {profile.experience}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProfileLayout>
  )
}
