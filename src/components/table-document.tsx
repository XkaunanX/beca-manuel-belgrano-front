"use client"

// components/ui/documents-table.tsx
import { CustomTable, TableData } from "./table-custom"

interface DocumentTableProps {
  data: DocumentData[]
  onView?: (document: DocumentData) => void
  onReplace?: (document: DocumentData) => void
  onUpload?: (document: DocumentData) => void
  className?: string
}

export interface DocumentData {
  id: string
  name: string
  status: string // Cambiado de keyof StatusConfig a string
  uploadDate: string
  observations: string
  actionType: "view" | "replace" | "upload"
}

// Componente StatusBadge movido arriba para que esté definido antes de usarse
const StatusBadge = ({ statusKey }: { statusKey: string }) => {
  const statusConfig = {
    verified: { bg: "bg-green-100", text: "text-green-800", label: "Verificado" },
    pending: { bg: "bg-slate-100", text: "text-slate-800", label: "Pendiente" },
    rejected: { bg: "bg-red-100", text: "text-red-800", label: "Rechazado" },
    review: { bg: "bg-yellow-100", text: "text-yellow-800", label: "En revisión" }
  }

  const status = statusConfig[statusKey as keyof typeof statusConfig] || statusConfig.pending
  
  return (
    <span className={`${status.bg} ${status.text} text-xs px-2 py-1 rounded-full`}>
      {status.label}
    </span>
  )
}

export const DocumentsTable = ({ 
  data, 
  onView, 
  onReplace, 
  onUpload, 
  className = "" 
}: DocumentTableProps) => {
  const columns = [
    { key: "name", header: "Documento", className: "text-left" },
    { key: "status", header: "Estado", className: "text-left" },
    { key: "uploadDate", header: "Fecha de subida", className: "text-left" },
    { key: "observations", header: "Observaciones", className: "text-left" },
    { key: "actions", header: "Acciones", className: "text-left" }
  ]

  const getActionLabel = (actionType: string) => {
    switch (actionType) {
      case "view": return "Ver"
      case "replace": return "Reemplazar"
      case "upload": return "Subir"
      default: return "Acción"
    }
  }

  const handleAction = (document: DocumentData) => {
    switch (document.actionType) {
      case "view":
        onView?.(document)
        break
      case "replace":
        onReplace?.(document)
        break
      case "upload":
        onUpload?.(document)
        break
    }
  }

  const tableData: TableData[] = data.map((document) => ({
    name: <span className="font-medium">{document.name}</span>,
    status: <StatusBadge statusKey={document.status} />,
    uploadDate: document.uploadDate,
    observations: document.observations,
    actions: (
      <button
        onClick={() => handleAction(document)}
        className="inline-flex items-center justify-center h-7 px-3 text-xs rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
      >
        {getActionLabel(document.actionType)}
      </button>
    )
  }))

  return (
    <CustomTable
      columns={columns}
      data={tableData}
      responsive={true}
      className={className}
    />
  )
}