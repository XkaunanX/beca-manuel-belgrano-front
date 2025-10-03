"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Check, ChevronRight, HelpCircle, Info, Loader2, CalendarIcon, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

// ---------- IMPORTS CORREGIDOS a las .ts que vos tenés ----------
import { getCivilStatuses } from "@/services/civilStatus"
import { getNationalities } from "@/services/nationality"
import { getInstitutions } from "@/services/institution"
import { getProvinces } from "@/services/province"
import { getVulnerableGroups } from "@/services/vulnerable"
// -----------------------------------------------------------------

// Datos fallback (si tu backend todavía no tiene algunos endpoints, estos sirven como respaldo)
const localidadesFallback = [
  "Buenos Aires",
  "La Plata",
  "Mar del Plata",
  "Bahía Blanca",
  "Tandil",
  "Olavarría",
  "Junín",
  "Pergamino",
  "Córdoba",
  "Villa María",
  "Río Cuarto",
  "San Francisco",
  "Villa Carlos Paz",
  "Rosario",
  "Santa Fe",
  "Rafaela",
  "Venado Tuerto",
  "Reconquista",
  "Mendoza",
  "San Rafael",
  "Godoy Cruz",
  "Maipú",
  "Luján de Cuyo",
  "Tucumán",
  "Yerba Buena",
  "Banda del Río Salí",
  "Tafí Viejo",
  "Salta",
  "San Salvador de Jujuy",
  "Palpalá",
  "Perico",
  "Neuquén",
  "Cipolletti",
  "Plottier",
  "Centenario",
  "Bariloche",
  "Viedma",
  "General Roca",
  "Cinco Saltos",
  "Comodoro Rivadavia",
  "Puerto Madryn",
  "Trelew",
  "Esquel",
  "Posadas",
  "Oberá",
  "Eldorado",
  "Puerto Iguazu",
  "Corrientes",
  "Goya",
  "Mercedes",
  "Paso de los Libres",
  "Resistencia",
  "Barranqueras",
  "Fontana",
  "Puerto Vilelas",
  "Formosa",
  "Clorinda",
  "Pirané",
  "El Colorado",
  "Paraná",
  "Concordia",
  "Gualeguaychú",
  "Concepción del Uruguay",
  "Santiago del Estero",
  "La Banda",
  "Termas de Río Hondo",
  "Añatuya",
  "San Juan",
  "Rivadavia",
  "Chimbas",
  "Rawson",
  "San Luis",
  "Villa Mercedes",
  "Merlo",
  "Juana Koslay",
  "Catamarca",
  "San Fernando del Valle de Catamarca",
  "Belén",
  "Tinogasta",
  "La Rioja",
  "Chilecito",
  "Aimogasta",
  "Chepes",
  "Santa Rosa",
  "General Pico",
  "Toay",
  "Guatraché",
  "Río Gallegos",
  "Calafate",
  "Puerto Deseado",
  "Pico Truncado",
  "Ushuaia",
  "Río Grande",
  "Tolhuin",
]

const universidadesFallback = [
  "Universidad de Buenos Aires (UBA)",
  "Universidad Nacional de La Plata (UNLP)",
  "Universidad Nacional de Córdoba (UNC)",
  "Universidad Nacional del Litoral (UNL)",
  "Universidad Nacional de Rosario (UNR)",
  "Universidad Nacional de Cuyo (UNCuyo)",
  "Universidad Nacional de Tucumán (UNT)",
  "Universidad Nacional del Sur (UNS)",
  "Universidad Nacional de Mar del Plata (UNMdP)",
  "Universidad Nacional del Nordeste (UNNE)",
  "Universidad Nacional de Salta (UNSa)",
  "Universidad Nacional de San Juan (UNSJ)",
  "Universidad Nacional de San Luis (UNSL)",
  "Universidad Nacional de Entre Ríos (UNER)",
  "Universidad Nacional del Comahue (UNCo)",
  "Universidad Nacional de Misiones (UNaM)",
  "Universidad Nacional de Jujuy (UNJu)",
  "Universidad Nacional de Catamarca (UNCa)",
  "Universidad Nacional de La Rioja (UNLaR)",
  "Universidad Nacional de Santiago del Estero (UNSE)",
  "Universidad Nacional de Formosa (UNaF)",
  "Universidad Nacional de la Patagonia San Juan Bosco (UNPSJB)",
  "Universidad Nacional de la Patagonia Austral (UNPA)",
  "Universidad Nacional de Tierra del Fuego (UNTDF)",
  "Universidad Nacional de Río Negro (UNRN)",
  "Universidad Nacional de Villa María (UNVM)",
  "Universidad Nacional de Río Cuarto (UNRC)",
  "Universidad Nacional de Tres de Febrero (UNTREF)",
  "Universidad Nacional de San Martín (UNSAM)",
  "Universidad Nacional de Quilmes (UNQ)",
  "Universidad Nacional de Lanús (UNLa)",
  "Universidad Nacional de Avellaneda (UNDAV)",
  "Universidad Nacional Arturo Jauretche (UNAJ)",
  "Universidad Nacional del Oeste (UNO)",
  "Universidad Nacional de Moreno (UNM)",
  "Universidad Nacional de José C. Paz (UNPAZ)",
  "Universidad Nacional de Hurlingham (UNAHUR)",
  "Universidad Nacional Raúl Scalabrini Ortiz (UNSO)",
  "Universidad Tecnológica Nacional (UTN)",
  "Universidad Nacional de La Matanza (UNLaM)",
  "Universidad Nacional de Lomas de Zamora (UNLZ)",
  "Universidad Nacional del Centro de la Provincia de Buenos Aires (UNICEN)",
]

const unidadesAcademicasFallback = [
  "Facultad de Medicina",
  "Facultad de Derecho",
  "Facultad de Ingeniería",
  "Facultad de Ciencias Económicas",
  "Facultad de Filosofía y Letras",
  "Facultad de Ciencias Exactas y Naturales",
  "Facultad de Ciencias Sociales",
  "Facultad de Psicología",
  "Facultad de Arquitectura, Diseño y Urbanismo",
  "Facultad de Ciencias Veterinarias",
  "Facultad de Agronomía",
  "Facultad de Odontología",
  "Facultad de Farmacia y Bioquímica",
  "Facultad de Ciencias de la Educación",
  "Facultad de Humanidades",
  "Facultad de Ciencias de la Salud",
  "Facultad de Ciencias Aplicadas",
  "Facultad de Ciencias Políticas",
  "Facultad de Comunicación Social",
  "Facultad de Artes",
  "Facultad de Educación Física",
  "Facultad de Turismo",
  "Facultad de Trabajo Social",
  "Escuela de Medicina",
  "Escuela de Enfermería",
  "Escuela de Nutrición",
  "Escuela de Kinesiología",
  "Departamento de Matemática",
  "Departamento de Física",
  "Departamento de Química",
  "Departamento de Biología",
  "Departamento de Historia",
  "Departamento de Geografía",
  "Departamento de Lenguas Modernas",
  "Instituto de Investigaciones",
  "Instituto de Ciencias",
  "Instituto de Tecnología",
]

const carrerasFallback = [
  "Medicina",
  "Abogacía",
  "Ingeniería Civil",
  "Ingeniería Industrial",
  "Ingeniería en Sistemas",
  "Ingeniería Electrónica",
  "Ingeniería Mecánica",
  "Ingeniería Química",
  "Contador Público",
  "Administración de Empresas",
  "Economía",
  "Psicología",
  "Arquitectura",
  "Veterinaria",
  "Agronomía",
  "Odontología",
  "Farmacia",
  "Bioquímica",
  "Enfermería",
  "Kinesiología",
  "Nutrición",
  "Trabajo Social",
  "Comunicación Social",
  "Periodismo",
  "Diseño Gráfico",
  "Diseño Industrial",
  "Bellas Artes",
  "Música",
  "Teatro",
  "Educación Física",
  "Profesorado en Matemática",
  "Profesorado en Historia",
  "Profesorado en Lengua y Literatura",
  "Profesorado en Inglés",
  "Profesorado en Biología",
  "Profesorado en Física",
  "Profesorado en Química",
  "Licenciatura en Matemática",
  "Licenciatura en Física",
  "Licenciatura en Química",
  "Licenciatura en Biología",
  "Licenciatura en Historia",
  "Licenciatura en Geografía",
  "Licenciatura en Filosofía",
  "Licenciatura en Letras",
  "Licenciatura en Sociología",
  "Licenciatura en Ciencias Políticas",
  "Licenciatura en Relaciones Internacionales",
  "Licenciatura en Turismo",
  "Licenciatura en Hotelería",
  "Tecnicatura en Programación",
  "Tecnicatura en Análisis de Sistemas",
  "Tecnicatura en Redes",
  "Tecnicatura en Electrónica",
  "Tecnicatura en Mecánica",
  "Tecnicatura en Construcciones",
  "Tecnicatura en Alimentos",
  "Tecnicatura en Laboratorio",
  "Tecnicatura en Radiología",
  "Tecnicatura en Hemoterapia",
]

const sucursalesBancoFallback = [
  "Sucursal Buenos Aires Centro",
  "Sucursal La Plata",
  "Sucursal Mar del Plata",
  "Sucursal Bahía Blanca",
  "Sucursal Tandil",
  "Sucursal Córdoba Centro",
  "Sucursal Villa María",
  "Sucursal Río Cuarto",
  "Sucursal Rosario Centro",
  "Sucursal Santa Fe",
  "Sucursal Rafaela",
  "Sucursal Mendoza Centro",
  "Sucursal San Rafael",
  "Sucursal Godoy Cruz",
  "Sucursal Tucumán Centro",
  "Sucursal Yerba Buena",
  "Sucursal Salta Centro",
  "Sucursal San Salvador de Jujuy",
  "Sucursal Neuquén Centro",
  "Sucursal Cipolletti",
  "Sucursal Bariloche",
  "Sucursal Viedma",
  "Sucursal Comodoro Rivadavia",
  "Sucursal Puerto Madryn",
  "Sucursal Posadas Centro",
  "Sucursal Oberá",
  "Sucursal Corrientes Centro",
  "Sucursal Resistencia Centro",
  "Sucursal Formosa Centro",
  "Sucursal Paraná Centro",
  "Sucursal Concordia",
  "Sucursal Santiago del Estero Centro",
  "Sucursal La Banda",
  "Sucursal San Juan Centro",
  "Sucursal San Luis Centro",
  "Sucursal Villa Mercedes",
  "Sucursal Catamarca Centro",
  "Sucursal La Rioja Centro",
  "Sucursal Santa Rosa",
  "Sucursal General Pico",
  "Sucursal Río Gallegos",
  "Sucursal Ushuaia",
  "Sucursal Río Grande",
]

// Componente FilterableCombobox (igual al tuyo)
function FilterableCombobox({
  value,
  onChange,
  options,
  placeholder,
  className,
  emptyMessage = "No se encontraron resultados.",
}: {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder: string
  className?: string
  emptyMessage?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {value ? options.find((option) => option === value) : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder={`Buscar ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option ? "opacity-100" : "opacity-0")} />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

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

    // Paso 3: Datos académicos (campos simplificados)
    institucionUniversitaria: "",
    unidadAcademica: "",
    carrera: "",
    anioIngresoUniversidad: "",
    semestreIngreso: "",

    // Paso 4: Datos bancarios
    sucursalBanco: "",
    aceptaTerminos: false,
  })

  // ---------- Estados para los datos que vendrán del backend ----------
  // Inicializo con fallbacks para no romper la UI si la API tarda o no existe.
  const [estadosCiviles, setEstadosCiviles] = useState<string[]>([
    "Soltero/a",
    "Casado/a",
    "Divorciado/a",
    "Viudo/a",
    "Unión civil",
  ])
  const [nacionalidades, setNacionalidades] = useState<string[]>([
    "Argentina",
    "Bolivia",
    "Brasil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Paraguay",
    "Perú",
    "Uruguay",
    "Venezuela",
    "Otra",
  ])
  const [provincias, setProvincias] = useState<string[]>([
    "Buenos Aires",
    "Ciudad Autónoma de Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán",
  ])
  const [gruposPrioritarios, setGruposPrioritarios] = useState<string[]>([
    "No pertenezco a ningún grupo prioritario",
    "Pueblos originarios",
    "Personas con discapacidad",
    "Personas trans",
    "Refugiados",
    "Otro",
  ])
  const [localidadesOptions, setLocalidadesOptions] = useState<string[]>(localidadesFallback)
  const [universidadesOptions, setUniversidadesOptions] = useState<string[]>(universidadesFallback)
  const [unidadesAcademicasOptions, setUnidadesAcademicasOptions] = useState<string[]>(unidadesAcademicasFallback)
  const [carrerasOptions, setCarrerasOptions] = useState<string[]>(carrerasFallback)
  const [sucursalesBancoOptions, setSucursalesBancoOptions] = useState<string[]>(sucursalesBancoFallback)

  // Si tu backend devuelve objetos {id,name}, también guardamos la lista cruda (por si la querés usar)
  const [institucionesRaw, setInstitucionesRaw] = useState<{ id: number; name: string }[]>([])

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  // Cargar datos desde tus .ts (corregidos imports)
  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      try {
        const [
          civilRes,
          natRes,
          provRes,
          vulRes,
          instRes,
        ] = await Promise.all([
          getCivilStatuses(),   // tus funciones .ts devuelven directamente el array (no response.data)
          getNationalities(),
          getProvinces(),
          getVulnerableGroups(),
          getInstitutions(),
        ])

        if (!mounted) return

        // Asigno directamente lo que retornan tus funciones (.ts)
        if (Array.isArray(civilRes) && civilRes.length > 0) {
          // Si tu servicio devuelve objetos {id,name} mapealos a strings; si devuelve strings, usan directamente
          if (typeof civilRes[0] === "object") {
            setEstadosCiviles((civilRes as any[]).map((c) => c.name))
          } else {
            setEstadosCiviles(civilRes as any)
          }
        }

        if (Array.isArray(natRes) && natRes.length > 0) {
          if (typeof natRes[0] === "object") {
            setNacionalidades((natRes as any[]).map((n) => n.name))
          } else {
            setNacionalidades(natRes as any)
          }
        }

        if (Array.isArray(provRes) && provRes.length > 0) {
          if (typeof provRes[0] === "object") {
            setProvincias((provRes as any[]).map((p) => p.name))
          } else {
            setProvincias(provRes as any)
          }
        }

        if (Array.isArray(vulRes) && vulRes.length > 0) {
          if (typeof vulRes[0] === "object") {
            setGruposPrioritarios((vulRes as any[]).map((v) => v.name))
          } else {
            setGruposPrioritarios(vulRes as any)
          }
        }

        if (Array.isArray(instRes) && instRes.length > 0) {
          if (typeof instRes[0] === "object") {
            setInstitucionesRaw(instRes as any[])
            setUniversidadesOptions((instRes as any[]).map((i) => i.name))
          } else {
            setUniversidadesOptions(instRes as any)
          }
        }
      } catch (err) {
        // si falla, dejamos los fallbacks y logueamos el error
        console.error("Error cargando datos del backend:", err)
      }
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, [])

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
                      // formData.fechaNacimiento es Date | null en tu componente original; si es Date -> format
                      typeof formData.fechaNacimiento === "object" && formData.fechaNacimiento
                        ? format(formData.fechaNacimiento as Date, "dd/MM/yyyy")
                        : String(formData.fechaNacimiento)
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
                    {estadosCiviles.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
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
                    {nacionalidades.map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
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
                    {gruposPrioritarios.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
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
                    {provincias.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.provincia && <p className="text-sm text-red-500">{errors.provincia}</p>}
              </div>

              <div className="space-y-2">
                <Label>Localidad *</Label>
                <FilterableCombobox
                  value={formData.localidad}
                  onChange={(value) => updateFormData("localidad", value)}
                  options={localidadesOptions}
                  placeholder="Selecciona tu localidad"
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

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Institución universitaria *</Label>
                <FilterableCombobox
                  value={formData.institucionUniversitaria}
                  onChange={(value) => updateFormData("institucionUniversitaria", value)}
                  options={universidadesOptions}
                  placeholder="Selecciona tu universidad"
                  className={errors.institucionUniversitaria ? "border-red-500" : ""}
                />
                {errors.institucionUniversitaria && (
                  <p className="text-sm text-red-500">{errors.institucionUniversitaria}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Unidad académica *</Label>
                <FilterableCombobox
                  value={formData.unidadAcademica}
                  onChange={(value) => updateFormData("unidadAcademica", value)}
                  options={unidadesAcademicasOptions}
                  placeholder="Selecciona la facultad/departamento"
                  className={errors.unidadAcademica ? "border-red-500" : ""}
                />
                {errors.unidadAcademica && <p className="text-sm text-red-500">{errors.unidadAcademica}</p>}
              </div>

              <div className="space-y-2">
                <Label>Carrera *</Label>
                <FilterableCombobox
                  value={formData.carrera}
                  onChange={(value) => updateFormData("carrera", value)}
                  options={carrerasOptions}
                  placeholder="Selecciona tu carrera"
                  className={errors.carrera ? "border-red-500" : ""}
                />
                {errors.carrera && <p className="text-sm text-red-500">{errors.carrera}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <Label>Sucursal del Banco de la Nación Argentina *</Label>
              <FilterableCombobox
                value={formData.sucursalBanco}
                onChange={(value) => updateFormData("sucursalBanco", value)}
                options={sucursalesBancoOptions}
                placeholder="Selecciona la sucursal"
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
          <div className="flex flex-col sm:flex-row gap-3 justificy-center">
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

export default FormularioInscripcion;
