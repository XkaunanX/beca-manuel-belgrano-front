import Link from "next/link" // Mejorar codigo y SSR
import RegistroForm from "@/components/registro-form"

export default function RegistroPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Formulario */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Registro de nuevo usuario</h2>
          <p className="text-slate-600 mb-6">Complete el siguiente formulario para solicitar la Beca Manuel Belgrano</p>

          <RegistroForm />

          <div className="mt-6 text-sm text-center">
            <p className="text-slate-600">¿Ya tienes una cuenta?</p>
            <Link href="/" className="text-blue-600 hover:underline font-medium">
              Iniciar sesión
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
