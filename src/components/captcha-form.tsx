'use client';

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon, RefreshCwIcon } from "lucide-react"

export function CaptchaForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [captchaText, setCaptchaText] = useState("")

  // Generar un captcha aleatorio
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"
    let result = ""
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaText(result)
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logica de autenticacion ...
    alert("Formulario enviado, verificar credenciales")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="dni">DNI o Correo electrónico</Label>
        <Input id="dni" type="text" placeholder="Ingrese su DNI o correo electrónico" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input id="password" type={showPassword ? "text" : "password"} placeholder="Ingrese su contraseña" required />
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
      </div>

      <div className="space-y-2 pt-2">
        <Label htmlFor="captcha">Verificación de seguridad</Label>
        <div className="flex items-center space-x-2 mb-2">
          <div className="bg-slate-100 p-2 rounded text-center flex-1 relative">
            <div
              className="select-none font-mono text-lg tracking-widest text-slate-800 
                          relative z-10 font-bold"
              style={{
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                letterSpacing: "0.25em",
              }}
            >
              {captchaText}
            </div>
            {/* Líneas aleatorias para dificultar la lectura automática */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-slate-500"
                  style={{
                    height: "1px",
                    width: "100%",
                    top: `${Math.random() * 100}%`,
                    left: 0,
                    transform: `rotate(${Math.random() * 20 - 10}deg)`,
                  }}
                />
              ))}
            </div>
          </div>
          <Button type="button" variant="outline" size="icon" onClick={generateCaptcha} title="Generar nuevo captcha">
            <RefreshCwIcon className="h-4 w-4" />
            <span className="sr-only">Refrescar captcha</span>
          </Button>
        </div>
        <Input id="captcha" type="text" placeholder="Ingrese el texto de la imagen" required />
      </div>

      <Button type="submit" className="w-full mt-6 bg-blue-700 hover:bg-blue-800">
        Ingresar
      </Button>
    </form>
  )
}
