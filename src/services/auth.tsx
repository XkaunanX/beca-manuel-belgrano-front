import axiosInstance from "@/lib/axios";
import { LoginCredentials, RegisterCredentials } from "@/types/auth";

export const getCsrfCookie = () => axiosInstance.get("/sanctum/csrf-cookie");

export const login = async (credentials: LoginCredentials) => {
    const res = await axiosInstance.post("/api/login", credentials);
    return res;
};

export const register = (credentials: RegisterCredentials) =>axiosInstance.post("/api/register", credentials);

export const logout = () => axiosInstance.post("/api/logout");

export const getProfile = () => axiosInstance.get("/api/profile");