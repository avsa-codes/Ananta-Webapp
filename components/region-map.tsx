"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

const regions = [
  { name: "Rajasthan", x: 25, y: 35, artisans: 1 },
  { name: "Uttar Pradesh", x: 45, y: 25, artisans: 1 },
  { name: "Maharashtra", x: 35, y: 55, artisans: 1 },
  { name: "Kashmir", x: 40, y: 10, artisans: 1 },
  { name: "West Bengal", x: 70, y: 40, artisans: 0 },
  { name: "Kerala", x: 30, y: 85, artisans: 0 },
  { name: "Gujarat", x: 20, y: 45, artisans: 0 },
  { name: "Tamil Nadu", x: 35, y: 80, artisans: 0 },
]

export function RegionMap({
  artisans,
  selectedRegion,
  onRegionSelect,
}: {
  artisans: any[]
  selectedRegion: string | null
  onRegionSelect: (region: string | null) => void
}) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const getArtisanCount = (regionName: string) => {
    return artisans.filter((artisan) => (artisan.region || "").includes(regionName)).length
  }

  return (
    <Card className="h-96">
      <CardContent className="p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-semibold text-xl">Artisan Map of India</h3>
          {selectedRegion && (
            <Badge variant="secondary" className="cursor-pointer" onClick={() => onRegionSelect(null)}>
              Clear Selection ✕
            </Badge>
          )}
        </div>

        <div className="relative w-full h-full bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg overflow-hidden">
          {/* Simplified India Map Outline */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
          >
            {/* Simplified India outline */}
            <path
              d="M20 15 L25 10 L35 8 L45 10 L55 12 L60 15 L65 20 L70 25 L75 35 L78 45 L75 55 L70 65 L65 70 L60 75 L55 80 L50 85 L45 88 L40 90 L35 88 L30 85 L25 80 L20 75 L15 65 L12 55 L10 45 L12 35 L15 25 L20 15 Z"
              fill="rgba(200, 90, 61, 0.1)"
              stroke="rgba(200, 90, 61, 0.3)"
              strokeWidth="0.5"
            />
          </svg>

          {/* Region Markers */}
          {regions.map((region) => {
            const artisanCount = getArtisanCount(region.name)
            const isSelected = selectedRegion === region.name
            const isHovered = hoveredRegion === region.name

            return (
              <div
                key={region.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${region.x}%`, top: `${region.y}%` }}
                onMouseEnter={() => setHoveredRegion(region.name)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => onRegionSelect(isSelected ? null : region.name)}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                    artisanCount > 0
                      ? isSelected
                        ? "bg-primary text-primary-foreground scale-125"
                        : isHovered
                          ? "bg-primary/80 text-primary-foreground scale-110"
                          : "bg-primary/60 text-primary-foreground hover:scale-110"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                </div>

                {/* Tooltip */}
                {(isHovered || isSelected) && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap">
                    {region.name}
                    {artisanCount > 0 && <span className="ml-1 text-accent">({artisanCount} artisans)</span>}
                  </div>
                )}

                {/* Pulse animation for regions with artisans */}
                {artisanCount > 0 && !isSelected && (
                  <div className="absolute inset-0 w-6 h-6 rounded-full bg-primary/30 animate-ping" />
                )}
              </div>
            )
          })}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur rounded-lg p-3 text-xs">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>Active Artisans</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-muted"></div>
                <span>No Artisans</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur rounded-lg p-3 text-xs">
            <div className="text-center">
              <div className="font-semibold text-primary text-lg">{artisans.length}</div>
              <div className="text-muted-foreground">Total Artisans</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
