"use client"

import { Bell, ChevronDown, ChevronLeft, ChevronRight, Grid, List, Search,Clock, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WeeklyCalendar } from "./weekly-calendar"
import { AddEventModal } from "./add-event-modal"
import { useCalendar } from "@/context/calendar-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useMemo } from "react"
import { Toaster } from "sonner"
import Image from "next/image"
import CancelledImage from '@assets/svgs/cross-icon.svg'
import CompleteImage from '@assets/svgs/complete-icon.svg'
import UpcommingImage from '@assets/svgs/upcoming-icon.svg'


export function CalendarView() {
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const { events, getEventById } = useCalendar()

  // Calculate status counts
  const statusCounts = useMemo(() => {
    const today = new Date(2025, 2, 20) // March 20, 2025 (Thursday)

    const upcoming = events.filter((event) => {
      return event.start > today && event.status !== "Completed" && event.status !== "Cancelled"
    }).length

    const completed = events.filter((event) => event.status === "Completed").length
    const cancelled = events.filter((event) => event.status === "Cancelled").length

    return { upcoming, completed, cancelled }
  }, [events])

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId)
    setIsAddEventModalOpen(true)
  }

  const selectedEvent = selectedEventId ? getEventById(selectedEventId) : undefined

  return (
    <div className="flex h-full flex-col">
      {/* Toast Provider */}
      <Toaster position="top-right" />

      {/* Header */}
      <header className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2  top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search" className="h-9 pl-8 rounded-4xl" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Select defaultValue="las-sabir">
            <SelectTrigger className=" border-0 shadow-none font-normal">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="las-sabir">Las Sabir</SelectItem>
              <SelectItem value="john-doe">John Doe</SelectItem>
              <SelectItem value="jane-smith">Jane Smith</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Calendar Controls */}
      <div className="flex items-center justify-between  p-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center border-2 rounded-lg">
            <Button variant="outline" size="icon" className="border-0 shadow h-8 w-8">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="border-0 shadow-none h-8 w-8">
              <List className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 borde-2">
            <Button variant="outline" className="borde-2 flex items-center gap-1">
              Week
              <ChevronDown className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              <span className="font-medium">Mar 17 - 23</span>
              <span className="text-sm ">W32</span>
            </div>

            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button variant="outline">Today</Button>
        </div>

       
      </div>

      {/* Status Tabs */}

<div className="flex justify-between  px-3 py-2">
  <div className="flex">
    <div className="flex items-center gap-1 px-4 py-1 hover:bg-gray-50">
      <Clock className="h-4 w-4 text-gray-500" />
      <span className="text-gray-600">Upcoming</span>
      <span className="font-medium">{statusCounts?.upcoming}</span>
    </div>
    <div className="flex items-center gap-1 px-4 py-1 hover:bg-gray-50">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <span className="text-gray-600">Completed</span>
      <span className="font-medium">{statusCounts?.completed}</span>
    </div>
    <div className="flex items-center gap-1 px-4 py-1 hover:bg-gray-50">
      <XCircle className="h-4 w-4 text-red-600" />
      <span className="text-gray-600">Cancelled</span>
      <span className="font-medium">{statusCounts?.cancelled}</span>
    </div>
  </div>

  <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            Filter
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="outline">View Waitlist</Button>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => {
              setSelectedEventId(null)
              setIsAddEventModalOpen(true)
            }}
          >
            Add Booking
          </Button>
        </div>
</div>


      {/* Calendar */}
      <div className="flex-1 overflow-auto">
        <WeeklyCalendar onEventClick={handleEventClick} />
      </div>

      {/* Add/Edit Event Modal */}
      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        selectedEvent={selectedEvent}
      />
    </div>
  )
}
