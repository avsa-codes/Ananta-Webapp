"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import type { User } from "@supabase/supabase-js"

type Profile = {
  id: string
  email: string
  name: string
  location?: string | null
}

type AuthContextType = {
  user: User | null          // auth user
  profile: Profile | null    // app user
  loading: boolean
  signOut: () => Promise<void>
}


const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)


useEffect(() => {
  const loadSession = async () => {
    const { data } = await supabase.auth.getSession()
    const authUser = data.session?.user ?? null
    setUser(authUser)

    if (authUser) {
      const { data: profileData } = await supabase
        .from("users")
        .select("id, email, name")
        .eq("id", authUser.id)
        .single()

      setProfile(profileData ?? null)
    } else {
      setProfile(null)
    }

    setLoading(false)
  }

  loadSession()

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (_event, session) => {
    const authUser = session?.user ?? null
    setUser(authUser)

    if (authUser) {
      const { data: profileData } = await supabase
        .from("users")
        .select("id, email, name")
        .eq("id", authUser.id)
        .single()

      setProfile(profileData ?? null)
    } else {
      setProfile(null)
    }
  })

  return () => subscription.unsubscribe()
}, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>

      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}
