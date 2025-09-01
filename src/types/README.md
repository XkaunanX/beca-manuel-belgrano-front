# Carpeta types en un proyecto Next.js con TypeScript

La carpeta `types/` se utiliza para **centralizar y organizar todas las definiciones de tipos e interfaces** que se usan en la aplicación.  
En TypeScript, los **tipos** (`type`) e **interfaces** (`interface`) permiten describir la forma que deben tener los objetos, definir contratos claros con el backend y detectar errores en tiempo de compilación.

---

## Contenido habitual de la carpeta `types/`

### 1. Tipos relacionados con autenticación
Ejemplo en `types/auth.ts`:

```ts
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  // otros campos que devuelva el backend en /api/profile
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
```

Estos se usan en servicios de autenticación, hooks como `useAuth`, y formularios de login/registro.

---

### 2. Tipos de API
Definiciones que representan lo que devuelve el backend:

```ts
export interface ApiResponse<T> {
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}
```

---

### 3. Tipos globales de la app
Se definen estructuras genéricas que se usan en distintas partes del proyecto:

- `types/common.ts` → tipos comunes (`ID`, `Timestamp`, `Paginated<T>`)
- `types/forms.ts` → estructuras de formularios
- `types/env.d.ts` → tipado de variables de entorno (`process.env.NEXT_PUBLIC_API_URL`)

---

### 4. Modelos del dominio
Representaciones de entidades del sistema.  
Ejemplo en un e-commerce:

- `types/product.ts`
- `types/order.ts`
- `types/user.ts`

---

## Ventajas de usar la carpeta `types/`

- **Centralización**: todos los tipos están organizados en un mismo lugar.  
- **Escalabilidad**: los modelos no se mezclan con la lógica de servicios o componentes.  
- **Mantenibilidad**: si cambia la API del backend, se actualiza el tipo en un solo archivo y el compilador marca dónde ajustar el código.

---

## Ejemplo de estructura

```
/types
  ├── auth.ts         # Tipos de autenticación
  ├── api.ts          # Tipos de respuestas de API
  ├── common.ts       # Tipos compartidos
  ├── product.ts      # Modelo de productos
  ├── order.ts        # Modelo de pedidos
  └── env.d.ts        # Tipado de variables de entorno
```

---