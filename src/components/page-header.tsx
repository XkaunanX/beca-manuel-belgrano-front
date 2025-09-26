"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Users } from "lucide-react";

interface PageHeaderProps {
  title: string;
  backLink?: string;
  backText?: string;
  showMeta?: boolean; // si luego quieres ocultar metaItems
  convocatoria?: string;
  plazo?: string;
}

export function PageHeader({
  title,
  backLink = "/dashboard",
  backText = "Volver",
  showMeta = true,
  convocatoria = "Convocatoria 2025",
  plazo = "30/05/2025",
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Sección izquierda: botón volver + título */}
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href={backLink} className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            {backText}
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      </div>

      {/* Sección derecha: meta items */}
      {showMeta && (
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center text-sm text-slate-600">
            <Calendar className="h-4 w-4 mr-1" />
            {convocatoria}
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Users className="h-4 w-4 mr-1" />
            Plazo: {plazo}
          </div>
        </div>
      )}
    </div>
  );
}
