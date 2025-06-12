"use client" // Mejorar CSR, codigo

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function RecuperarContrasenaForm() {
  const [metodo, setMetodo] = useState("email")
  const [identificacion, setIdentificacion] = useState("")
  const [error, setError] = useState("")
  const [enviado, setEnviado] = useState(false)

  const validarFormulario = () => {
    if (!identificacion.trim()) {
      setError("Este campo es obligatorio")
      return false
    }

    if (metodo === "email") {
      // Validar formato de email
      if (!/\S+@\S+\.\S+/.test(identificacion)) {
        setError("Ingrese un correo electrónico válido")
        return false
      }
    } else if (metodo === "cuitcuil") {
      // Validar CUIT/CUIL (11 dígitos numéricos)
      if (!/^\d{11}$/.test(identificacion)) {
        setError("El CUIT/CUIL debe tener 11 dígitos numéricos")
        return false
      }
    }

    setError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validarFormulario()) {
      // Aquí iría la lógica para enviar la solicitud al servidor
      console.log("Solicitud de recuperación enviada:", { metodo, identificacion })

      // Simular envío exitoso
      setEnviado(true)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentificacion(e.target.value)
    if (error) setError("")
  }

  if (enviado) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <AlertTitle className="text-green-800">Solicitud enviada</AlertTitle>
        <AlertDescription className="text-green-700">
          Hemos enviado instrucciones para restablecer su contraseña. Por favor, revise su bandeja de entrada
          {metodo === "email" ? ` (${identificacion})` : ""}.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <Label>Método de recuperación</Label>
        <RadioGroup defaultValue="email" value={metodo} onValueChange={setMetodo} className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="metodo-email" />
            <Label htmlFor="metodo-email" className="cursor-pointer">
              Correo electrónico
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cuitcuil" id="metodo-cuitcuil" />
            <Label htmlFor="metodo-cuitcuil" className="cursor-pointer">
              CUIT/CUIL
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="identificacion">
          {metodo === "email" ? "Correo electrónico" : "CUIT/CUIL"}
          <span className="text-red-500"> *</span>
        </Label>
        <Input
          id="identificacion"
          type={metodo === "email" ? "email" : "text"}
          value={identificacion}
          onChange={handleChange}
          placeholder={metodo === "email" ? "Ingrese su correo electrónico" : "Ingrese su CUIT/CUIL (11 dígitos)"}
          className={error ? "border-red-500" : ""}
        />
        {error && (
          <div className="flex items-center space-x-1 text-red-500 text-xs">
            <AlertCircle className="h-3 w-3" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="pt-2">
        <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
          Enviar instrucciones
        </Button>
      </div>
    </form>
  )
}
