"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ComingSoon } from "@/components/coming-soon"

import {
  ShoppingBag,
  Heart,
  Trophy,
  Star,
  MapPin,
  Calendar,
  BookOpen,
  Users,
  Bell,
  Settings,
  Crown,
  Zap,
  Target,
  Award,
  Compass,
  Palette,
} from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
  if (!loading && !user) {
    router.replace("/auth")
  }
}, [loading, user, router])

  const userStats = {
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    avatar: "/indian-female-young-traditional.jpg",
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    culturalPoints: 1850,
    totalPurchases: 24,
    favoriteArtisans: 8,
    completedHunts: 15,
    badges: 12,
    joinedDate: "March 2024",
    location: "Mumbai, India",
  }

  const recentPurchases = [
    {
      id: 1,
      name: "Banarasi Silk Saree",
      artisan: "Meera Devi",
      price: "₹12,500",
      date: "2 days ago",
      image: "/beautiful-banarasi-silk-saree-golden-threads.jpg",
      status: "Delivered",
    },
    {
      id: 2,
      name: "Blue Pottery Vase",
      artisan: "Rajesh Kumar",
      price: "₹3,200",
      date: "1 week ago",
      image: "/blue-pottery-vase-jaipur-traditional-ceramic.jpg",
      status: "In Transit",
    },
    {
      id: 3,
      name: "Madhubani Painting",
      artisan: "Sita Devi",
      price: "₹5,800",
      date: "2 weeks ago",
      image: "/madhubani-painting-colorful-traditional-folk-art.jpg",
      status: "Delivered",
    },
  ]

  const favoriteArtisans = [
    {
      id: 1,
      name: "Meera Devi",
      craft: "Textile Weaving",
      location: "Varanasi, UP",
      image: "/indian-female-middle-aged-traditional.jpg",
      rating: 4.9,
      products: 23,
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      craft: "Blue Pottery",
      location: "Jaipur, Rajasthan",
      image: "/indian-male-potter-blue-pottery-traditional.jpg",
      rating: 4.8,
      products: 18,
    },
    {
      id: 3,
      name: "Sita Devi",
      craft: "Madhubani Art",
      location: "Madhubani, Bihar",
      image: "/indian-female-young-traditional.jpg",
      rating: 4.9,
      products: 31,
    },
  ]

  const culturalProgress = [
    {
      region: "North India",
      progress: 85,
      completed: 17,
      total: 20,
      color: "bg-blue-500",
    },
    {
      region: "South India",
      progress: 60,
      completed: 12,
      total: 20,
      color: "bg-green-500",
    },
    {
      region: "West India",
      progress: 75,
      completed: 15,
      total: 20,
      color: "bg-yellow-500",
    },
    {
      region: "East India",
      progress: 40,
      completed: 8,
      total: 20,
      color: "bg-purple-500",
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "Cultural Explorer",
      description: "Completed 10 treasure hunts",
      icon: Compass,
      earned: true,
      rarity: "Epic",
    },
    {
      id: 2,
      title: "Art Collector",
      description: "Purchased from 5 different artisans",
      icon: Palette,
      earned: true,
      rarity: "Rare",
    },
    {
      id: 3,
      title: "Heritage Guardian",
      description: "Supported 3 NGO projects",
      icon: Crown,
      earned: true,
      rarity: "Legendary",
    },
    {
      id: 4,
      title: "Master Learner",
      description: "Complete all regional learning paths",
      icon: BookOpen,
      earned: false,
      rarity: "Mythic",
    },
  ]

  const recommendations = [
    {
      id: 1,
      name: "Kashmiri Pashmina Shawl",
      artisan: "Ahmad Khan",
      price: "₹8,500",
      image: "/kashmiri-pashmina-shawl-soft-luxury-traditional.jpg",
      reason: "Based on your textile purchases",
      discount: "15% off",
    },
    {
      id: 2,
      name: "Warli Tribal Painting",
      artisan: "Jivya Soma Mashe",
      price: "₹4,200",
      image: "/warli-tribal-painting-traditional-art-white-brown.jpg",
      reason: "Similar to your Madhubani art",
      discount: "10% off",
    },
  ]

  const communityActivity = [
    {
      type: "review",
      user: "Amit Patel",
      action: "reviewed your favorite artisan Meera Devi",
      time: "2 hours ago",
      rating: 5,
    },
    {
      type: "follow",
      user: "Kavya Nair",
      action: "started following you",
      time: "5 hours ago",
    },
    {
      type: "achievement",
      user: "Rohit Singh",
      action: "earned the Cultural Explorer badge",
      time: "1 day ago",
    },
    {
      type: "purchase",
      user: "Sneha Gupta",
      action: "bought from your recommended artisan",
      time: "2 days ago",
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      case "mythic":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Loading dashboard...</p>
    </div>
  )
}

if (!user) return null


  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Avatar className="w-16 h-16">
              <AvatarImage src={userStats.avatar || "/placeholder.svg"} alt={userStats.name} />
              <AvatarFallback>PS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-serif font-bold">Welcome back, {profile?.name ?? user?.email}!</h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile?.location ?? "Location not set"}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Member since {userStats.joinedDate}
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Level Progress */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {userStats.level}
                </div>
                <div>
                  <h3 className="font-semibold">Level {userStats.level} Cultural Explorer</h3>
                  <p className="text-muted-foreground text-sm">
                    {userStats.xp} / {userStats.nextLevelXp} XP to next level
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-accent">{userStats.culturalPoints}</div>
                <div className="text-sm text-muted-foreground">Cultural Points</div>
              </div>
            </div>
            <Progress value={(userStats.xp / userStats.nextLevelXp) * 100} className="h-3" />
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{userStats.totalPurchases}</div>
              <div className="text-sm text-muted-foreground">Purchases</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">{userStats.favoriteArtisans}</div>
              <div className="text-sm text-muted-foreground">Favorite Artisans</div>
            </CardContent>
          </Card>
          {/* <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{userStats.completedHunts}</div>
              <div className="text-sm text-muted-foreground">Hunts Completed</div>
            </CardContent>
          </Card> */}
          <Card className="opacity-60">
  <CardContent className="p-4 text-center">
    <Target className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
    <div className="text-sm font-medium">Hunts</div>
    <div className="text-xs text-muted-foreground">Coming soon</div>
  </CardContent>
</Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{userStats.badges}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-accent" />
                    Recommended for You
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-3 rounded-lg border">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">by {item.artisan}</p>
                          <p className="text-xs text-muted-foreground">{item.reason}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="font-bold text-primary">{item.price}</span>
                            <Badge variant="secondary" className="text-xs">
                              {item.discount}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Favorite Artisans */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    Favorite Artisans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {favoriteArtisans.map((artisan) => (
                      <div key={artisan.id} className="flex items-center space-x-4 p-3 rounded-lg border">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={artisan.image || "/placeholder.svg"} alt={artisan.name} />
                          <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold">{artisan.name}</h4>
                          <p className="text-sm text-muted-foreground">{artisan.craft}</p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {artisan.location}
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {artisan.rating}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">{artisan.products}</div>
                          <div className="text-xs text-muted-foreground">products</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="purchases" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Purchases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPurchases.map((purchase) => (
                    <div key={purchase.id} className="flex items-center space-x-4 p-4 rounded-lg border">
                      <img
                        src={purchase.image || "/placeholder.svg"}
                        alt={purchase.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{purchase.name}</h4>
                        <p className="text-sm text-muted-foreground">by {purchase.artisan}</p>
                        <p className="text-xs text-muted-foreground">{purchase.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{purchase.price}</div>
                        <Badge variant={purchase.status === "Delivered" ? "default" : "secondary"} className="text-xs">
                          {purchase.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        View Order
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learning" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cultural Learning Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <TabsContent value="learning">
  <ComingSoon title="Cultural Learning" />
</TabsContent>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Streaks</CardTitle>
                </CardHeader>
                <TabsContent value="learning">
  <ComingSoon title="Cultural Learning" />
</TabsContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`${achievement.earned ? "border-accent" : "opacity-60"} transition-all`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.earned ? "bg-accent text-accent-foreground" : "bg-muted"
                        }`}
                      >
                        <achievement.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <Badge className={`${getRarityColor(achievement.rarity)} text-white text-xs`}>
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.earned && <Trophy className="w-6 h-6 text-yellow-500" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Community Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TabsContent value="community">
  <ComingSoon title="Community Activity" />
</TabsContent>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
