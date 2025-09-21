import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Download, FileText, HelpCircle, Info } from "lucide-react"

export default function ReglamentoPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />

      <main className="p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" asChild className="mr-2">
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Volver
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-slate-800">Información sobre la Beca</h1>
            </div>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Download className="h-4 w-4 mr-1" />
              Descargar reglamento completo
            </Button>
          </div>

          <Tabs defaultValue="reglamento" className="w-full mb-6">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-6">
              <TabsTrigger value="reglamento">Reglamento General</TabsTrigger>
              <TabsTrigger value="renovacion">Criterios de Renovación</TabsTrigger>
              <TabsTrigger value="cambios">Cambios de Carrera</TabsTrigger>
            </TabsList>

            {/* Reglamento General */}
            <TabsContent value="reglamento">
              <Card>
                <CardHeader>
                  <CardTitle>Reglamento General</CardTitle>
                  <CardDescription>Normativa que regula el funcionamiento de la Beca Manuel Belgrano</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                      <div className="text-sm text-blue-700">
                        <p className="font-medium mb-1">Información importante</p>
                        <p>
                          La Beca Manuel Belgrano está destinada a promover el estudio de carreras científicas y
                          técnicas consideradas estratégicas para el desarrollo económico y productivo del país.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-base font-medium">Objetivos de la Beca</AccordionTrigger>
                      <AccordionContent className="text-slate-700 space-y-2">
                        <p>
                          La Beca Manuel Belgrano tiene como objetivo principal fortalecer el acceso, la permanencia y
                          la graduación de estudiantes en campos estratégicos para el desarrollo económico, productivo y
                          sustentable del país, incluyendo:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Ciencias aplicadas</li>
                          <li>Ciencias naturales</li>
                          <li>Ciencias exactas</li>
                          <li>Ingeniería y tecnología</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-base font-medium">Destinatarios</AccordionTrigger>
                      <AccordionContent className="text-slate-700 space-y-2">
                        <p>Pueden acceder a la Beca Manuel Belgrano:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Estudiantes argentinos nativos o por opción</li>
                          <li>Estudiantes extranjeros con residencia permanente en el país</li>
                          <li>
                            Estudiantes de universidades nacionales, provinciales o institutos universitarios nacionales
                          </li>
                          <li>
                            Estudiantes de carreras de grado y pregrado incluidas en el listado de carreras prioritarias
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-base font-medium">Requisitos Académicos</AccordionTrigger>
                      <AccordionContent className="text-slate-700 space-y-2">
                        <p>Para acceder a la beca, los estudiantes deben:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Ser alumno regular de una carrera incluida en el programa</li>
                          <li>Para ingresantes: haber finalizado los estudios secundarios</li>
                          <li>
                            Para estudiantes avanzados: haber aprobado al menos dos (2) materias en el año anterior
                          </li>
                          <li>Tener hasta 30 años de edad (35 años para estudiantes de carreras de ingeniería)</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-base font-medium">Requisitos Socioeconómicos</AccordionTrigger>
                      <AccordionContent className="text-slate-700 space-y-2">
                        <p>
                          Los ingresos mensuales del grupo familiar no deben superar el monto equivalente a tres (3)
                          Salarios Mínimos, Vitales y Móviles (SMVM).
                        </p>
                        <p>Se consideran los ingresos de todos los integrantes del grupo familiar, incluyendo:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Ingresos formales (trabajo en relación de dependencia, autónomos, monotributistas)</li>
                          <li>Jubilaciones y pensiones</li>
                          <li>Asignación Universal por Hijo</li>
                          <li>Otros programas sociales</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-base font-medium">Duración y Montos</AccordionTrigger>
                      <AccordionContent className="text-slate-700 space-y-2">
                        <p>
                          La beca tiene una duración de 12 meses, pudiendo renovarse anualmente si se cumplen los
                          requisitos establecidos.
                        </p>
                        <p>
                          El monto mensual de la beca para el año 2025 es de $80,000 (ochenta mil pesos), pagaderos en
                          12 cuotas mensuales.
                        </p>
                        <p>
                          Este monto puede ser actualizado según lo determine el Ministerio de Educación de la Nación.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                      <AccordionTrigger className="text-base font-medium">Incompatibilidades</AccordionTrigger>
                      <AccordionContent className="text-slate-700 space-y-2">
                        <p>La Beca Manuel Belgrano es incompatible con:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Becas similares otorgadas por el Ministerio de Educación de la Nación</li>
                          <li>Becas de otros organismos públicos nacionales</li>
                          <li>
                            Beneficios cuya suma total supere el monto equivalente a tres (3) Salarios Mínimos, Vitales
                            y Móviles
                          </li>
                        </ul>
                        <p>
                          No es incompatible con la percepción de beneficios de carácter académico o estímulos
                          económicos otorgados por las instituciones educativas.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      <FileText className="h-4 w-4 mr-2" />
                      Ver listado de carreras prioritarias
                    </Button>
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Preguntas frecuentes
                    </Button>
                    <Button className="sm:hidden w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar reglamento completo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Criterios de Renovación */}
            <TabsContent value="renovacion">
              <Card>
                <CardHeader>
                  <CardTitle>Criterios de Renovación</CardTitle>
                  <CardDescription>
                    Requisitos para renovar la Beca Manuel Belgrano para el siguiente período
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                      <div className="text-sm text-blue-700">
                        <p className="font-medium mb-1">Información importante</p>
                        <p>
                          La renovación de la beca no es automática. Debes cumplir con los requisitos académicos y
                          socioeconómicos, y realizar el trámite de renovación en las fechas establecidas.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-slate-800 mb-3">Requisitos Académicos para Renovación</h3>
                      <div className="bg-white border rounded-md p-4">
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              1
                            </div>
                            <div>
                              <p className="font-medium">Condición de alumno regular</p>
                              <p className="text-sm text-slate-600">
                                Mantener la condición de alumno regular en la carrera por la cual se otorgó la beca.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              2
                            </div>
                            <div>
                              <p className="font-medium">Aprobación de materias</p>
                              <p className="text-sm text-slate-600">
                                Haber aprobado al menos el 50% de las materias cursadas durante el año académico
                                anterior.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              3
                            </div>
                            <div>
                              <p className="font-medium">Promedio académico</p>
                              <p className="text-sm text-slate-600">
                                Mantener un promedio académico igual o superior a 6 puntos (incluyendo aplazos).
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              4
                            </div>
                            <div>
                              <p className="font-medium">Certificación académica</p>
                              <p className="text-sm text-slate-600">
                                Presentar certificado de alumno regular actualizado y certificado analítico de materias
                                aprobadas.
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-slate-800 mb-3">
                        Requisitos Socioeconómicos para Renovación
                      </h3>
                      <div className="bg-white border rounded-md p-4">
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              1
                            </div>
                            <div>
                              <p className="font-medium">Ingresos familiares</p>
                              <p className="text-sm text-slate-600">
                                Los ingresos del grupo familiar no deben superar el monto equivalente a tres (3)
                                Salarios Mínimos, Vitales y Móviles.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              2
                            </div>
                            <div>
                              <p className="font-medium">Actualización de datos</p>
                              <p className="text-sm text-slate-600">
                                Informar cualquier cambio en la situación socioeconómica familiar que pudiera afectar la
                                condición de becario.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              3
                            </div>
                            <div>
                              <p className="font-medium">Documentación respaldatoria</p>
                              <p className="text-sm text-slate-600">
                                Presentar la documentación que acredite la situación socioeconómica declarada (recibos
                                de sueldo, declaración jurada, etc.).
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-slate-800 mb-3">Proceso de Renovación</h3>
                      <div className="bg-white border rounded-md p-4">
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              1
                            </div>
                            <div>
                              <p className="font-medium">Solicitud de renovación</p>
                              <p className="text-sm text-slate-600">
                                Completar el formulario de renovación en la plataforma web durante el período
                                establecido (generalmente entre julio y agosto).
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              2
                            </div>
                            <div>
                              <p className="font-medium">Presentación de documentación</p>
                              <p className="text-sm text-slate-600">
                                Subir la documentación requerida en formato digital a través de la plataforma.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              3
                            </div>
                            <div>
                              <p className="font-medium">Evaluación</p>
                              <p className="text-sm text-slate-600">
                                El comité evaluador analizará el cumplimiento de los requisitos académicos y
                                socioeconómicos.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              4
                            </div>
                            <div>
                              <p className="font-medium">Notificación</p>
                              <p className="text-sm text-slate-600">
                                Se notificará el resultado de la solicitud de renovación a través de la plataforma y por
                                correo electrónico.
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                      <div className="flex">
                        <Info className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                        <div className="text-sm text-yellow-700">
                          <p className="font-medium mb-1">Importante</p>
                          <p>
                            El incumplimiento de cualquiera de los requisitos establecidos puede resultar en la no
                            renovación de la beca. Es responsabilidad del becario mantenerse informado sobre las fechas
                            y requisitos del proceso de renovación.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cambios de Carrera */}
            <TabsContent value="cambios">
              <Card>
                <CardHeader>
                  <CardTitle>Cambios de Carrera</CardTitle>
                  <CardDescription>
                    Normativa sobre cambios de carrera para becarios de la Beca Manuel Belgrano
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                      <div className="text-sm text-blue-700">
                        <p className="font-medium mb-1">Información importante</p>
                        <p>
                          Los cambios de carrera están permitidos bajo ciertas condiciones y deben ser informados y
                          aprobados para mantener la beca.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-base font-medium">Condiciones Generales</AccordionTrigger>
                      <AccordionContent className="text-slate-700 space-y-2">
                        <p>
                          Los becarios pueden solicitar un cambio de carrera durante la vigencia de la beca, siempre que
                          se cumplan las siguientes condiciones:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>
                            La nueva carrera debe estar incluida en el listado de carreras prioritarias de la Beca
                            Manuel Belgrano.
                          </li>
                          <li>
                            El cambio debe realizarse dentro de la misma institución educativa o a otra institución
                            participante del programa.
                          </li>
                          <li>El becario debe mantener la condición de alumno regular durante el proceso de cambio.</li>
                          <li>Solo se permite un (1) cambio de carrera durante toda la duración de la beca.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-base font-medium">
                        Procedimiento para Solicitar un Cambio
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-700 space-y-2">
                        <p>Para solicitar un cambio de carrera, el becario debe:</p>
                        <ol className="list-decimal pl-5 space-y-1">
                          <li>
                            Completar el formulario de solicitud de cambio de carrera disponible en la plataforma.
                          </li>
                          <li>Adjuntar constancia de inscripción en la nueva carrera.</li>
                          <li>Presentar certificado de materias aprobadas en la carrera anterior.</li>
                          <li>Adjuntar una nota explicando los motivos del cambio de carrera.</li>
                          <li>Esperar la aprobación del comité evaluador antes de efectivizar el cambio.</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-base font-medium">Plazos y Consideraciones</AccordionTrigger>
                      <AccordionContent className="text-slate-700 space-y-2">
                        <p>La solicitud de cambio de carrera debe presentarse:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Durante el período de renovación de la beca (preferentemente).</li>
                          <li>
                            En caso de realizarse fuera del período de renovación, debe presentarse con al menos 30 días
                            de anticipación al inicio del nuevo ciclo lectivo.
                          </li>
                        </ul>
                        <p className="mt-2">
                          El comité evaluador analizará cada caso particular y podrá solicitar documentación adicional
                          si lo considera necesario.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-base font-medium">
                        Equivalencias y Reconocimiento de Materias
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-700 space-y-2">
                        <p>Para la evaluación del rendimiento académico en caso de cambio de carrera:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Se considerarán las materias aprobadas por equivalencia en la nueva carrera.</li>
                          <li>
                            El cómputo de materias aprobadas se realizará en función del plan de estudios de la nueva
                            carrera.
                          </li>
                          <li>
                            El becario deberá presentar el certificado de equivalencias aprobadas emitido por la
                            institución educativa.
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-base font-medium">Cambios entre Instituciones</AccordionTrigger>
                      <AccordionContent className="text-slate-700 space-y-2">
                        <p>En caso de cambio de carrera que implique también un cambio de institución educativa:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>La nueva institución debe estar incluida en el programa de Becas Manuel Belgrano.</li>
                          <li>El becario deberá presentar constancia de baja de la institución anterior.</li>
                          <li>Deberá presentar constancia de inscripción y admisión en la nueva institución.</li>
                          <li>
                            El trámite de equivalencias es responsabilidad exclusiva del becario y debe realizarse según
                            los procedimientos de cada institución.
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                      <AccordionTrigger className="text-base font-medium">Casos Especiales</AccordionTrigger>
                      <AccordionContent className="text-slate-700 space-y-2">
                        <p>En situaciones excepcionales, el comité evaluador podrá considerar:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Cambios de carrera por razones de salud debidamente justificadas.</li>
                          <li>Cambios por cierre o discontinuidad de la carrera original.</li>
                          <li>Cambios por traslado familiar obligatorio (trabajo, salud).</li>
                        </ul>
                        <p className="mt-2">
                          Estos casos requieren documentación adicional que respalde la situación excepcional y serán
                          evaluados individualmente.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-6">
                    <div className="flex">
                      <Info className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                      <div className="text-sm text-yellow-700">
                        <p className="font-medium mb-1">Importante</p>
                        <p>
                          La aprobación del cambio de carrera no implica automáticamente la renovación de la beca. El
                          becario deberá cumplir con todos los requisitos académicos y socioeconómicos establecidos para
                          la renovación.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      Solicitar cambio de carrera
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
