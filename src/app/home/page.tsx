"use client";
import { CustomAlert } from "@/components/custom-alert";
import { NoticesCard } from "@/components/notice-card"
import { AlertCircle, UserPlusIcon, ArrowRight } from "lucide-react";
import Link from "next/link"
import { ActionCard } from "@/components/action-card";

export default function Home() {
  return (
    <div>
      <main className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Bienvenido/a a la Beca Manuel Belgrano</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 space-y-4">
              <CustomAlert
                variant="blue"
                icon={AlertCircle}
                title="Convocatoria abierta 2025"
                description="La convocatoria para la Beca Manuel Belgrano 2025 está abierta hasta el 30 de mayo. ¡No olvides inscribirte a tiempo!"
              />
              <NoticesCard></NoticesCard>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <ActionCard
                title="Inscripción"
                description="Inscribite para el próximo período"
                content={<p>La inscripción estará abierta del 1 al 30 de junio de 2025.</p>}
                buttonText="Inscribirme"
                buttonLink="/dashboard/inscripcion"
                icon={UserPlusIcon}
              />
              <div className="bg-slate-100 rounded-lg p-4">
                <h3 className="font-medium text-slate-800 mb-2">Enlaces rápidos</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/dashboard/requisitos" className="text-blue-600 hover:underline text-sm flex items-center">
                      <ArrowRight className="mr-1 h-3 w-3" />
                      Requisitos académicos
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/calendario" className="text-blue-600 hover:underline text-sm flex items-center">
                      <ArrowRight className="mr-1 h-3 w-3" />
                      Calendario de pagos
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/faq" className="text-blue-600 hover:underline text-sm flex items-center">
                      <ArrowRight className="mr-1 h-3 w-3" />
                      Preguntas frecuentes
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/contacto" className="text-blue-600 hover:underline text-sm flex items-center">
                      <ArrowRight className="mr-1 h-3 w-3" />
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>


          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Calendario de pagos</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="px-4 py-2 text-left">Mes</th>
                    <th className="px-4 py-2 text-left">Estado</th>
                    <th className="px-4 py-2 text-left">Fecha de pago</th>
                    <th className="px-4 py-2 text-left">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3">Marzo 2025</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Pagado</span>
                    </td>
                    <td className="px-4 py-3">10/03/2025</td>
                    <td className="px-4 py-3">$80,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3">Abril 2025</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Pagado</span>
                    </td>
                    <td className="px-4 py-3">10/04/2025</td>
                    <td className="px-4 py-3">$80,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3">Mayo 2025</td>
                    <td className="px-4 py-3">
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pendiente</span>
                    </td>
                    <td className="px-4 py-3">10/05/2025</td>
                    <td className="px-4 py-3">$80,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Junio 2025</td>
                    <td className="px-4 py-3">
                      <span className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded-full">Programado</span>
                    </td>
                    <td className="px-4 py-3">10/06/2025</td>
                    <td className="px-4 py-3">$80,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}