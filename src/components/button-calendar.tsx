"use client"

// components/ui/calendar-button.tsx
import { Calendar } from "lucide-react"

interface CalendarButtonProps {
  period?: string
  className?: string
  onClick?: () => void
}

export const CalendarButton = ({ 
  period = "Período", 
  className = "",
  onClick 
}: CalendarButtonProps) => (
  <button
    onClick={onClick}
    className={`hidden sm:flex items-center justify-center h-8 px-3 text-xs rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors ${className}`}
  >
    <Calendar className="h-4 w-4 mr-2" />
    {period}
  </button>
)