import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  getCsrfCookie,
  login,
  logout,
  getProfile,
  register,
} from "@/services/auth";
import type { LoginCredentials, User, RegisterCredentials } from "@/types/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProfile();
      setUser(res.data);
      if (res.data.user && res.data.user.roles && res.data.user.roles.length > 0) {
        const roles = res.data.user.roles.join(",");
        Cookies.set("user_roles", roles, { secure: true, sameSite: "Strict", path: "/" });
      }
    } catch {
      setUser(null);
      Cookies.remove("token");
      Cookies.remove("user_roles");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      setLoading(true);
      try {
        await getCsrfCookie();
        const res = await login(credentials);
        if (res.data.token) {
          Cookies.set("token", res.data.token, { secure: true, sameSite: "Strict", path: "/" });
        }
        await fetchUser();
        return res.data; // Devuelve el JSON del login
      } catch (error: any) {
        setLoading(false);
        if (error.response) {
          if (error.response.status === 422) {
            const validationErrors = error.response.data.errors;
            throw { type: "validation", messages: Object.values(validationErrors).flat() };
          }
          if (error.response.status === 401) {
            throw { type: "auth", message: error.response.data.message };
          }
        }
        throw { type: "unknown", message: "Error inesperado al iniciar sesión" };
      }
    },
    [fetchUser]
  );

  const handleRegister = useCallback(
    async (credentials: RegisterCredentials) => {
      await getCsrfCookie();
      try {
        const res = await register(credentials); // register usa tu instancia de axios
        if (res.data.token) {
          Cookies.set("token", res.data.token, { secure: true, sameSite: "Strict", path: "/" });
        }
        await fetchUser();
        return res.data; // devuelve la data cuando todo va bien
      } catch (error: any) {
        if (error.response?.status === 422) {
          // lanzamos la respuesta del backend para manejar errores específicos en el formulario
          throw error.response.data;
        }
        throw error; // otros errores
      }
    },
    [fetchUser]
  );

  const handleLogout = useCallback(async () => {
    await logout();
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("user_roles");
    router.push("/auth");
  }, [router]);

  return { user, loading, handleLogin, handleRegister, handleLogout };
}