export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  // Agregar lo que devuelva el backend en /api/profile
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}