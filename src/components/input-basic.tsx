"use client"

// components/ui/input-basic.tsx
import { InputHTMLAttributes } from "react"

interface InputBasicProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  error?: string
  helperText?: string
}

export const InputBasic = ({ 
  label, 
  id, 
  error,
  helperText,
  className = "",
  ...props 
}: InputBasicProps) => {
  return (
    <div className="space-y-2">
      <label 
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      
      <input
        id={id}
        className={`
          flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
          ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
          file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none 
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
          disabled:cursor-not-allowed disabled:opacity-50
          ${error ? "border-red-500 focus-visible:ring-red-500" : ""}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
}