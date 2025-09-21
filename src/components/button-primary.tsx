"use client"

// components/ui/primary-button.tsx
import { LucideIcon } from "lucide-react"

interface PrimaryButtonProps {
  text: string
  icon?: LucideIcon
  className?: string
  onClick?: () => void
}

export const PrimaryButton = ({ 
  text, 
  icon: Icon,
  className = "",
  onClick 
}: PrimaryButtonProps) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center h-9 px-4 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors ${className}`}
  >
    {text}
    {Icon && <Icon className="h-4 w-4 ml-2" />}
  </button>
)