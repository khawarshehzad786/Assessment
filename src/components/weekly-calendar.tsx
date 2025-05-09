"use client"

import type React from "react"

import { useCalendar, getStatusIcon, getStatusColor } from "@/context/calendar-context"
import { cn } from "@/lib/utils"
import { format, addDays, isSameDay, setHours, setMinutes } from "date-fns"
import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { AddEventModal } from "./add-event-modal"
import { Trash2 } from "lucide-react"

interface WeeklyCalendarProps {
  onEventClick: (eventId: string) => void
}

export function WeeklyCalendar({ onEventClick }: WeeklyCalendarProps) {
  const { events, deleteEvent } = useCalendar()
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; hour: number } | null>(null)
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null)

  // Set the start date to March 17, 2025 (Monday of the week in the image)
  const startDate = new Date(2025, 2, 17) // March 17, 2025
  const today = new Date(2025, 2, 20) // March 20, 2025 (Thursday)

  // Generate the week days
  const weekDays = Array.from({ length: 7 }, (_, i) => ({
    date: addDays(startDate, i),
    dayName: format(addDays(startDate, i), "EEEE"),
    dayNumber: format(addDays(startDate, i), "d"),
    isToday: isSameDay(addDays(startDate, i), today),
  }))

  // Generate time slots from 6:00 to 20:00
  const timeSlots = Array.from({ length: 15 }, (_, i) => ({
    hour: i + 6,
    label: `${(i + 6).toString().padStart(2, "0")}:00`,
  }))

  // Add half-hour slot for 12:30
  const allTimeSlots = [
    ...timeSlots.slice(0, 7), // 6:00 to 12:00
    { hour: 12.5, label: "12:30" },
    ...timeSlots.slice(7), // 13:00 to 20:00
  ]

  // Filter and organize events by day and time
  const getEventsForDayAndTime = (date: Date, hour: number) =>
    events.filter((event) => {
      const eventStartHour = event.start.getHours() + event.start.getMinutes() / 60
      const eventEndHour = event.end.getHours() + event.end.getMinutes() / 60
      return isSameDay(event.start, date) && eventStartHour <= hour && eventEndHour > hour
    })

  // Handle empty slot click
  const handleEmptySlotClick = (date: Date, hour: number) => {
    const slotDate = new Date(date)
    setHours(slotDate, Math.floor(hour))
    setMinutes(slotDate, (hour % 1) * 60)

    setSelectedSlot({ date: slotDate, hour })
    setIsAddEventModalOpen(true)
  }

  // Handle delete event
  const handleDeleteEvent = (e: React.MouseEvent, eventId: string) => {
    e.stopPropagation()
    deleteEvent(eventId)
    toast.success("Booking deleted successfully")
  }

  return (
    <div className="relative flex flex-col">
      {/* Header with days */}
      <div className="sticky top-0 z-10 grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-white">
        <div className="border-b border-r p-2 text-center text-xs font-medium text-gray-500">GMT +07</div>
        {weekDays.map((day) => (
          <div key={day.dayName} className={cn("border-b border-r p-2 text-center", day.isToday ? "bg-blue-50" : "")}>
            <div className="text-sm font-medium">
              {day.dayName}, {day.dayNumber}
            </div>
          </div>
        ))}
      </div>

      {/* Time slots and events */}
      <div className="min-w-[800px] overflow-x-auto">
        {allTimeSlots.map((timeSlot) => (
          <div key={timeSlot.label} className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b">
            {/* Time label */}
            <div className="border-r p-2 text-right text-xs font-medium text-gray-500">{timeSlot.label}</div>

            {/* Day columns */}
            {weekDays.map((day) => {
              const dayEvents = getEventsForDayAndTime(day.date, timeSlot.hour)
              const hasEvents = dayEvents.length > 0

              return (
                <div
                  key={`${day.dayName}-${timeSlot.label}`}
                  className={cn(
                    "relative min-h-[50px] border-r",
                    day.isToday ? "bg-blue-50" : "",
                    !hasEvents && "cursor-pointer hover:bg-gray-50",
                    day.isToday && "cursor-pointer",
                  )}
                  onClick={() => !hasEvents && handleEmptySlotClick(day.date, timeSlot.hour)}
                >
                  {/* Empty slot indicator */}
                  {!hasEvents && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100">
                      <div className="text-blue-500">+</div>
                    </div>
                  )}

                  {dayEvents.map((event) => {
                    const isStartHour = event.start.getHours() + event.start.getMinutes() / 60 === timeSlot.hour
                    if (!isStartHour) return null

                    const startHour = event.start.getHours() + event.start.getMinutes() / 60
                    const endHour = event.end.getHours() + event.end.getMinutes() / 60
                    const durationHours = endHour - startHour
                    const heightInPixels = durationHours * 50 // Each hour is 50px tall

                    return (
                      <motion.div
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          onEventClick(event.id)
                        }}
                        onMouseEnter={() => setHoveredEventId(event.id)}
                        onMouseLeave={() => setHoveredEventId(null)}
                        className={cn(
                          "absolute left-0 right-0 z-10 m-1 cursor-pointer overflow-hidden rounded p-1 text-xs",
                          getStatusColor(event.status),
                        )}
                        style={{ height: `${heightInPixels - 2}px` }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{event.title}</div>
                          <div className="flex items-center gap-1">
                            {hoveredEventId === event.id && (
                              <Trash2
                                className="h-4 w-4 cursor-pointer text-red-500 hover:text-red-700"
                                onClick={(e) => handleDeleteEvent(e, event.id)}
                              />
                            )}
                            <div className="text-sm">{getStatusIcon(event.status)}</div>
                          </div>
                        </div>
                        <div className="text-xs opacity-80">
                          {format(event.start, "HH:mm")}-{format(event.end, "HH:mm")}
                        </div>
                        {event.type && <div className="mt-1 text-xs">{event.type.join(", ")}</div>}
                      </motion.div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Add Event Modal for empty slot click */}
      {selectedSlot && (
        <AddEventModal
          isOpen={isAddEventModalOpen}
          onClose={() => {
            setIsAddEventModalOpen(false)
            setSelectedSlot(null)
          }}
          selectedDate={selectedSlot.date}
          selectedHour={selectedSlot.hour}
        />
      )}
    </div>
  )
}
