"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"

export default function CheckoutPage() {
  const { user, loading } = useAuth()
  const { items, clearCart } = useCart()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  // Protect page
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth")
    }
  }, [loading, user, router])

  if (loading || !user) return null

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

const handlePlaceOrder = async () => {
  const clientOrderId = crypto.randomUUID()

  if (items.length === 0) return

  setSubmitting(true)

  try {
    const res = await fetch("/api/orders/create", {
      method: "POST",
      credentials:"include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        items,
        clientOrderId,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || "Order failed")
    }

    clearCart()
    router.push("/dashboard")

  } catch (err) {
    console.error("Checkout failed", err)
    alert("Something went wrong while placing order")
  } finally {
    setSubmitting(false)
  }
}


  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.title} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <hr />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <Button
              className="w-full"
              onClick={handlePlaceOrder}
              disabled={submitting}
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
