"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"



export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
const router = useRouter()


const handleSubmit = async () => {
  setError(null)
  setLoading(true)

  try {
    
    if (mode === "register") {
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      name
    }
  }
})

  if (error) throw error

  const user = data.user

  if (user) {
    const { error: insertError } = await supabase
      .from("users")
      .insert({
        id: user.id,       // SAME id as auth.users
        email: user.email,
        name: name,
      })

    if (insertError) {
      console.error("Failed to insert user profile", insertError)
    }
    router.push("/")

  }
}
 else {
      const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
})

if (error) throw error

router.push("/")


      if (error) throw error
    }
  } catch (err: any) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}


  

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold">
              {mode === "login" ? "Welcome Back" : "Create an Account"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {mode === "login"
                ? "Sign in to continue exploring cultural treasures"
                : "Join Ananta and support artisans worldwide"}
            </p>
          </div>

          <div className="space-y-4">
            {mode === "register" && (
  <Input
    placeholder="Full Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
)}

<Input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<Input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

          </div>
          {error && (
  <p className="text-sm text-red-500 text-center">
    {error}
  </p>
)}


          <Button
  className="w-full"
  onClick={handleSubmit}
  disabled={loading}
>
  {loading
    ? "Please wait..."
    : mode === "login"
    ? "Sign In"
    : "Create Account"}
</Button>


          <p className="text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setMode("register")}
                  className="text-primary font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-primary font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </p>

          <div className="text-center">
            <Link href="/" className="text-xs text-muted-foreground">
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
