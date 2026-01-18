"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Home, Search, Users, Gamepad2, Palette, User, Menu, ShoppingCart, Heart, Bell } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"







export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

 const { user, profile, loading, signOut } = useAuth()


console.log("AUTH USER:", user)
  const { items } = useCart()
  
  const totalItems = items.reduce(
  (sum, item) => sum + item.quantity,
  0
)

  console.log("CART ITEMS:", items)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/marketplace", label: "Marketplace", icon: Search },
    { href: "/artisans", label: "Artisans", icon: Users },
    // { href: "/cultural-zone", label: "Cultural Zone", icon: Gamepad2 },
    // { href: "/nft-gallery", label: "NFT Gallery", icon: Palette },
    // { href: "/dashboard", label: "Dashboard", icon: User },
  ]


  if (loading) {
  return (
    <header className="h-16 border-b bg-background" />
  )
}



  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="font-serif font-bold text-xl">Ananta</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
  {navItems.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      <item.icon className="w-4 h-4" />
      <span>{item.label}</span>
    </Link>
  ))}

  {user && (
    <Link
      href="/dashboard"
      className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      <User className="w-4 h-4" />
      <span>Dashboard</span>
    </Link>
  )}
</nav>


          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">3</Badge>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
  <ShoppingCart className="w-4 h-4" />
  {items.length > 0 && (
    <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
      {totalItems}
    </Badge>
  )}
</Button>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">5</Badge>
            </Button>
        {user ? (
  <div className="flex items-center gap-3">
    <span className="text-sm font-medium">
      {profile?.name ?? user?.email}

    </span>

    <Button variant="outline" size="sm" onClick={signOut}>
      Logout
    </Button>
  </div>
) : (
  <Link href="/auth">
    <Button size="sm">Sign In</Button>
  </Link>
)}





          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                {user && (
  <Link
    href="/dashboard"
    className="flex items-center space-x-3 text-lg font-medium hover:text-primary transition-colors"
    onClick={() => setIsOpen(false)}
  >
    <User className="w-5 h-5" />
    <span>Dashboard</span>
  </Link>
)}

                <div className="pt-4 border-t">
                  <div className="flex flex-col space-y-2">
                    <Button className="w-full justify-start" variant="ghost">
                      <Heart className="w-4 h-4 mr-2" />
                      Wishlist (3)
                    </Button>
                  <Button className="w-full justify-start" variant="ghost">
  <ShoppingCart className="w-4 h-4 mr-2" />
 Cart ({totalItems})

</Button>

                    <Button className="w-full justify-start" variant="ghost">
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications (5)
                    </Button>
                  </div>
                  {user ? (
  <div className="flex items-center gap-3">
    <span className="text-sm font-medium">
      {profile?.name ?? user?.email}

    </span>

    <Button variant="outline" size="sm" onClick={signOut}>
      Logout
    </Button>
  </div>
) : (
  <Link href="/auth">
    <Button size="sm">Sign In</Button>
  </Link>
)}


                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
