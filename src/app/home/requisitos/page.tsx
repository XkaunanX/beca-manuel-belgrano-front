import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, User, GraduationCap, DollarSign, XCircle, FileText, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function RequisitosPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Requisitos de la Beca</h1>
              <p className="text-slate-600">Conoce todos los requisitos para acceder al beneficio</p>
            </div>
          </div>

          {/* Resumen de Requisitos */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Resumen de Requisitos Principales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Nacionalidad Argentina</p>
                    <p className="text-sm text-slate-600">Ser argentino nativo o naturalizado</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Edad: 18 a 30 años</p>
                    <p className="text-sm text-slate-600">Al momento de la inscripción</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Universidad Pública</p>
                    <p className="text-sm text-slate-600">Carrera de grado reconocida</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Carrera</p>
                    <p className="text-sm text-slate-600">Perteneciente a las áreas estratégicas del programa </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requisitos Detallados */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Requisitos Personales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Requisitos Personales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Ser argentino nativo o por naturalización</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Tener entre 18 y 30 años cumplidos</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Poseer DNI argentino vigente</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Tener CUIL/CUIT activo</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Residir en territorio argentino</span>
                </div>
              </CardContent>
            </Card>

            {/* Requisitos Académicos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                  Requisitos Académicos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Estar inscripto en universidad pública nacional</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Cursar carrera de grado de 4 años o más</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Mantener condición de alumno regular</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-sm">No haber recibido título de grado previo</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Aprobar al menos 75% de materias cursadas</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Requisitos Socioeconómicos */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Requisitos Socioeconómicos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Ingresos Familiares</h3>
                  <p className="text-sm text-blue-800">
                    El ingreso per cápita familiar no debe superar 3 Salarios Mínimos Vitales y Móviles (SMVM).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Se considera grupo familiar:</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                        <span>Solicitante</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                        <span>Cónyuge o pareja conviviente</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                        <span>Hijos menores de 18 años</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                        <span>Hijos entre 18-25 años estudiando</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                        <span>Personas con discapacidad a cargo</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Ingresos a declarar:</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                        <span>Sueldos y salarios</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                        <span>Jubilaciones y pensiones</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                        <span>Prestaciones sociales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                        <span>Ingresos por actividad independiente</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                        <span>Rentas de capital</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Incompatibilidades */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                Incompatibilidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-red-800 font-medium">La Beca Manuel Belgrano es incompatible con:</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span className="text-sm">Otras becas nacionales de estudio</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span className="text-sm">Beca Progresar</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span className="text-sm">Becas de investigación CONICET</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span className="text-sm">Relación de dependencia en el Estado</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span className="text-sm">Monotributo categoría superior a C</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span className="text-sm">Inscripción en Régimen General (AFIP)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/home/reglamento" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Ver Reglamento Completo
              </Button>
            </Link>
            <Link href="/home/ayuda" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                <HelpCircle className="h-4 w-4 mr-2" />
                Obtener Ayuda
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
