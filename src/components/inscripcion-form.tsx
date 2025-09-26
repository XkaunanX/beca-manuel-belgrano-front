"use client"

import Link from "next/link"
import { useState } from "react"
import { Check, ChevronRight, HelpCircle, Info, Loader2, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

export function FormularioInscripcion() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Estado del formulario
  const [formData, setFormData] = useState({
    // Paso 1: Datos personales
    nombre: "",
    apellido: "",
    correo: "",
    fechaNacimiento: null as Date | null,
    estadoCivil: "",
    nacionalidad: "",
    cantidadHijos: "",
    grupoPrioritario: "",

    // Paso 2: Ubicación
    provincia: "",
    localidad: "",

    // Paso 3: Datos académicos
    institucionUniversitaria: "",
    unidadAcademica: "",
    carrera: "",
    anioIngresoUniversidad: "",
    semestreIngreso: "",
    duracionCarrera: "",
    situacionAcademica: "",
    materiasAprobadas: "",
    totalMateriasPlan: "",

    // Paso 4: Datos bancarios y confirmación
    sucursalBanco: "",
    aceptaTerminos: false,
  })

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  // Función para actualizar datos del formulario
  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Limpiar error del campo cuando se actualiza
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  // Validación simple por paso
  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (stepNumber) {
      case 1:
        if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido"
        if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido"
        if (!formData.correo.trim()) newErrors.correo = "El correo es requerido"
        if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es requerida"
        if (!formData.estadoCivil) newErrors.estadoCivil = "El estado civil es requerido"
        if (!formData.nacionalidad) newErrors.nacionalidad = "La nacionalidad es requerida"
        if (!formData.cantidadHijos) newErrors.cantidadHijos = "La cantidad de hijos es requerida"
        if (!formData.grupoPrioritario) newErrors.grupoPrioritario = "Este campo es requerido"
        break

      case 2:
        if (!formData.provincia) newErrors.provincia = "La provincia es requerida"
        if (!formData.localidad.trim()) newErrors.localidad = "La localidad es requerida"
        break

      case 3:
        if (!formData.institucionUniversitaria.trim())
          newErrors.institucionUniversitaria = "La institución es requerida"
        if (!formData.unidadAcademica.trim()) newErrors.unidadAcademica = "La unidad académica es requerida"
        if (!formData.carrera.trim()) newErrors.carrera = "La carrera es requerida"
        if (!formData.anioIngresoUniversidad) newErrors.anioIngresoUniversidad = "El año de ingreso es requerido"
        if (!formData.semestreIngreso) newErrors.semestreIngreso = "El semestre de ingreso es requerido"
        if (!formData.duracionCarrera) newErrors.duracionCarrera = "La duración de la carrera es requerida"
        if (!formData.situacionAcademica) newErrors.situacionAcademica = "La situación académica es requerida"
        if (!formData.materiasAprobadas) newErrors.materiasAprobadas = "Las materias aprobadas son requeridas"
        if (!formData.totalMateriasPlan) newErrors.totalMateriasPlan = "El total de materias es requerido"
        break

      case 4:
        if (!formData.sucursalBanco.trim()) newErrors.sucursalBanco = "La sucursal del banco es requerida"
        if (!formData.aceptaTerminos) newErrors.aceptaTerminos = "Debes aceptar los términos y condiciones"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Función para avanzar al siguiente paso
  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  // Función para retroceder al paso anterior
  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    if (validateStep(4)) {
      setIsSubmitting(true)

      // Simulación de envío al servidor
      setTimeout(() => {
        console.log("Datos del formulario:", formData)
        setIsSubmitting(false)
        setIsSubmitted(true)
        window.scrollTo(0, 0)
      }, 2000)
    }
  }

  // Renderizar el paso actual del formulario
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-slate-900">Datos Personales</h2>
              <p className="text-sm text-slate-500">Información básica personal</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={(e) => updateFormData("nombre", e.target.value)}
                  className={errors.nombre ? "border-red-500" : ""}
                />
                {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido *</Label>
                <Input
                  id="apellido"
                  placeholder="Tu apellido"
                  value={formData.apellido}
                  onChange={(e) => updateFormData("apellido", e.target.value)}
                  className={errors.apellido ? "border-red-500" : ""}
                />
                {errors.apellido && <p className="text-sm text-red-500">{errors.apellido}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="correo">Correo electrónico *</Label>
              <Input
                id="correo"
                type="email"
                placeholder="tu@email.com"
                value={formData.correo}
                onChange={(e) => updateFormData("correo", e.target.value)}
                className={errors.correo ? "border-red-500" : ""}
              />
              {errors.correo && <p className="text-sm text-red-500">{errors.correo}</p>}
            </div>

            <div className="space-y-2">
              <Label>Fecha de nacimiento *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.fechaNacimiento && "text-muted-foreground",
                      errors.fechaNacimiento && "border-red-500",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.fechaNacimiento ? (
                      format(formData.fechaNacimiento, "dd/MM/yyyy")
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.fechaNacimiento}
                    onSelect={(date) => updateFormData("fechaNacimiento", date)}
                    disabled={(date) => date > new Date() || date < new Date("1950-01-01")}
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
              {errors.fechaNacimiento && <p className="text-sm text-red-500">{errors.fechaNacimiento}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Estado civil *</Label>
                <Select value={formData.estadoCivil} onValueChange={(value) => updateFormData("estadoCivil", value)}>
                  <SelectTrigger className={errors.estadoCivil ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecciona tu estado civil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soltero">Soltero/a</SelectItem>
                    <SelectItem value="casado">Casado/a</SelectItem>
                    <SelectItem value="divorciado">Divorciado/a</SelectItem>
                    <SelectItem value="viudo">Viudo/a</SelectItem>
                    <SelectItem value="union_civil">Unión civil</SelectItem>
                  </SelectContent>
                </Select>
                {errors.estadoCivil && <p className="text-sm text-red-500">{errors.estadoCivil}</p>}
              </div>

              <div className="space-y-2">
                <Label>Nacionalidad *</Label>
                <Select value={formData.nacionalidad} onValueChange={(value) => updateFormData("nacionalidad", value)}>
                  <SelectTrigger className={errors.nacionalidad ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecciona tu nacionalidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="argentina">Argentina</SelectItem>
                    <SelectItem value="boliviana">Boliviana</SelectItem>
                    <SelectItem value="brasileña">Brasileña</SelectItem>
                    <SelectItem value="chilena">Chilena</SelectItem>
                    <SelectItem value="colombiana">Colombiana</SelectItem>
                    <SelectItem value="ecuatoriana">Ecuatoriana</SelectItem>
                    <SelectItem value="paraguaya">Paraguaya</SelectItem>
                    <SelectItem value="peruana">Peruana</SelectItem>
                    <SelectItem value="uruguaya">Uruguaya</SelectItem>
                    <SelectItem value="venezolana">Venezolana</SelectItem>
                    <SelectItem value="otra">Otra</SelectItem>
                  </SelectContent>
                </Select>
                {errors.nacionalidad && <p className="text-sm text-red-500">{errors.nacionalidad}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cantidadHijos">Cantidad de hijos *</Label>
                <Input
                  id="cantidadHijos"
                  type="number"
                  min="0"
                  value={formData.cantidadHijos}
                  onChange={(e) => updateFormData("cantidadHijos", e.target.value)}
                  className={errors.cantidadHijos ? "border-red-500" : ""}
                />
                <p className="text-sm text-slate-500">Ingresa 0 si no tienes hijos</p>
                {errors.cantidadHijos && <p className="text-sm text-red-500">{errors.cantidadHijos}</p>}
              </div>

              <div className="space-y-2">
                <Label>Grupo prioritario *</Label>
                <Select
                  value={formData.grupoPrioritario}
                  onValueChange={(value) => updateFormData("grupoPrioritario", value)}
                >
                  <SelectTrigger className={errors.grupoPrioritario ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ninguno">No pertenezco a ningún grupo prioritario</SelectItem>
                    <SelectItem value="pueblos_originarios">Pueblos originarios</SelectItem>
                    <SelectItem value="discapacidad">Personas con discapacidad</SelectItem>
                    <SelectItem value="trans">Personas trans</SelectItem>
                    <SelectItem value="refugiados">Refugiados</SelectItem>
                    <SelectItem value="otro">Otro grupo prioritario</SelectItem>
                  </SelectContent>
                </Select>
                {errors.grupoPrioritario && <p className="text-sm text-red-500">{errors.grupoPrioritario}</p>}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-slate-900">Ubicación</h2>
              <p className="text-sm text-slate-500">Información sobre tu ubicación</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Provincia *</Label>
                <Select value={formData.provincia} onValueChange={(value) => updateFormData("provincia", value)}>
                  <SelectTrigger className={errors.provincia ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecciona tu provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buenos_aires">Buenos Aires</SelectItem>
                    <SelectItem value="caba">Ciudad Autónoma de Buenos Aires</SelectItem>
                    <SelectItem value="catamarca">Catamarca</SelectItem>
                    <SelectItem value="chaco">Chaco</SelectItem>
                    <SelectItem value="chubut">Chubut</SelectItem>
                    <SelectItem value="cordoba">Córdoba</SelectItem>
                    <SelectItem value="corrientes">Corrientes</SelectItem>
                    <SelectItem value="entre_rios">Entre Ríos</SelectItem>
                    <SelectItem value="formosa">Formosa</SelectItem>
                    <SelectItem value="jujuy">Jujuy</SelectItem>
                    <SelectItem value="la_pampa">La Pampa</SelectItem>
                    <SelectItem value="la_rioja">La Rioja</SelectItem>
                    <SelectItem value="mendoza">Mendoza</SelectItem>
                    <SelectItem value="misiones">Misiones</SelectItem>
                    <SelectItem value="neuquen">Neuquén</SelectItem>
                    <SelectItem value="rio_negro">Río Negro</SelectItem>
                    <SelectItem value="salta">Salta</SelectItem>
                    <SelectItem value="san_juan">San Juan</SelectItem>
                    <SelectItem value="san_luis">San Luis</SelectItem>
                    <SelectItem value="santa_cruz">Santa Cruz</SelectItem>
                    <SelectItem value="santa_fe">Santa Fe</SelectItem>
                    <SelectItem value="santiago_del_estero">Santiago del Estero</SelectItem>
                    <SelectItem value="tierra_del_fuego">Tierra del Fuego</SelectItem>
                    <SelectItem value="tucuman">Tucumán</SelectItem>
                  </SelectContent>
                </Select>
                {errors.provincia && <p className="text-sm text-red-500">{errors.provincia}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="localidad">Localidad *</Label>
                <Input
                  id="localidad"
                  placeholder="Tu localidad"
                  value={formData.localidad}
                  onChange={(e) => updateFormData("localidad", e.target.value)}
                  className={errors.localidad ? "border-red-500" : ""}
                />
                {errors.localidad && <p className="text-sm text-red-500">{errors.localidad}</p>}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-slate-900">Datos Académicos</h2>
              <p className="text-sm text-slate-500">Información sobre tu educación universitaria</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="institucionUniversitaria">Institución universitaria *</Label>
                <Input
                  id="institucionUniversitaria"
                  placeholder="Universidad Nacional de..."
                  value={formData.institucionUniversitaria}
                  onChange={(e) => updateFormData("institucionUniversitaria", e.target.value)}
                  className={errors.institucionUniversitaria ? "border-red-500" : ""}
                />
                {errors.institucionUniversitaria && (
                  <p className="text-sm text-red-500">{errors.institucionUniversitaria}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="unidadAcademica">Unidad académica *</Label>
                <Input
                  id="unidadAcademica"
                  placeholder="Facultad, departamento o escuela"
                  value={formData.unidadAcademica}
                  onChange={(e) => updateFormData("unidadAcademica", e.target.value)}
                  className={errors.unidadAcademica ? "border-red-500" : ""}
                />
                {errors.unidadAcademica && <p className="text-sm text-red-500">{errors.unidadAcademica}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="carrera">Carrera *</Label>
              <Input
                id="carrera"
                placeholder="Nombre completo de la carrera"
                value={formData.carrera}
                onChange={(e) => updateFormData("carrera", e.target.value)}
                className={errors.carrera ? "border-red-500" : ""}
              />
              {errors.carrera && <p className="text-sm text-red-500">{errors.carrera}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Año de ingreso *</Label>
                <Select
                  value={formData.anioIngresoUniversidad}
                  onValueChange={(value) => updateFormData("anioIngresoUniversidad", value)}
                >
                  <SelectTrigger className={errors.anioIngresoUniversidad ? "border-red-500" : ""}>
                    <SelectValue placeholder="Año" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => 2025 - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.anioIngresoUniversidad && (
                  <p className="text-sm text-red-500">{errors.anioIngresoUniversidad}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Semestre de ingreso *</Label>
                <Select
                  value={formData.semestreIngreso}
                  onValueChange={(value) => updateFormData("semestreIngreso", value)}
                >
                  <SelectTrigger className={errors.semestreIngreso ? "border-red-500" : ""}>
                    <SelectValue placeholder="Semestre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primero">Primer semestre</SelectItem>
                    <SelectItem value="segundo">Segundo semestre</SelectItem>
                  </SelectContent>
                </Select>
                {errors.semestreIngreso && <p className="text-sm text-red-500">{errors.semestreIngreso}</p>}
              </div>

              <div className="space-y-2">
                <Label>Duración de la carrera *</Label>
                <Select
                  value={formData.duracionCarrera}
                  onValueChange={(value) => updateFormData("duracionCarrera", value)}
                >
                  <SelectTrigger className={errors.duracionCarrera ? "border-red-500" : ""}>
                    <SelectValue placeholder="Años" />
                  </SelectTrigger>
                  <SelectContent>
                    {[2, 3, 4, 5, 6, 7].map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year} años
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.duracionCarrera && <p className="text-sm text-red-500">{errors.duracionCarrera}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Situación académica *</Label>
                <Select
                  value={formData.situacionAcademica}
                  onValueChange={(value) => updateFormData("situacionAcademica", value)}
                >
                  <SelectTrigger className={errors.situacionAcademica ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ingresante">Ingresante</SelectItem>
                    <SelectItem value="regular">Alumno regular</SelectItem>
                    <SelectItem value="libre">Alumno libre</SelectItem>
                  </SelectContent>
                </Select>
                {errors.situacionAcademica && <p className="text-sm text-red-500">{errors.situacionAcademica}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="materiasAprobadas">Materias aprobadas *</Label>
                <Input
                  id="materiasAprobadas"
                  type="number"
                  min="0"
                  value={formData.materiasAprobadas}
                  onChange={(e) => updateFormData("materiasAprobadas", e.target.value)}
                  className={errors.materiasAprobadas ? "border-red-500" : ""}
                />
                {errors.materiasAprobadas && <p className="text-sm text-red-500">{errors.materiasAprobadas}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalMateriasPlan">Total materias del plan *</Label>
                <Input
                  id="totalMateriasPlan"
                  type="number"
                  min="0"
                  value={formData.totalMateriasPlan}
                  onChange={(e) => updateFormData("totalMateriasPlan", e.target.value)}
                  className={errors.totalMateriasPlan ? "border-red-500" : ""}
                />
                {errors.totalMateriasPlan && <p className="text-sm text-red-500">{errors.totalMateriasPlan}</p>}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-slate-900">Datos Bancarios y Confirmación</h2>
              <p className="text-sm text-slate-500">Información bancaria y aceptación de términos</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sucursalBanco">Sucursal del Banco de la Nación Argentina *</Label>
              <Input
                id="sucursalBanco"
                placeholder="Nombre o número de la sucursal"
                value={formData.sucursalBanco}
                onChange={(e) => updateFormData("sucursalBanco", e.target.value)}
                className={errors.sucursalBanco ? "border-red-500" : ""}
              />
              <p className="text-sm text-slate-500">Indica la sucursal donde tienes o abrirás tu cuenta</p>
              {errors.sucursalBanco && <p className="text-sm text-red-500">{errors.sucursalBanco}</p>}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Información importante</p>
                  <p>
                    Si aún no tienes una cuenta en el Banco de la Nación Argentina, deberás abrir una cuenta gratuita
                    para estudiantes si tu solicitud es aprobada.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border rounded-md p-4 space-y-3">
              <h3 className="text-base font-medium text-slate-900">Resumen de tu solicitud</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    <span className="font-medium">Nombre:</span> {formData.nombre} {formData.apellido}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {formData.correo}
                  </p>
                  <p>
                    <span className="font-medium">Nacionalidad:</span> {formData.nacionalidad}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">Carrera:</span> {formData.carrera}
                  </p>
                  <p>
                    <span className="font-medium">Institución:</span> {formData.institucionUniversitaria}
                  </p>
                  <p>
                    <span className="font-medium">Provincia:</span> {formData.provincia}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`flex items-start space-x-3 rounded-md border p-4 ${errors.aceptaTerminos ? "border-red-500" : ""}`}
            >
              <Checkbox
                id="aceptaTerminos"
                checked={formData.aceptaTerminos}
                onCheckedChange={(checked) => updateFormData("aceptaTerminos", checked)}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="aceptaTerminos" className="text-sm font-medium">
                  Declaración jurada y términos *
                </Label>
                <p className="text-sm text-slate-600">
                  Declaro bajo juramento que los datos consignados son correctos y completos. Acepto los{" "}
                  <Link href="/terminos" className="text-blue-600 hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  de la Beca Manuel Belgrano y autorizo el tratamiento de mis datos personales.
                </p>
              </div>
            </div>
            {errors.aceptaTerminos && <p className="text-sm text-red-500">{errors.aceptaTerminos}</p>}
          </div>
        )

      default:
        return null
    }
  }

  // Si el formulario ya fue enviado, mostrar mensaje de éxito
  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <Alert className="bg-green-50 border-green-200">
          <Check className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800">Solicitud enviada con éxito</AlertTitle>
          <AlertDescription className="text-green-700">
            Tu solicitud de inscripción ha sido recibida correctamente.
          </AlertDescription>
        </Alert>

        <div className="bg-white border rounded-md p-6 text-center">
          <h2 className="text-xl font-medium text-slate-900 mb-2">¡Gracias por tu solicitud!</h2>
          <p className="text-slate-600 mb-6">
            Hemos recibido tu solicitud para la Beca Manuel Belgrano 2025. El proceso de evaluación puede demorar hasta
            30 días hábiles.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/dashboard">Volver al inicio</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/estado">Ver estado de solicitud</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Barra de progreso */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">
            Paso {step} de {totalSteps}
          </span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Contenido del paso actual */}
      {renderStep()}

      {/* Botones de navegación */}
      <div className="flex justify-between pt-4 border-t">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={prevStep}>
            Anterior
          </Button>
        ) : (
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard">Cancelar</Link>
          </Button>
        )}

        {step < totalSteps ? (
          <Button type="button" onClick={nextStep}>
            Siguiente <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar solicitud"
            )}
          </Button>
        )}
      </div>

      {/* Ayuda */}
      <div className="flex justify-center pt-4">
        <Button variant="link" size="sm" className="text-slate-500">
          <HelpCircle className="mr-1 h-4 w-4" />
          ¿Necesitas ayuda?
        </Button>
      </div>
    </div>
  )
}

export default FormularioInscripcion