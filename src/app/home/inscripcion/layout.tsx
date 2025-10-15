import "@/app/globals.css";
import { Header } from "@/components/header";
import { Toaster } from "react-hot-toast";

export default function InscripcionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="inscripcion-layout">  
      {/* Si querés mostrar el header en este layout, descomentá la línea siguiente */}
      {/* <Header /> */}

      {children}

      {/* Componente que renderiza las notificaciones toast */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}