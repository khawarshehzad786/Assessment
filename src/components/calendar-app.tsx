"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { CalendarView } from "./calendar-view"
import { useSidebar } from "@/hooks/use-sidebar"

export function CalendarApp() {
  const { isOpen, toggleSidebar } = useSidebar(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check if screen is mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Auto-hide sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      toggleSidebar(false)
    }
  }, [isMobile, toggleSidebar])

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <CalendarView />
      </div>
    </div>
  )
}
