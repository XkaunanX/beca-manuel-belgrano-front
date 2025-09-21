"use client"

// components/ui/estado-solicitud-card.tsx
import { ProgressCard } from "./card-progress"

interface EstadoSolicitudCardProps {
  progress: number
  status?: string
  lastUpdate?: string
  convocatoria?: string
  className?: string
}

export const EstadoSolicitudCard = ({
  progress,
  status = "En evaluación",
  lastUpdate = "Última actualización",
  convocatoria = "Convocatoria 2025",
  className = ""
}: EstadoSolicitudCardProps) => {
  return (
    <ProgressCard
      title="Estado de solicitud"
      subtitle={convocatoria}
      progress={progress}
      statusText={status}
      statusVariant="blue"
      lastUpdate={`${lastUpdate}: ${new Date().toLocaleDateString()}`}
      footerText="Completado"
      variant="default"
      className={className}
    />
  )
}