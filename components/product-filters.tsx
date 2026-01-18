"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedCrafts, setSelectedCrafts] = useState<string[]>([])
  const [selectedNGOs, setSelectedNGOs] = useState<string[]>([])

  const regions = [
    "Rajasthan",
    "Gujarat",
    "West Bengal",
    "Odisha",
    "Kerala",
    "Tamil Nadu",
    "Karnataka",
    "Maharashtra",
    "Uttar Pradesh",
    "Kashmir",
  ]

  const craftTypes = [
    "Textiles",
    "Pottery",
    "Paintings",
    "Jewelry",
    "Wood Carving",
    "Metal Work",
    "Leather Craft",
    "Bamboo Craft",
    "Stone Carving",
    "Embroidery",
  ]

  const ngos = [
    "Craft Revival Trust",
    "Dastkar",
    "Artisan Alliance",
    "Heritage Crafts",
    "Rural Artisan Network",
    "Traditional Arts Foundation",
  ]

  const toggleSelection = (item: string, list: string[], setList: (items: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const clearAllFilters = () => {
    setPriceRange([0, 50000])
    setSelectedRegions([])
    setSelectedCrafts([])
    setSelectedNGOs([])
  }

  const activeFiltersCount = selectedRegions.length + selectedCrafts.length + selectedNGOs.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-semibold text-lg">Filters</h3>
        <div className="flex items-center space-x-2">
          {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount} active</Badge>}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Price Range */}
        <div className="space-y-3">
          <h4 className="font-medium">Price Range</h4>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={50000}
              min={0}
              step={500}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Regions */}
        <div className="space-y-3">
          <h4 className="font-medium">Regions</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {regions.map((region) => (
              <div key={region} className="flex items-center space-x-2">
                <Checkbox
                  id={region}
                  checked={selectedRegions.includes(region)}
                  onCheckedChange={() => toggleSelection(region, selectedRegions, setSelectedRegions)}
                />
                <label htmlFor={region} className="text-sm cursor-pointer">
                  {region}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Craft Types */}
        <div className="space-y-3">
          <h4 className="font-medium">Craft Types</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {craftTypes.map((craft) => (
              <div key={craft} className="flex items-center space-x-2">
                <Checkbox
                  id={craft}
                  checked={selectedCrafts.includes(craft)}
                  onCheckedChange={() => toggleSelection(craft, selectedCrafts, setSelectedCrafts)}
                />
                <label htmlFor={craft} className="text-sm cursor-pointer">
                  {craft}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* NGOs */}
        <div className="space-y-3">
          <h4 className="font-medium">NGO Partners</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {ngos.map((ngo) => (
              <div key={ngo} className="flex items-center space-x-2">
                <Checkbox
                  id={ngo}
                  checked={selectedNGOs.includes(ngo)}
                  onCheckedChange={() => toggleSelection(ngo, selectedNGOs, setSelectedNGOs)}
                />
                <label htmlFor={ngo} className="text-sm cursor-pointer">
                  {ngo}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedRegions.map((region) => (
              <Badge key={region} variant="secondary" className="cursor-pointer">
                {region}
                <X
                  className="w-3 h-3 ml-1"
                  onClick={() => toggleSelection(region, selectedRegions, setSelectedRegions)}
                />
              </Badge>
            ))}
            {selectedCrafts.map((craft) => (
              <Badge key={craft} variant="secondary" className="cursor-pointer">
                {craft}
                <X className="w-3 h-3 ml-1" onClick={() => toggleSelection(craft, selectedCrafts, setSelectedCrafts)} />
              </Badge>
            ))}
            {selectedNGOs.map((ngo) => (
              <Badge key={ngo} variant="secondary" className="cursor-pointer">
                {ngo}
                <X className="w-3 h-3 ml-1" onClick={() => toggleSelection(ngo, selectedNGOs, setSelectedNGOs)} />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
