"use client" // TODO Mejorar CSR, codigo

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function RegistroForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    apellido: "",
    nombre: "",
    esArgentino: "si",
    cuitCuil: "",
    email: "",
    genero: "",
    usuario: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error cuando el usuario comienza a corregir
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error cuando el usuario comienza a corregir
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validar campos requeridos
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido"
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido"

    // Validar CUIT/CUIL (11 dígitos numéricos)
    if (!formData.cuitCuil.trim()) {
      newErrors.cuitCuil = "El CUIT/CUIL es requerido"
    } else if (!/^\d{11}$/.test(formData.cuitCuil)) {
      newErrors.cuitCuil = "El CUIT/CUIL debe tener 11 dígitos numéricos"
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ingrese un correo electrónico válido"
    }

    // Validar género
    if (!formData.genero) newErrors.genero = "Seleccione un género"

    // Validar usuario
    if (!formData.usuario.trim()) {
      newErrors.usuario = "El nombre de usuario es requerido"
    } else if (formData.usuario.length < 4) {
      newErrors.usuario = "El usuario debe tener al menos 4 caracteres"
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    }

    // Validar confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Aquí iría la lógica para enviar los datos al servidor
      alert("Formulario enviado correctamente. En un entorno real, esto registraría al usuario.")
      console.log("Datos del formulario:", formData)
    } else {
      console.log("Formulario con errores")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="apellido">
            Apellido <span className="text-red-500">*</span>
          </Label>
          <Input
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Ingrese su apellido"
            className={errors.apellido ? "border-red-500" : ""}
          />
          {errors.apellido && <p className="text-red-500 text-xs">{errors.apellido}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nombre">
            Nombre <span className="text-red-500">*</span>
          </Label>
          <Input
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingrese su nombre"
            className={errors.nombre ? "border-red-500" : ""}
          />
          {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          ¿Es argentino? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup
          defaultValue="si"
          value={formData.esArgentino}
          onValueChange={(value) => handleSelectChange(value, "esArgentino")}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="si" id="argentino-si" />
            <Label htmlFor="argentino-si" className="cursor-pointer">
              Sí
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="argentino-no" />
            <Label htmlFor="argentino-no" className="cursor-pointer">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cuitCuil">
          CUIT/CUIL <span className="text-red-500">*</span>
        </Label>
        <Input
          id="cuitCuil"
          name="cuitCuil"
          value={formData.cuitCuil}
          onChange={handleChange}
          placeholder="Ingrese su CUIT/CUIL (11 dígitos)"
          className={errors.cuitCuil ? "border-red-500" : ""}
        />
        {errors.cuitCuil && <p className="text-red-500 text-xs">{errors.cuitCuil}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Correo electrónico <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ingrese su correo electrónico"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="genero">
          Género <span className="text-red-500">*</span>
        </Label>
        <Select value={formData.genero} onValueChange={(value) => handleSelectChange(value, "genero")}>
          <SelectTrigger id="genero" className={errors.genero ? "border-red-500" : ""}>
            <SelectValue placeholder="Seleccione su género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="masculino">Masculino</SelectItem>
            <SelectItem value="femenino">Femenino</SelectItem>
            <SelectItem value="no-binario">No binario</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
            <SelectItem value="prefiero-no-decir">Prefiero no decir</SelectItem>
          </SelectContent>
        </Select>
        {errors.genero && <p className="text-red-500 text-xs">{errors.genero}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="usuario">
          Nombre de usuario <span className="text-red-500">*</span>
        </Label>
        <Input
          id="usuario"
          name="usuario"
          value={formData.usuario}
          onChange={handleChange}
          placeholder="Elija un nombre de usuario"
          className={errors.usuario ? "border-red-500" : ""}
        />
        {errors.usuario && <p className="text-red-500 text-xs">{errors.usuario}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          Contraseña <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Cree una contraseña"
            className={errors.password ? "border-red-500" : ""}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
          </Button>
        </div>
        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirmar contraseña <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repita su contraseña"
            className={errors.confirmPassword ? "border-red-500" : ""}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            <span className="sr-only">{showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
          </Button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
      </div>

      <div className="pt-4">
        <Button type="submit" className="w-full">
          Registrarse
        </Button>
      </div>
    </form>
  )
}
