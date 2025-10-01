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
  title: "Centro de Requisitos - Beca Manuel Belgrano",
  description: "Información sobre los requisitos para la Beca Manuel Belgrano",
};

export default function RequisitosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-50`}
    >
      {/* Wrapper de la sección Requisitos */}
      <div className="requisitos-layout">
        {children}
      </div>
    </div>
  );
}
