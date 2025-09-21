"use client"

// components/ui/back-button.tsx
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BackButtonProps {
  href: string
  text?: string
  className?: string
}

export const BackButton = ({ 
  href, 
  text = "Volver", 
  className = "" 
}: BackButtonProps) => (
  <Link
    href={href}
    className={`inline-flex items-center justify-center h-8 px-3 text-xs rounded-md text-gray-700 hover:bg-gray-100 transition-colors mr-2 ${className}`}
  >
    <ArrowLeft className="h-4 w-4 mr-2" />
    {text}
  </Link>
)