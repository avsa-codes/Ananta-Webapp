import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"


export const metadata: Metadata = {
  title: "Ananta - Global Cultural Marketplace",
  description:
    "Preserve Culture. Empower Artisans. Own a Story. Connect with authentic cultural treasures from NGOs and artisans worldwide.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
  <CartProvider>
    <Navigation />
    <Suspense fallback={null}>{children}</Suspense>
    <Footer />
  </CartProvider>
  </AuthProvider>
  <Analytics />
</body>
    </html>
  )
}
