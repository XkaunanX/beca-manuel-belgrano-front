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
  name: string;             // nombre del User
  email: string;       // opcional si no se usa en backend
  password: string;
  password_confirmation: string;
  nombre: string;           // nombre del Scholarship
  apellido: string;
  cuitCuil: string;
  genero: string;
}