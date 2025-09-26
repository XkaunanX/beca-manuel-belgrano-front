import "@/app/globals.css";
import { Header } from "@/components/header";

export default function InscripcionLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="Inscripcion-layout">
            {children}
        </div>
    );
}
