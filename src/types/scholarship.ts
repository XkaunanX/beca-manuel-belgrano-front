export interface Scholarship {
  id: number;
  name: string;
  last_name: string;
  state?: string | null; // 🔹 Agregado: el estado textual (por ejemplo "inscripcion_pendiente")

  // Opcionales por compatibilidad
  date_birth?: string | null;
  cuil?: string | null;
  cuit?: string | null;
  children?: number | null;
  social_coverage?: boolean | null;
  email?: string | null;

  user_id?: number;
  genre_id?: number | null;
  nationality_id?: number | null;
  civil_status_id?: number | null;
  vulnerable_group_id?: number | null;
  bank_branch_id?: number | null;

  created_at?: string;
  updated_at?: string;
}
