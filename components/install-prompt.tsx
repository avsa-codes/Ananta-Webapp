"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

export default function InstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<any>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setPromptEvent(e)

      const dismissed = localStorage.getItem("ananta-install-dismissed")
      if (!dismissed) {
        setVisible(true)
      }
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const installApp = async () => {
    if (!promptEvent) return

    promptEvent.prompt()
    await promptEvent.userChoice
    setVisible(false)
  }

  const closeBanner = () => {
    localStorage.setItem("ananta-install-dismissed", "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 bg-[#F5EFE6] border border-[#E3D6C8] shadow-xl rounded-xl px-5 py-3">

        {/* Logo */}
        <img
          src="/icon-192.png"
          className="w-8 h-8 rounded-md"
          alt="Ananta"
        />

        {/* Text */}
        <div className="text-sm">
          <p className="font-semibold text-[#3E2C23]">
            Install Ananta
          </p>
          <p className="text-[#7A6A5E] text-xs">
            Discover handcrafted artisan products
          </p>
        </div>

        {/* Install Button */}
        <button
          onClick={installApp}
          className="bg-[#B44A2C] hover:bg-[#9c3f26] text-white text-sm px-4 py-1.5 rounded-md"
        >
          Install
        </button>

        {/* Close */}
        <button
          onClick={closeBanner}
          className="text-[#7A6A5E] hover:text-[#3E2C23]"
        >
          <X size={18} />
        </button>

      </div>
    </div>
  )
}