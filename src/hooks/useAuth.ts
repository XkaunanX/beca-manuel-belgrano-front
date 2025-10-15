import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  getCsrfCookie,
  login,
  logout,
  getProfile,
  register,
} from "@/services/auth";
import type {
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@/types/auth";
import type { Scholarship } from "@/types/scholarship";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Inicializar desde localStorage en cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedScholarship = localStorage.getItem("scholarship");
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedScholarship) setScholarship(JSON.parse(storedScholarship));
    }
    setLoading(false);
  }, []);

  // 🔹 Guardar en estado y localStorage
  const saveUserData = useCallback((userData: User, scholarshipData?: Scholarship | null) => {
    setUser(userData);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData));
      if (scholarshipData) {
        setScholarship(scholarshipData);
        localStorage.setItem("scholarship", JSON.stringify(scholarshipData));
      }
    }
  }, []);

  // 🔹 Limpiar datos
  const clearUserData = useCallback(() => {
    setUser(null);
    setScholarship(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("scholarship");
    }
    Cookies.remove("user_roles");
    Cookies.remove("token");
  }, []);

  // 🔹 Obtener perfil desde backend y actualizar estado/localStorage
  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProfile();
      const { user: userData, scholarship: scholarshipData } = res.data;

      saveUserData(userData, scholarshipData);

      if (userData?.roles?.length) {
        Cookies.set("user_roles", userData.roles.join(","), {
          secure: true,
          sameSite: "Strict",
          path: "/",
        });
      }
    } catch {
      clearUserData();
    } finally {
      setLoading(false);
    }
  }, [saveUserData, clearUserData]);

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      await getCsrfCookie();
      const res = await login(credentials);
      const { user: userData, scholarship: scholarshipData, token } = res.data;

      if (token) {
        Cookies.set("token", token, { secure: true, sameSite: "Strict", path: "/" });
      }

      saveUserData(userData, scholarshipData);

      if (userData?.roles?.length) {
        Cookies.set("user_roles", userData.roles.join(","), {
          secure: true,
          sameSite: "Strict",
          path: "/",
        });
      }

      return res.data;
    } catch (error: any) {
      if (error.response?.status === 422) {
        throw { type: "validation", messages: Object.values(error.response.data.errors).flat() };
      }
      if (error.response?.status === 401) {
        throw { type: "auth", message: error.response.data.message };
      }
      throw { type: "unknown", message: "Error inesperado al iniciar sesión" };
    } finally {
      setLoading(false);
    }
  }, [saveUserData]);

  const handleRegister = useCallback(async (credentials: RegisterCredentials) => {
    setLoading(true);
    try {
      await getCsrfCookie();
      const res = await register(credentials);
      const { user: userData, scholarship: scholarshipData, token } = res.data;

      if (token) {
        Cookies.set("token", token, { secure: true, sameSite: "Strict", path: "/" });
      }

      saveUserData(userData, scholarshipData);

      return res.data;
    } catch (error: any) {
      if (error.response?.status === 422) {
        throw error.response.data;
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }, [saveUserData]);

  const handleLogout = useCallback(async () => {
    await logout();
    clearUserData();
    router.push("/auth");
  }, [clearUserData, router]);

  return {
    user,
    scholarship,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
    fetchUser,
  };
}
