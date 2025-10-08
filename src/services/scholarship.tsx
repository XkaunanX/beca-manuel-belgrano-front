import axios from "axios";

// 🔧 Type ajustado para coincidir con el JSON del backend (campos en español)
export interface ScholarshipResponse {
  nombre: string | null;
  apellido: string | null;
  dni: string | null;
  fecha_nacimiento: string | null;
  email: string | null;
  // Agrega otros campos si los devuelve (id, etc.)
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const getMyScholarship = async (token: string): Promise<ScholarshipResponse> => {
  try {
    const response = await axios.get(`${API_URL}/scholarship`, {  // Ajusta la ruta si es diferente (ej: /my-scholarship)
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;

    // 🔧 Log para debug (remover en producción)
    console.log("Respuesta cruda de API:", data);

    // 🔧 Devuelve directamente los datos del backend (sin remapear a inglés)
    // Si el backend devuelve más campos, agrégalos al type arriba
    return {
      nombre: data.nombre || null,
      apellido: data.apellido || null,
      dni: data.dni || null,
      fecha_nacimiento: data.fecha_nacimiento || null,
      email: data.email || null,
    };
  } catch (error: any) {
    console.error("Error en getMyScholarship:", error.response?.data || error.message);
    // En caso de error, devuelve un objeto vacío para no crashar
    return {
      nombre: null,
      apellido: null,
      dni: null,
      fecha_nacimiento: null,
      email: null,
    };
  }
};
