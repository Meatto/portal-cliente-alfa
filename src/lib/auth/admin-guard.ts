import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { NivelAcesso, UsuarioAdmin } from "@/types/database";

/**
 * Garante que existe uma sessão de admin válida e devolve o registro de
 * usuarios_admin correspondente. Redireciona para /admin/login caso
 * contrário. Se `niveisPermitidos` for informado, exige que o nível de
 * acesso do usuário esteja na lista (senão redireciona para /admin com
 * aviso de acesso restrito).
 */
export async function exigirAdmin(niveisPermitidos?: NivelAcesso[]): Promise<UsuarioAdmin> {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: usuarioAdmin } = await supabase
    .from("usuarios_admin")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!usuarioAdmin) redirect("/admin/login");

  if (niveisPermitidos && !niveisPermitidos.includes(usuarioAdmin.nivel_acesso)) {
    redirect("/admin/obras");
  }

  return usuarioAdmin;
}
