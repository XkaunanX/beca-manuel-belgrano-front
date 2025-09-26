# Carpeta services en un proyecto Next.js con TypeScript

La carpeta `services/` se utiliza para **centralizar la lógica de comunicación con APIs o backends**, separando la lógica de datos de los componentes y vistas.  
En un proyecto con TypeScript, los servicios suelen utilizar los tipos definidos en la carpeta `types/` para garantizar que los datos enviados y recibidos cumplen con la forma esperada.

---

## Contenido habitual de la carpeta `services/`

### 1. Servicios de autenticación
Ejemplo en `services/auth.ts`:

```ts
import axiosInstance from "@/lib/axios";
import { LoginCredentials, RegisterCredentials } from "@/types/auth";

export const getCsrfCookie = () => axiosInstance.get("/sanctum/csrf-cookie");

export const login = (credentials: LoginCredentials) => 
  axiosInstance.post("/login", credentials);

export const register = (credentials: RegisterCredentials) => 
  axiosInstance.post("/register", credentials);

export const logout = () => axiosInstance.post("/logout");

export const getProfile = () => axiosInstance.get("/api/profile");
```

Estos servicios se encargan de **hacer las solicitudes HTTP** al backend, y pueden ser usados desde hooks o componentes React.

---

### 2. Servicios de API genéricos
En proyectos grandes, se suelen crear servicios para distintos dominios del sistema:

- `services/product.ts` → manejo de productos (crear, listar, actualizar, eliminar)  
- `services/order.ts` → manejo de pedidos  
- `services/user.ts` → gestión de usuarios  

Cada servicio normalmente **utiliza axios o fetch** y los tipos de la carpeta `types/` para definir la estructura de datos que envía o recibe.

---

### 3. Ventajas de centralizar servicios

- **Separación de responsabilidades**: los componentes no deben preocuparse por la forma de hacer peticiones HTTP.  
- **Reutilización de código**: cualquier componente puede llamar a los mismos métodos del servicio.  
- **Mantenibilidad**: si cambia la API, solo se modifica el servicio correspondiente.  
- **Tipado seguro**: combinando con `types/`, se garantiza que los datos enviados y recibidos cumplen con la forma esperada.

---

### 4. Ejemplo de estructura

```
/services
  ├── auth.ts         # Servicios de autenticación
  ├── product.ts      # Servicios para productos
  ├── order.ts        # Servicios para pedidos
  └── user.ts         # Servicios de usuarios
```

---