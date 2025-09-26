"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Info, Users } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import FormularioInscripcion from "@/components/inscripcion-form";

export default function InscripcionPage() {
    return (
        <main className="p-4 md:p-6">
            <div className="max-w-5xl mx-auto">
                <PageHeader
                    title="Inscripción a la Beca"
                    backLink="/dashboard"
                />

                <Card>
                    <CardHeader>
                        <CardTitle>Formulario de Inscripción</CardTitle>
                        <CardDescription>
                            Completa todos los campos requeridos para solicitar la Beca Manuel Belgrano 2025
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormularioInscripcion></FormularioInscripcion>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
