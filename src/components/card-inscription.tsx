"use client"

// components/ui/inscripcion-card.tsx
import { ProgressCard } from "./card-progress"

interface InscripcionCardProps {
  progress: number
  plazo?: string
  titulo?: string
  subtitulo?: string
  className?: string
}

export const InscripcionCard = ({
  progress,
  plazo = "hasta el 30 de mayo de 2025",
  titulo = "Inscripción 2025",
  subtitulo = "Completa tu solicitud para la beca",
  className = ""
}: InscripcionCardProps) => {
  return (
    <ProgressCard
      title={titulo}
      subtitle={subtitulo}
      progress={progress}
      lastUpdate={`Plazo: ${plazo}`}
      footerText="Completado"
      variant="blue"
      className={className}
    />
  )
}