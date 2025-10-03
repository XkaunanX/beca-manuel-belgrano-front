/* estructura general para todas las rutas dentro de la carpeta. 
COMPONENTES COMUNES */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Centro de Ayuda - Beca Manuel Belgrano",
  description: "Preguntas frecuentes, tutoriales y contacto para estudiantes beneficiarios.",
};

export default function AyudaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-50`}
    >
      {/* Wrapper de la sección Ayuda */}
      <div className="ayuda-layout">
        {children}
      </div>
    </div>
  );
}
