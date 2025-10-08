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
  title: "Mi perfil - Beca Manuel Belgrano",
  description: "Informacion personal del usuario.",
};

export default function MiPerfilLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-50`}
    >
      {/* Wrapper de la sección mi perfil */}
      <div className="ayuda-layout">
        {children}
      </div>
    </div>
  );
}
