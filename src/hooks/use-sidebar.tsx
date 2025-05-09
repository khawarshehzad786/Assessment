"use client"

import { useState, useEffect, useCallback } from "react"

export function useSidebar(defaultOpen = true) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-state")
    if (savedState !== null) {
      setIsOpen(savedState === "open")
    }
  }, [])

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebar-state", isOpen ? "open" : "closed")
  }, [isOpen])

  const toggleSidebar = useCallback((value?: boolean) => {
    if (typeof value === "boolean") {
      setIsOpen(value)
    } else {
      setIsOpen((prev) => !prev)
    }
  }, [])

  return { isOpen, toggleSidebar }
}
