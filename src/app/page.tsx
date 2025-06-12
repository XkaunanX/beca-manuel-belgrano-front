import Link from "next/link" // TODO Mejorar Codigo, Mejorar SRR
import { CaptchaForm } from "@/components/captcha-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Imagen a la izquierda */}
          <div
            className="w-full md:w-2/5 bg-blue-700 relative"
            style={{
              backgroundImage: "url('/aacs.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          > 
          </div>
          {/* Formulario a la derecha */}
          <div className="w-full md:w-3/5 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Iniciar sesión</h2>

            <CaptchaForm />

            <div className="flex justify-between mt-6 text-sm">
              <Link href="/auth/register/" className="text-blue-600 hover:underline">
                Registrarse
              </Link>
              <Link href="/auth/recover-password/" className="text-blue-600 hover:underline">
                Olvidé mi contraseña
              </Link>
            </div>
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
