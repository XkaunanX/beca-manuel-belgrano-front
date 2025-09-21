"use client"

// components/ui/table-custom.tsx
import { ReactNode } from "react"

export interface TableColumn {
  key: string
  header: string
  className?: string
}

export interface TableData {
  [key: string]: ReactNode
}

export interface StatusConfig {
  [key: string]: {
    bg: string
    text: string
    label: string
  }
}

interface CustomTableProps {
  columns: TableColumn[]
  data: TableData[]
  statusConfig?: StatusConfig
  responsive?: boolean
  className?: string
}

export const CustomTable = ({
  columns,
  data,
  responsive = true,
  className = ""
}: CustomTableProps) => {
  return (
    <div className={`${responsive ? "hidden sm:block" : ""} overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-100">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-3 sm:px-4 py-3 text-left text-xs sm:text-sm ${column.className || ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-3 sm:px-4 py-3 text-xs sm:text-sm ${column.className || ""}`}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}