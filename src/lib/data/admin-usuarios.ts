import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { UsuarioAdmin } from "@/types/database";

export async function listarUsuariosAdmin(): Promise<UsuarioAdmin[]> {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("usuarios_admin")
    .select("*")
    .order("created_at", { ascending: true });
  return data ?? [];
}
