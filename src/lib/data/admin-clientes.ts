import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Cliente } from "@/types/database";

export async function listarClientesRecentes(limite = 25): Promise<{ clientes: Cliente[]; total: number }> {
  const supabase = createSupabaseServerClient();
  const { data, count } = await supabase
    .from("clientes")
    .select("*", { count: "exact" })
    .order("importado_em", { ascending: false })
    .limit(limite);

  return { clientes: data ?? [], total: count ?? 0 };
}
