// En tu archivo de types (ej: types/scholarship.ts)
export interface Scholarship {
  id: number;

  // Campos básicos
  name: string;
  last_name: string;
  date_birth?: string | null; // formato "YYYY-MM-DD"
  cuil?: string | null;
  cuit?: string | null;
  children?: number | null;
  social_coverage?: boolean | null;
  // 🔧 Agregado: email del user relacionado (no parte de Scholarship, pero incluido en la respuesta API)
  email?: string | null;  // Opcional, ya que viene de la relación user

  // Relaciones (FKs)
  user_id: number;
  genre_id?: number | null;
  nationality_id?: number | null;
  civil_status_id?: number | null;
  vulnerable_group_id?: number | null;
  bank_branch_id?: number | null;

  // Timestamps
  created_at?: string;
  updated_at?: string;
}