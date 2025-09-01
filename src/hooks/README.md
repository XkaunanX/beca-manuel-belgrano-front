# Carpeta hooks en un proyecto Next.js con TypeScript

La carpeta `hooks/` se utiliza para **centralizar y organizar los hooks personalizados** de React.  
Los hooks permiten **compartir lógica de estado y efectos** entre componentes de manera reutilizable.

---

## Contenido habitual de la carpeta `hooks/`

### 1. Hook de autenticación
Ejemplo en `hooks/useAuth.ts`:

```ts
import { useState, useEffect, useCallback } from "react";
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
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await getProfile();
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      await getCsrfCookie();
      await login(credentials);
      await fetchUser();
    },
    [fetchUser]
  );

  const handleRegister = useCallback(
    async (credentials: RegisterCredentials) => {
      await getCsrfCookie();
      await register(credentials);
      await fetchUser();
    },
    [fetchUser]
  );

  const handleLogout = useCallback(async () => {
    await logout();
    setUser(null);
  }, []);

  return { user, loading, handleLogin, handleRegister, handleLogout };
}
```

Este hook encapsula toda la lógica de autenticación y estado de usuario, permitiendo que cualquier componente pueda acceder a:

- `user` → datos del usuario actual  
- `loading` → estado de carga  
- `handleLogin` → función para iniciar sesión  
- `handleRegister` → función para registrar un nuevo usuario  
- `handleLogout` → función para cerrar sesión

---

### 2. Otros hooks comunes
En proyectos grandes, se pueden crear hooks para:

- `hooks/useFetch.ts` → para manejar solicitudes HTTP genéricas  
- `hooks/useForm.ts` → para manejar formularios y validaciones  
- `hooks/useTheme.ts` → para manejar el tema de la aplicación  
- `hooks/useDebounce.ts` → para optimizar eventos frecuentes

---

### 3. Ventajas de centralizar hooks

- **Reutilización de lógica**: evita repetir código en múltiples componentes  
- **Separación de responsabilidades**: mantiene los componentes limpios y declarativos  
- **Mantenibilidad**: cambios en la lógica de un hook se reflejan en todos los componentes que lo usan  
- **Tipado seguro**: usando TypeScript, se asegura que los hooks devuelven los tipos correctos

---

### 4. Ejemplo de estructura

```
/hooks
  ├── useAuth.ts       # Hook de autenticación
  ├── useFetch.ts      # Hook para fetch genérico
  ├── useForm.ts       # Hook para formularios
  └── useTheme.ts      # Hook para manejar tema
```

---