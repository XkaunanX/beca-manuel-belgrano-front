import { useState, useCallback } from "react";
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

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProfile();
      setUser(res.data);
      if (res.data.user && res.data.user.roles && res.data.user.roles.length > 0) {
        const roles = res.data.user.roles.map((r: any) => r.name).join(',');
        document.cookie = `user_roles=${roles}; path=/;`;
      }
    } catch {
      setUser(null);
      localStorage.removeItem("token");
      document.cookie = "user_roles=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
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
          localStorage.setItem("token", res.data.token);
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
      const res = await register(credentials);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      await fetchUser();
    },
    [fetchUser]
  );

  const handleLogout = useCallback(async () => {
    await logout();
    setUser(null);
    localStorage.removeItem("token");
    document.cookie = "user_roles=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }, []);

  return { user, loading, handleLogin, handleRegister, handleLogout };
}