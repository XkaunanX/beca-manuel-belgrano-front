import type { Scholarship } from "./scholarship";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string; // nombre del User
  email: string;
  password: string;
  password_confirmation: string;
  nombre: string; // nombre del Scholarship
  apellido: string;
  cuitCuil: string;
  genero: string;
}

// 🔹 Usuario (lo que devuelve el backend en login/profile)
export interface User {
  id: number;
  name: string;
  email: string;
  roles?: string[];
}

// 🔹 Respuesta del backend para login o profile
export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user: User;
  scholarship?: Scholarship | null;
}
