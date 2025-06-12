import Link from "next/link" // TODO mejorar codigo y SSR
import { RecuperarContrasenaForm } from "@/components/recuperar-contrasena-form"

export default function RecuperarContrasenaPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Formulario */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Recuperar contraseña</h2>
          <p className="text-slate-600 mb-6">
            Ingrese su correo electrónico o CUIT/CUIL para recibir instrucciones sobre cómo restablecer su contraseña.
          </p>

          <RecuperarContrasenaForm />

          <div className="mt-6 text-sm text-center">
            <p className="text-slate-600">¿Recordaste tu contraseña?</p>
            <Link href="/" className="text-blue-600 hover:underline font-medium">
              Volver al inicio de sesión
            </Link>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 p-3 border-t">
          <p>Ministerio de Educación de la Nación</p>
          <p>República Argentina © {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  )
}