"use client"

import { useEffect, useState } from "react"

type Profile = {
  id: string
  name: string
  type: "artisan" | "ngo" | "culture"
  description: string | null
  location: string | null
  is_active: boolean
  created_at: string
}


export default function AdminProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const [filter, setFilter] = useState<"all" | "artisan" | "ngo" | "culture">("all")



  useEffect(() => {
    fetch("/api/admin/profiles")
      .then(res => res.json())
      .then(data => {
        setProfiles(data.profiles || [])
        setLoading(false)
      })
  }, [])

  useEffect(() => {
  if (selectedProfile) {
    console.log("Currently selected:", selectedProfile)
  }
}, [selectedProfile])

const filteredProfiles =
  filter === "all"
    ? profiles
    : profiles.filter(p => p.type === filter)


  if (loading) return <p>Loading profiles...</p>



  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">All Profiles</h1>
      <div className="flex gap-2 mb-4">
  {["all", "artisan", "ngo", "culture"].map(type => (
    <button
      key={type}
      onClick={() => setFilter(type as any)}
      className={`px-3 py-1 rounded border text-sm ${
        filter === type ? "bg-black text-white" : "bg-white"
      }`}
    >
      {type.toUpperCase()}
    </button>
  ))}
</div>


      <div className="space-y-2">
        {filteredProfiles.map(profile => (
         <div
  key={profile.id}
  className="border rounded p-3 flex justify-between cursor-pointer hover:bg-muted transition"
  onClick={() => {
    setSelectedProfile(profile)
    console.log("Selected profile:", profile)
  }}
>

            <div>
              <p className="font-medium">{profile.name}</p>
              <p className="text-sm text-muted-foreground">
                {profile.type} • {profile.location || "No location"}
              </p>
            </div>

            <span className={profile.is_active ? "text-green-600" : "text-red-600"}>
              {profile.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        ))}
      </div>
      {/*Details Modal*/}
      {selectedProfile && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-lg w-full max-w-lg p-6 relative">
      
      {/* Close button */}
      <button
        onClick={() => setSelectedProfile(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold mb-1">
  {selectedProfile.name}
</h2>

<p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">
  {selectedProfile.type}
</p>

<div className="space-y-3 text-sm">
  {selectedProfile.description && (
    <div>
      <p className="font-medium">Description</p>
      <p className="text-muted-foreground">
        {selectedProfile.description}
      </p>
    </div>
  )}

  <div>
    <p className="font-medium">Location</p>
    <p className="text-muted-foreground">
      {selectedProfile.location || "—"}
    </p>
  </div>

  <div>
    <p className="font-medium">Status</p>
    <p className={selectedProfile.is_active ? "text-green-600" : "text-red-600"}>
      {selectedProfile.is_active ? "Active" : "Inactive"}
    </p>
  </div>

  <div>
    <p className="font-medium">Created</p>
    <p className="text-muted-foreground">
      {new Date(selectedProfile.created_at).toLocaleDateString()}
    </p>
  </div>
</div>

    </div>
  </div>
)}

    </div>
  )
}
