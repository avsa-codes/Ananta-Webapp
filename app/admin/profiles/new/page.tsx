"use client"

import { useState } from "react"

export default function AddProfilePage() {
  const [type, setType] = useState("artisan")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [image, setImage] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const res = await fetch("/api/admin/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        type,
        description,
        location,
        image,
        is_active: isActive,
      }),
    })

    setLoading(false)

    if (!res.ok) {
      alert("Failed to create profile")
      return
    }

    alert("Profile created successfully")
    setName("")
    setDescription("")
    setLocation("")
    setImage("")
  }

  return (
    <div className="max-w-2xl p-8">
      <h1 className="text-2xl font-semibold mb-6">Add Profile (Admin)</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Profile Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="artisan">Artisan</option>
            <option value="ngo">NGO</option>
            <option value="culture">Culture</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Image URL</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <span className="text-sm">Active</span>
        </div>

        <button
          disabled={loading}
          className="bg-red-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Saving..." : "Create Profile"}
        </button>
      </form>
    </div>
  )
}
