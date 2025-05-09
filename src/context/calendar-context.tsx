"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Event status types
export type EventStatus = "Need Approval" | "Confirmed" | "In Progress" | "Completed" | "Cancelled"

// Event service types
export type EventType = "Luxury & Beard SPA" | "Message SPA" | "Haircut" | "Rebooking" | "Block" | "Extra Time"

// Calendar event interface
export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: EventType[]
  status: EventStatus
  description?: string
  address?: string
  color?: string
  customer?: {
    id: string
    name: string
    phone?: string
    avatar?: string
  }
  staff?: {
    id: string
    name: string
    avatar?: string
  }
}

// Calendar context interface
interface CalendarContextType {
  events: CalendarEvent[]
  addEvent: (event: Omit<CalendarEvent, "id">) => void
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void
  deleteEvent: (id: string) => void
  getEventById: (id: string) => CalendarEvent | undefined
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined)

// Sample customers data
export const customers = [
  { id: "c1", name: "Alisa Hester", phone: "+45 12345678", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "c2", name: "John Smith", phone: "+45 23456789", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "c3", name: "Emma Johnson", phone: "+45 34567890", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "c4", name: "Michael Brown", phone: "+45 45678901", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "c5", name: "Olivia Davis", phone: "+45 56789012", avatar: "/placeholder.svg?height=40&width=40" },
]

// Sample staff data
export const staffMembers = [
  { id: "s1", name: "Evelyn Harison", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "s2", name: "James Wilson", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "s3", name: "Sophia Martinez", avatar: "/placeholder.svg?height=40&width=40" },
]

// Sample events data - updated to use March 17-23, 2025
const defaultEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Makenna Gouse",
    start: new Date(2025, 2, 17, 6, 0), // March 17, 2025, 6:00 AM
    end: new Date(2025, 2, 17, 8, 0),
    type: ["Haircut", "Message SPA"],
    status: "Completed",
    description: "Haircut, Message SPA, +2",
    color: "bg-blue-100 text-blue-800",
    customer: customers[0],
    staff: staffMembers[0],
  },
  {
    id: "2",
    title: "Aspen Westervelt",
    start: new Date(2025, 2, 17, 9, 0),
    end: new Date(2025, 2, 17, 12, 0),
    type: ["Haircut", "Luxury & Beard SPA"],
    status: "Completed",
    description: "Haircut, Luxury & Beard",
    color: "bg-blue-100 text-blue-800",
    customer: customers[1],
    staff: staffMembers[1],
  },
  {
    id: "3",
    title: "Alena Westervelt",
    start: new Date(2025, 2, 17, 13, 0),
    end: new Date(2025, 2, 17, 15, 0),
    type: ["Haircut", "Message SPA"],
    status: "Completed",
    description: "Haircut, Message",
    color: "bg-blue-100 text-blue-800",
    customer: customers[2],
    staff: staffMembers[2],
  },
  {
    id: "4",
    title: "Kaylynn Baptista",
    start: new Date(2025, 2, 18, 10, 0),
    end: new Date(2025, 2, 18, 16, 0),
    type: ["Luxury & Beard SPA"],
    status: "Need Approval",
    description: "Luxury & Beard SPA, +1",
    color: "bg-blue-100 text-blue-800",
    customer: customers[3],
    staff: staffMembers[0],
  },
  {
    id: "5",
    title: "Extra Time",
    start: new Date(2025, 2, 18, 16, 0),
    end: new Date(2025, 2, 18, 20, 0),
    type: ["Extra Time"],
    status: "Confirmed",
    color: "bg-blue-100 text-blue-800 opacity-50",
    customer: customers[4],
    staff: staffMembers[1],
  },
  {
    id: "6",
    title: "Kianna Dias",
    start: new Date(2025, 2, 19, 17, 0),
    end: new Date(2025, 2, 19, 20, 0),
    type: ["Luxury & Beard SPA"],
    status: "In Progress",
    description: "Luxury & Beard SPA",
    color: "bg-blue-100 text-blue-800",
    customer: customers[0],
    staff: staffMembers[2],
  },
  {
    id: "7",
    title: "Block - Lunch",
    start: new Date(2025, 2, 19, 10, 0),
    end: new Date(2025, 2, 19, 14, 0),
    type: ["Block"],
    status: "Confirmed",
    description: "Block out this time to take a break, relax, or recharge",
    color: "bg-gray-200 text-gray-800",
  },
  {
    id: "8",
    title: "Madelyn Korsgaard",
    start: new Date(2025, 2, 20, 6, 0),
    end: new Date(2025, 2, 20, 10, 0),
    type: ["Rebooking"],
    status: "Completed",
    description: "Rebooking",
    color: "bg-blue-100 text-blue-800",
    customer: customers[1],
    staff: staffMembers[0],
  },
  {
    id: "9",
    title: "Tatiana Botosh",
    start: new Date(2025, 2, 20, 6, 0),
    end: new Date(2025, 2, 20, 10, 0),
    type: ["Haircut"],
    status: "In Progress",
    description: "Haircut",
    color: "bg-purple-100 text-purple-800",
    customer: customers[2],
    staff: staffMembers[1],
  },
  {
    id: "10",
    title: "Livia George",
    start: new Date(2025, 2, 20, 11, 0),
    end: new Date(2025, 2, 20, 15, 0),
    type: ["Message SPA"],
    status: "Need Approval",
    description: "Message SPA, +2",
    color: "bg-orange-100 text-orange-800",
    customer: customers[3],
    staff: staffMembers[2],
  },
  {
    id: "11",
    title: "Paityn Bergson",
    start: new Date(2025, 2, 21, 7, 0),
    end: new Date(2025, 2, 21, 9, 0),
    type: ["Rebooking"],
    status: "Confirmed",
    description: "Rebooking",
    color: "bg-purple-100 text-purple-800",
    customer: customers[4],
    staff: staffMembers[0],
  },
  {
    id: "12",
    title: "Tatiana Botosh",
    start: new Date(2025, 2, 21, 6, 0),
    end: new Date(2025, 2, 21, 10, 0),
    type: ["Haircut"],
    status: "Cancelled",
    description: "Haircut",
    color: "bg-purple-100 text-purple-800",
    customer: customers[0],
    staff: staffMembers[1],
  },
  {
    id: "13",
    title: "Marley Curtis",
    start: new Date(2025, 2, 22, 16, 0),
    end: new Date(2025, 2, 22, 20, 0),
    type: ["Message SPA"],
    status: "Confirmed",
    description: "Message",
    color: "bg-purple-100 text-purple-800",
    customer: customers[1],
    staff: staffMembers[2],
  },
]

// Helper function to get status icon
export const getStatusIcon = (status: EventStatus) => {
  switch (status) {
    case "Completed":
      return "✅"
    case "Cancelled":
      return "❌"
    case "In Progress":
      return "🔄"
    case "Need Approval":
      return "⏳"
    case "Confirmed":
      return "✓"
    default:
      return ""
  }
}

// Helper function to get status color
export const getStatusColor = (status: EventStatus) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800"
    case "Cancelled":
      return "bg-red-100 text-red-800"
    case "In Progress":
      return "bg-blue-100 text-blue-800"
    case "Need Approval":
      return "bg-yellow-100 text-yellow-800"
    case "Confirmed":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Helper function to serialize events for localStorage
const serializeEvents = (events: CalendarEvent[]) => {
  return JSON.stringify(events, (key, value) => {
    // Convert Date objects to ISO strings
    if (value instanceof Date) {
      return value.toISOString()
    }
    return value
  })
}

// Helper function to deserialize events from localStorage
const deserializeEvents = (jsonString: string): CalendarEvent[] => {
  try {
    const parsed = JSON.parse(jsonString)

    // Convert ISO strings back to Date objects
    return parsed.map((event: any) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }))
  } catch (error) {
    console.error("Error parsing saved events:", error)
    return defaultEvents
  }
}

export function CalendarProvider({ children }: { children: ReactNode }) {
  // Try to load events from localStorage or use default events
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("calendar-events")
      if (savedEvents) {
        return deserializeEvents(savedEvents)
      }
    }
    return defaultEvents
  })

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("calendar-events", serializeEvents(events))
    }
  }, [events])

  // Add a new event
  const addEvent = (event: Omit<CalendarEvent, "id">) => {
    const newEvent = {
      ...event,
      id: Math.random().toString(36).substring(2, 9),
    }
    setEvents((prev) => [...prev, newEvent])
  }

  // Update an existing event
  const updateEvent = (id: string, updatedEvent: Partial<CalendarEvent>) => {
    setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, ...updatedEvent } : event)))
  }

  // Delete an event
  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }

  // Get an event by ID
  const getEventById = (id: string) => {
    return events.find((event) => event.id === id)
  }

  return (
    <CalendarContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        getEventById,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export function useCalendar() {
  const context = useContext(CalendarContext)
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider")
  }
  return context
}
