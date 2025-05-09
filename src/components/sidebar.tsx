"use client"

import {
  Calendar,
  BarChart2,
  Box,
  CreditCard,
  Inbox,
  Settings,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    section: "WORKSPACE",
    items: [
      {
        name: "Calendar",
        icon: Calendar,
        active: true,       
      },
      { name: "Catalog", icon: Box, hasSubmenu: true },
      { name: "Inbox", icon: Inbox },
      { name: "Customer", icon: Users },
      { name: "Reminders", icon: Clock },
    ],
  },
  {
    section: "FINANCE",
    items: [
      { name: "Cashbox", icon: CreditCard, hasSubmenu: true },
      { name: "Payment", icon: CreditCard, hasSubmenu: true },
    ],
  },
  {
    section: "COMPANY",
    items: [
      { name: "Analytics", icon: BarChart2 },
      { name: "Staff", icon: Users, hasSubmenu: true },
      { name: "Settings", icon: Settings, hasSubmenu: true },
    ],
  },
]

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: (value?: boolean) => void
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        isOpen ? "w-[230px] min-w-[230px]" : "w-[60px] min-w-[60px]",
        "overflow-y-auto border-r bg-white",
      )}
    >
      <div className="flex h-10 items-center justify-end  px-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleSidebar()}>
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex flex-col gap-6 px-3 py-4">
        {sidebarItems.map((section) => (
          <div key={section.section} className="flex flex-col gap-1">
            {isOpen && <div className="mb-1 px-2 text-xs font-medium text-gray-500">{section.section}</div>}
            {section.items.map((item) => (
              <div key={item.name} className="flex flex-col">
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                    item.active ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {isOpen && (
                    <>
                      <span className="truncate">{item.name}</span>
                      {item.hasSubmenu && (
                        <svg
                          className="ml-auto h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
