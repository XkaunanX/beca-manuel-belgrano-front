import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { ArrowLeft, Phone, Mail, Clock, FileText, Users, HelpCircle, BookOpen, ExternalLink } from "lucide-react"
import Link from "next/link"
export default function AyudaPage() {
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
              <h1 className="text-2xl font-bold text-slate-800">Centro de Ayuda</h1>
              <p className="text-slate-600">Encuentra respuestas a tus consultas</p>
            </div>
          </div>

          {/* Contacto */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contacto Directo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-sm text-slate-600">0800-555-BECA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-slate-600">ayuda@becabelgrano.gov.ar</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Horarios</p>
                    <p className="text-sm text-slate-600">Lun a Vie 9:00-17:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preguntas Frecuentes */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Preguntas Frecuentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>¿Cuáles son los requisitos para la beca?</AccordionTrigger>
                  <AccordionContent>
                    Para acceder a la Beca Manuel Belgrano debes ser argentino o naturalizado, tener entre 18 y 30 años,
                    estar cursando una carrera de grado en una universidad pública, y cumplir con los requisitos
                    socioeconómicos establecidos. Puedes ver todos los detalles en la sección de Requisitos.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>¿Cuándo se realizan los pagos?</AccordionTrigger>
                  <AccordionContent>
                    Los pagos se realizan mensualmente, generalmente el día 10 de cada mes. El monto se deposita
                    directamente en la cuenta bancaria que hayas declarado en tu solicitud. Puedes consultar el
                    historial de pagos en la sección de Cobros.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>¿Qué documentos necesito presentar?</AccordionTrigger>
                  <AccordionContent>
                    Necesitas presentar: DNI, certificado de alumno regular, constancia de CUIL, declaración jurada de
                    ingresos familiares, y comprobante de CBU. Todos los documentos deben estar vigentes y pueden
                    subirse en formato PDF desde la sección de Documentación.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>¿Cómo renuevo mi beca?</AccordionTrigger>
                  <AccordionContent>
                    La renovación debe realizarse anualmente. Recibirás una notificación cuando se abra el período de
                    renovación. Deberás actualizar tu documentación y confirmar que sigues cumpliendo con todos los
                    requisitos académicos y socioeconómicos.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>¿Puedo cambiar mis datos bancarios?</AccordionTrigger>
                  <AccordionContent>
                    Sí, puedes modificar tus datos bancarios desde tu perfil. Los cambios se aplicarán al siguiente pago
                    programado. Es importante que la cuenta esté a tu nombre y que proporciones el CBU correcto para
                    evitar demoras en los pagos.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>¿Qué pasa si cambio de carrera o universidad?</AccordionTrigger>
                  <AccordionContent>
                    Debes notificar inmediatamente cualquier cambio de carrera o universidad. La nueva carrera debe
                    cumplir con los requisitos de la beca. Contacta al centro de ayuda para evaluar si puedes mantener
                    el beneficio.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>¿Cómo consulto el estado de mi solicitud?</AccordionTrigger>
                  <AccordionContent>
                    Puedes consultar el estado de tu solicitud en tiempo real desde el dashboard principal o en la
                    sección "Estado de Solicitud". Allí verás si está en evaluación, aprobada, o si necesita
                    documentación adicional.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger>¿La beca es compatible con otras ayudas económicas?</AccordionTrigger>
                  <AccordionContent>
                    La Beca Manuel Belgrano es incompatible con otras becas nacionales, pero puede ser compatible con
                    algunas ayudas provinciales o municipales. Consulta el reglamento completo para conocer todas las
                    incompatibilidades.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Tutoriales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Tutoriales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Cómo completar la inscripción</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Guía paso a paso para completar tu solicitud de beca correctamente.
                  </p>
                <Button asChild size="sm" variant="outline">
                    <a href="https://youtu.be/W1oU9YHZPps?si=_R3pAELJUzheYW3C://example.com/tutorial.pdf" target="_blank" rel="noopener noreferrer">
                       Ver tutorial
                    </a>
                </Button>

                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Proceso de renovación</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Todo lo que necesitas saber para renovar tu beca anualmente.
                  </p>
                <Button asChild size="sm" variant="outline">
                    <a href="https://youtu.be/msf0AKCIYKs?si=NtkHLUboGLC8Km56://youtu.be/W1oU9YHZPps?si=_R3pAELJUzheYW3C://example.com/tutorial.pdf" target="_blank" rel="noopener noreferrer">
                       Ver tutorial
                    </a>
                </Button>

                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
