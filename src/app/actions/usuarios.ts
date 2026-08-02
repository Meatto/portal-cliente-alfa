"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { exigirAdmin } from "@/lib/auth/admin-guard";
import type { NivelAcesso } from "@/types/database";

export interface UsuarioFormState {
  error?: string;
  success?: boolean;
}

const NIVEIS_VALIDOS: NivelAcesso[] = ["editor_obras", "editor_completo", "administrador"];

export async function convidarUsuario(
  _prevState: UsuarioFormState,
  formData: FormData
): Promise<UsuarioFormState> {
  const usuarioAtual = await exigirAdmin(["administrador"]);

  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const nivel = String(formData.get("nivel_acesso") ?? "") as NivelAcesso;

  if (!nome || !email || !NIVEIS_VALIDOS.includes(nivel)) {
    return { error: "Preencha nome, e-mail e nível de acesso." };
  }

  const admin = createSupabaseAdminClient();

  const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/auth/set-password`,
  });

  if (error || !data.user) {
    return { error: "Não foi possível enviar o convite. Confira o e-mail informado." };
  }

  const serverSupabase = createSupabaseServerClient();
  const { error: insertError } = await serverSupabase.from("usuarios_admin").insert({
    id: data.user.id,
    nome,
    email,
    nivel_acesso: nivel,
    convite_status: "pendente",
    convidado_por: usuarioAtual.id,
  });

  if (insertError) {
    return { error: "Convite enviado, mas houve um erro ao registrar o acesso. Avise o suporte." };
  }

  revalidatePath("/admin/usuarios");
  return { success: true };
}

export async function reenviarConvite(email: string) {
  await exigirAdmin(["administrador"]);
  const admin = createSupabaseAdminClient();
  await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/auth/set-password`,
  });
}
