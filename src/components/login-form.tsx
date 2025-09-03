'use client'; //Marca el archivo como Client Component -> Habilita hooks (useState, useEffect), manejadores de eventos y acceso al DOM en el navegador

import React, { useState } from "react"; // El hook useState en React sirve para crear y manejar estado en un componente funcional
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export function LoginForm() { // Definicion del componente funcional
  const { handleLogin, loading, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string[] | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const data = await handleLogin({ email, password });
      setSuccess(`¡Bienvenido, ${data.user?.name || "usuario"}!`);
      // Redirigir segun roles
      const roles = data.user?.roles || [];
      if (roles.includes("admin")) {
        router.push("/admin");
      } else if (roles.includes("reviewer")) {
        router.push("/reviewer");
      } else {
        router.push("/home");
      }
    } catch (err: any) {
      if (err.type === "validation") {
        setError(err.messages);
      } else if (err.type === "auth") {
        setError([err.message]);
      } else {
        setError([err.message]);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4"> {/*Formulario con handler onSubmit eliminar el alert de abajo*/}
      {error && (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-5 w-5" />
          <div>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.length === 1 ? (
                <p>{error[0]}</p>
              ) : (
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {error.map((errMsg, idx) => (
                    <li key={idx}>{errMsg}</li>
                  ))}
                </ul>
              )}
            </AlertDescription>
          </div>
        </Alert>
      )}

      {success && (
        <Alert variant="default">
          <AlertTitle>Login exitoso</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full mt-6 bg-blue-700 hover:bg-blue-800"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
}
