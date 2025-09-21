"use client"

// components/ui/alert-personalizada.tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { 
  CheckCircle, 
  Info, 
  AlertTriangle,
  XCircle,
} from "lucide-react"

export interface AlertPersonalizadaProps 
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info"
  title?: string
  icon?: React.ReactNode
  showIcon?: boolean
  customColor?: {
    bg?: string
    border?: string
    text?: string
    iconColor?: string
  }
}

const AlertPersonalizada = React.forwardRef<HTMLDivElement, AlertPersonalizadaProps>(
  ({ 
    className, 
    variant = "default", 
    title, 
    icon, 
    showIcon = true, 
    customColor,
    children, 
    ...props 
  }, ref) => {
    
    // Configuración de colores por variante
    const variantConfig = {
      default: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-800",
        iconColor: "text-blue-600"
      },
      success: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-800",
        iconColor: "text-green-600"
      },
      warning: {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-800",
        iconColor: "text-yellow-600"
      },
      error: {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-800",
        iconColor: "text-red-600"
      },
      info: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-800",
        iconColor: "text-blue-600"
      }
    }

    // Usar colores personalizados si se proporcionan, sino los de la variante
    const colors = customColor ? {
      bg: customColor.bg || variantConfig[variant].bg,
      border: customColor.border || variantConfig[variant].border,
      text: customColor.text || variantConfig[variant].text,
      iconColor: customColor.iconColor || variantConfig[variant].iconColor
    } : variantConfig[variant]

    // Obtener el ícono por defecto según la variante
    const getDefaultIcon = (): React.ReactNode => {
      const iconProps = { className: cn("h-5 w-5 flex-shrink-0", colors.iconColor) }
      
      switch (variant) {
        case "success":
          return <CheckCircle {...iconProps} />
        case "warning":
          return <AlertTriangle {...iconProps} />
        case "error":
          return <XCircle {...iconProps} />
        case "info":
          return <Info {...iconProps} />
        default:
          return <Info {...iconProps} />
      }
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "rounded-md border p-4 relative",
          colors.bg,
          colors.border,
          colors.text,
          className
        )}
        {...props}
      >
        <div className="flex">
          {showIcon && (
            <div className="mr-3 mt-0.5">
              {icon || getDefaultIcon()}
            </div>
          )}
          <div className="flex-1">
            {title && (
              <p className="font-medium mb-1">
                {title}
              </p>
            )}
            <div className="text-sm">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

AlertPersonalizada.displayName = "AlertPersonalizada"

export { AlertPersonalizada }