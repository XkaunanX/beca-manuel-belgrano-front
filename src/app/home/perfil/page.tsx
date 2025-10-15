"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

interface ProfileData {
  nombre: string;
  apellido: string;
  dni: string;
  fecha_nacimiento: string;
  email: string;
}

export default function PerfilPage() {
  const { user, scholarship, handleLogout, loading: authLoading } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({
    nombre: "",
    apellido: "",
    dni: "",
    fecha_nacimiento: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const nombreCompleto = user.name?.split(" ") || [];
    const nombre = scholarship?.name || nombreCompleto[0] || "";
    const apellido = scholarship?.last_name || nombreCompleto.slice(1).join(" ") || "";
    const dni = scholarship?.cuit || ""; // o usar dni si lo tenés
    const fecha_nacimiento = scholarship?.date_birth || "";
    const email = user.email || "";

    setProfileData({ nombre, apellido, dni, fecha_nacimiento, email });
    setLoading(false);
  }, [user, scholarship]);

  const getDisplayValue = (value?: string | null) => value || "No disponible";

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-lg">Cargando perfil...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" asChild className="mr-2">
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Volver
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-slate-800">Mi Perfil</h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt="Foto de perfil" />
                  <AvatarFallback className="text-lg">
                    {getDisplayValue(profileData.nombre).charAt(0)}
                    {getDisplayValue(profileData.apellido).charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-slate-800">
                    {getDisplayValue(profileData.nombre)}{" "}
                    {getDisplayValue(profileData.apellido)}
                  </h2>
                  <p className="text-slate-600">DNI: {getDisplayValue(profileData.dni)}</p>
                  <p className="text-slate-600">Email: {getDisplayValue(profileData.email)}</p>
                  <p className="text-slate-600">
                    Fecha de nacimiento: {getDisplayValue(profileData.fecha_nacimiento)}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                    <Badge variant="secondary">
                      {scholarship?.state ? scholarship.state.replace(/_/g, " ") : "Estado no disponible"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
