"use client"

// components/ui/card-progress.tsx
interface ProgressCardProps {
  title: string
  subtitle?: string
  progress: number
  statusText?: string
  statusVariant?: "default" | "blue" | "green" | "yellow" | "red"
  lastUpdate?: string
  footerText?: string
  variant?: "default" | "blue"
  className?: string
}

export const ProgressCard = ({
  title,
  subtitle,
  progress,
  statusText,
  statusVariant = "default",
  lastUpdate,
  footerText,
  variant = "default",
  className = ""
}: ProgressCardProps) => {
  const variantStyles = {
    default: "bg-card border text-card-foreground",
    blue: "border-blue-200 bg-blue-50 text-blue-800"
  }

  const statusStyles = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    green: "bg-green-100 text-green-800 border-green-200",
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
    red: "bg-red-100 text-red-800 border-red-200"
  }

  return (
    <div className={`rounded-lg border shadow-2xs p-6 ${variantStyles[variant]} ${className}`}>
      {/* Header */}
      <div className="flex flex-col space-y-1.5 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {statusText && (
            <span className={`rounded-full text-xs font-semibold border flex items-center px-3 py-1 ${statusStyles[statusVariant]}`}>
              {statusText}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="text-sm">
        {lastUpdate && <p>{lastUpdate}</p>}
        
        {/* Progress Bar */}
        <div className="mt-2 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Footer */}
        <div className="flex justify-between items-center mt-1">
          {footerText && <p className="text-xs">{footerText}</p>}
          <p className="text-xs text-right">Progreso: {progress}%</p>
        </div>
      </div>
    </div>
  )
}