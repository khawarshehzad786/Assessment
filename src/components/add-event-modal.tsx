"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  type CalendarEvent,
  useCalendar,
  customers,
  staffMembers,
  type EventType,
  type EventStatus,
} from "@/context/calendar-context"
import { format, addHours, parse } from "date-fns"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, CalendarIcon } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface AddEventModalProps {
  isOpen: boolean
  onClose: () => void
  selectedEvent?: CalendarEvent
  selectedDate?: Date
  selectedHour?: number
}

// Available service options
const serviceOptions: EventType[] = ["Luxury & Beard SPA", "Message SPA", "Haircut", "Rebooking", "Block", "Extra Time"]

// Available status options
const statusOptions: EventStatus[] = ["Need Approval", "Confirmed", "In Progress", "Completed", "Cancelled"]

export function AddEventModal({ isOpen, onClose, selectedEvent, selectedDate, selectedHour }: AddEventModalProps) {
  const { addEvent, updateEvent, deleteEvent } = useCalendar()
  const [repeatEnabled, setRepeatEnabled] = useState(false)

  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    startDate: format(new Date(), "yyyy-MM-dd"),
    startTime: "09:00",
    endDate: format(new Date(), "yyyy-MM-dd"),
    endTime: "10:00",
    address: "",
    description: "",
    color: "bg-blue-100 text-blue-800",
    customerId: "",
    staffId: "",
    services: [] as EventType[],
    status: "Need Approval" as EventStatus,
  })

  // Reset form when modal opens/closes or selected event changes
  useEffect(() => {
    if (selectedEvent) {
      // If editing an existing event, populate form with event data
      setFormData({
        title: selectedEvent.title,
        startDate: format(selectedEvent.start, "yyyy-MM-dd"),
        startTime: format(selectedEvent.start, "HH:mm"),
        endDate: format(selectedEvent.end, "yyyy-MM-dd"),
        endTime: format(selectedEvent.end, "HH:mm"),
        address: selectedEvent.address || "",
        description: selectedEvent.description || "",
        color: selectedEvent.color || "bg-blue-100 text-blue-800",
        customerId: selectedEvent.customer?.id || "",
        staffId: selectedEvent.staff?.id || "",
        services: selectedEvent.type || [],
        status: selectedEvent.status || "Need Approval",
      })
    } else if (selectedDate && selectedHour !== undefined) {
      // If creating from a time slot click, set start/end times
      const startDate = new Date(selectedDate)
      const endDate = addHours(startDate, 1)

      setFormData({
        title: "",
        startDate: format(startDate, "yyyy-MM-dd"),
        startTime: format(startDate, "HH:mm"),
        endDate: format(endDate, "yyyy-MM-dd"),
        endTime: format(endDate, "HH:mm"),
        address: "",
        description: "",
        color: "bg-blue-100 text-blue-800",
        customerId: "",
        staffId: "",
        services: [],
        status: "Need Approval",
      })
    } else {
      // Default values for new booking
      setFormData({
        title: "",
        startDate: format(new Date(), "yyyy-MM-dd"),
        startTime: "09:00",
        endDate: format(new Date(), "yyyy-MM-dd"),
        endTime: "10:00",
        address: "",
        description: "",
        color: "bg-blue-100 text-blue-800",
        customerId: "",
        staffId: "",
        services: [],
        status: "Need Approval",
      })
    }
  }, [isOpen, selectedEvent, selectedDate, selectedHour])

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Toggle a service in the services array
  const handleServiceToggle = (service: EventType) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Parse dates from form data
    const startDateTime = parse(`${formData.startDate} ${formData.startTime}`, "yyyy-MM-dd HH:mm", new Date())
    const endDateTime = parse(`${formData.endDate} ${formData.endTime}`, "yyyy-MM-dd HH:mm", new Date())

    // Find customer and staff objects
    const customer = customers.find((c) => c.id === formData.customerId)
    const staff = staffMembers.find((s) => s.id === formData.staffId)

    // Create event data object
    const eventData = {
      title: customer?.name || formData.title,
      start: startDateTime,
      end: endDateTime,
      address: formData.address,
      description: formData.description,
      color: formData.color,
      customer,
      staff,
      type: formData.services,
      status: formData.status,
    }

    // Update or add event
    if (selectedEvent) {
      updateEvent(selectedEvent.id, eventData)
      toast.success("Booking updated successfully")
    } else {
      addEvent(eventData)
      toast.success("Booking added successfully")
    }

    onClose()
  }

  // Get the selected customer object
  const selectedCustomer = customers.find((c) => c.id === formData.customerId)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{selectedEvent ? "Edit Booking" : "Add Booking"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Customer Selection */}
          <div className="space-y-2">
            <Label>Customer</Label>
            {selectedCustomer ? (
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedCustomer.avatar || "/placeholder.svg"} alt={selectedCustomer.name} />
                    <AvatarFallback>{selectedCustomer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedCustomer.name}</div>
                    <div className="text-sm text-gray-500">{selectedCustomer.phone}</div>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData((prev) => ({ ...prev, customerId: "" }))}
                >
                  Change
                </Button>
              </div>
            ) : (
              <Select value={formData.customerId} onValueChange={(value) => handleSelectChange("customerId", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your customer for booking" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                          <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {customer.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Staff Selection */}
          <div className="space-y-2">
            <Label htmlFor="staff">Staff</Label>
            <Select  value={formData.staffId} onValueChange={(value) => handleSelectChange("staffId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select staff" />
              </SelectTrigger>
              <SelectContent>
                {staffMembers.map((staff) => (
                  <SelectItem key={staff.id} value={staff.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                        <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {staff.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date</Label>
              <div className="flex items-center rounded-md border px-3 py-2">
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="border-0 p-0 focus-visible:ring-0"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <div className="flex items-center rounded-md border px-3 py-2">
                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="border-0 p-0 focus-visible:ring-0"
                  required
                />
              </div>
            </div>
          </div>

          {/* End Time */}
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <div className="flex items-center rounded-md border px-3 py-2">
              <Clock className="mr-2 h-4 w-4 text-gray-500" />
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
                className="border-0 p-0 focus-visible:ring-0"
                required
              />
            </div>
          </div>

          {/* Repeat Option */}
          <div className="flex items-center justify-between">
            <Label htmlFor="repeat">Repeat</Label>
            <Switch id="repeat" checked={repeatEnabled} onCheckedChange={setRepeatEnabled} />
          </div>

          {repeatEnabled && (
            <Select defaultValue="weekly-friday">
              <SelectTrigger>
                <SelectValue placeholder="Select repeat pattern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly-friday">Weekly on Friday</SelectItem>
                <SelectItem value="weekly-monday">Weekly on Monday</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Services Selection */}
          <div className="space-y-2">
            <Label>Service</Label>
            <Select onValueChange={(value) => handleServiceToggle(value as EventType)}>
              <SelectTrigger className="w-full"> 
                <SelectValue  placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Display selected services as tags */}
            {formData.services.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800"
                  >
                    {service}
                    <button
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      className="ml-1 rounded-full hover:bg-blue-200"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value as EventStatus)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Add Deposit Link */}
          <div>
            <Button type="button" variant="link" className="p-0 text-blue-600">
              Add Deposit
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            {selectedEvent && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  deleteEvent(selectedEvent.id)
                  toast.success("Booking deleted successfully")
                  onClose()
                }}
              >
                Delete
              </Button>
            )}
            <div className="flex gap-2 ml-auto">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                {selectedEvent ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
