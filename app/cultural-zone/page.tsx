"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Clock, Users, Target, Zap, Crown, Medal, Award, Compass, BookOpen } from "lucide-react"

export default function CulturalZonePage() {
  const [activeHunt, setActiveHunt] = useState<number | null>(null)

  // Mock user data
  const userStats = {
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    totalBadges: 18,
    completedHunts: 7,
    culturalPoints: 1250,
    rank: 23,
    streak: 5,
  }

  const treasureHunts = [
    {
      id: 1,
      title: "Diwali Traditions Explorer",
      description: "Discover the rich traditions and stories behind the Festival of Lights",
      difficulty: "Beginner",
      duration: "15 mins",
      xpReward: 150,
      culturalPoints: 50,
      participants: 1240,
      image: "/diwali-celebration-traditional-diyas-rangoli.jpg",
      status: "available",
      progress: 0,
      tasks: [
        "Learn about the origin of Diwali",
        "Identify 5 traditional Diwali sweets",
        "Discover regional Diwali customs",
        "Create a virtual rangoli pattern",
      ],
    },
    {
      id: 2,
      title: "Rajasthani Craft Heritage",
      description: "Journey through the royal crafts of Rajasthan",
      difficulty: "Intermediate",
      duration: "25 mins",
      xpReward: 250,
      culturalPoints: 80,
      participants: 890,
      image: "/rajasthani-handicrafts-colorful-traditional.jpg",
      status: "available",
      progress: 0,
      tasks: [
        "Explore Blue Pottery techniques",
        "Learn about Bandhani tie-dye",
        "Discover Jaipur jewelry making",
        "Virtual craft workshop experience",
      ],
    },
    {
      id: 3,
      title: "South Indian Temple Architecture",
      description: "Uncover the mysteries of ancient temple construction",
      difficulty: "Advanced",
      duration: "35 mins",
      xpReward: 350,
      culturalPoints: 120,
      participants: 567,
      image: "/south-indian-temple-architecture-intricate.jpg",
      status: "locked",
      progress: 0,
      requirements: "Complete 3 beginner hunts",
    },
  ]

  const badges = [
    { name: "Culture Explorer", icon: Compass, earned: true, rarity: "common" },
    { name: "Festival Master", icon: Star, earned: true, rarity: "rare" },
    { name: "Craft Connoisseur", icon: Award, earned: true, rarity: "epic" },
    { name: "Heritage Guardian", icon: Crown, earned: false, rarity: "legendary" },
    { name: "Story Collector", icon: BookOpen, earned: true, rarity: "common" },
    { name: "Tradition Keeper", icon: Medal, earned: false, rarity: "rare" },
  ]

  const leaderboard = [
    { rank: 1, name: "Arjun Patel", points: 3450, avatar: "/indian-male-young-traditional.jpg", badges: 24 },
    { rank: 2, name: "Priya Sharma", points: 3200, avatar: "/indian-female-young-traditional.jpg", badges: 22 },
    { rank: 3, name: "Vikram Singh", points: 2980, avatar: "/indian-male-middle-aged-traditional.jpg", badges: 20 },
    { rank: 4, name: "Meera Gupta", points: 2750, avatar: "/indian-female-middle-aged-traditional.jpg", badges: 19 },
    { rank: 5, name: "Rahul Kumar", points: 2650, avatar: "/indian-male-young-modern.jpg", badges: 18 },
  ]

  const startHunt = (huntId: number) => {
    setActiveHunt(huntId)
    // In real app, this would start the hunt experience
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold mb-4">Cultural Zone</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Embark on interactive cultural treasure hunts and earn rewards while learning about India's rich heritage
            </p>
          </div>

          {/* User Stats */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="w-5 h-5 text-accent mr-2" />
                      <span className="text-2xl font-bold text-primary">Level {userStats.level}</span>
                    </div>
                    <Progress value={(userStats.xp / userStats.nextLevelXp) * 100} className="mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {userStats.xp}/{userStats.nextLevelXp} XP
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Trophy className="w-5 h-5 text-accent mr-2" />
                      <span className="text-2xl font-bold text-primary">{userStats.culturalPoints}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Cultural Points</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Medal className="w-5 h-5 text-accent mr-2" />
                      <span className="text-2xl font-bold text-primary">{userStats.totalBadges}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Badges Earned</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Target className="w-5 h-5 text-accent mr-2" />
                      <span className="text-2xl font-bold text-primary">{userStats.streak}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Day Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="hunts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hunts">Treasure Hunts</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="hunts" className="mt-8">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {treasureHunts.map((hunt) => (
                <Card key={hunt.id} className="group hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={hunt.image || "/placeholder.svg"}
                      alt={hunt.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`${
                          hunt.difficulty === "Beginner"
                            ? "bg-green-500"
                            : hunt.difficulty === "Intermediate"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        } text-white`}
                      >
                        {hunt.difficulty}
                      </Badge>
                    </div>
                    {hunt.status === "locked" && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Crown className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm">{hunt.requirements}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-serif font-semibold text-xl mb-2">{hunt.title}</h3>
                    <p className="text-muted-foreground mb-4">{hunt.description}</p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {hunt.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {hunt.participants}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Zap className="w-4 h-4 text-accent mr-1" />
                          <span className="font-medium">{hunt.xpReward} XP</span>
                        </div>
                        <div className="flex items-center">
                          <Trophy className="w-4 h-4 text-accent mr-1" />
                          <span className="font-medium">{hunt.culturalPoints} CP</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" disabled={hunt.status === "locked"} onClick={() => startHunt(hunt.id)}>
                      {hunt.status === "locked" ? "Locked" : "Start Hunt"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="badges" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge, index) => {
                const IconComponent = badge.icon
                return (
                  <Card
                    key={index}
                    className={`${badge.earned ? "bg-white" : "bg-muted/50"} transition-all duration-300`}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 rounded-full ${getRarityColor(badge.rarity)} flex items-center justify-center mx-auto mb-4 ${badge.earned ? "opacity-100" : "opacity-50"}`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3
                        className={`font-semibold mb-2 ${badge.earned ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {badge.name}
                      </h3>
                      <Badge variant={badge.earned ? "default" : "secondary"} className="capitalize">
                        {badge.rarity}
                      </Badge>
                      {badge.earned && (
                        <div className="mt-3">
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Earned
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-8">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-accent" />
                    Cultural Points Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboard.map((user) => (
                      <div
                        key={user.rank}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              user.rank === 1
                                ? "bg-yellow-500 text-white"
                                : user.rank === 2
                                  ? "bg-gray-400 text-white"
                                  : user.rank === 3
                                    ? "bg-amber-600 text-white"
                                    : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {user.rank}
                          </div>
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-semibold">{user.name}</h4>
                            <p className="text-sm text-muted-foreground">{user.badges} badges</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">{user.points}</div>
                          <div className="text-sm text-muted-foreground">Cultural Points</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {userStats.rank}
                        </div>
                        <div>
                          <h4 className="font-semibold">You</h4>
                          <p className="text-sm text-muted-foreground">{userStats.totalBadges} badges</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{userStats.culturalPoints}</div>
                        <div className="text-sm text-muted-foreground">Cultural Points</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
