"use client"

// components/ui/input-password.tsx
"use client"

import { useState, InputHTMLAttributes } from "react"
import { Eye, EyeOff } from "lucide-react"

interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  error?: string
  helperText?: string
}

export const InputPassword = ({ 
  label, 
  id, 
  error,
  helperText,
  className = "",
  ...props 
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="space-y-2">
      <label 
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          className={`
            flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
            ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none 
            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
            disabled:cursor-not-allowed disabled:opacity-50 pr-10
            ${error ? "border-red-500 focus-visible:ring-red-500" : ""}
            ${className}
          `}
          {...props}
        />
        
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-0 top-0 h-full px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
}