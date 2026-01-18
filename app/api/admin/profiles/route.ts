import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      name,
      type,
      description,
      location,
      image,
      is_active = true,
    } = body

    // Basic validation
    if (!name || !type) {
      return NextResponse.json(
        { error: "Name and type are required" },
        { status: 400 }
      )
    }

    // type safety
    if (!["artisan", "ngo", "culture"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid profile type" },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from("profiles")
      .insert({
        name,
        type,
        description,
        location,
        image,
        is_active,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ profile: data })
  } catch (err) {
    console.error("Create profile failed", err)
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    // 🔹 If ID is provided → fetch single profile
    if (id) {
      const { data, error } = await supabaseServer
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single()

      if (error || !data) {
        return NextResponse.json(
          { profile: null },
          { status: 404 }
        )
      }

      return NextResponse.json({ profile: data })
    }

    // 🔹 Otherwise → fetch all profiles
    const { data, error } = await supabaseServer
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ profiles: data })
  } catch (err) {
    console.error("Fetch profiles failed", err)
    return NextResponse.json(
      { error: "Failed to fetch profiles" },
      { status: 500 }
    )
  }
}


