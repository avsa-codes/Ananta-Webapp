"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import ArtisanProfile from "@/components/profiles/ArtisanProfile"
import NGOProfile from "@/components/profiles/NGOProfile"
import CultureProfile from "@/components/profiles/CultureProfile"

export default function ProfilePage() {
  const { id } = useParams()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/profiles")
      .then(res => res.json())
      .then(data => {
        const found = data.profiles?.find((p: any) => p.id === id)
        setProfile(found || null)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <p className="p-8">Loading profile...</p>
  }

  if (!profile) {
    return <p className="p-8 text-red-600">Profile not found</p>
  }

  switch (profile.type) {
    case "artisan":
      return <ArtisanProfile profile={profile} />

    case "ngo":
      return <NGOProfile profile={profile} />

    case "culture":
      return <CultureProfile profile={profile} />

    default:
      return <p className="p-8">Unknown profile type</p>
  }
}
