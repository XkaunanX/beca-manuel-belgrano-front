"use client"

// components/ui/download-button.tsx
import { Download } from "lucide-react"

interface DownloadButtonProps {
  text?: string
  className?: string
  onClick?: () => void
}

export const DownloadButton = ({ 
  text = "Descargar", 
  className = "",
  onClick 
}: DownloadButtonProps) => (
  <button
    onClick={onClick}
    className={`hidden sm:flex items-center justify-center h-8 px-3 text-xs rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors ${className}`}
  >
    <Download className="h-4 w-4 mr-2" />
    {text}
  </button>
)