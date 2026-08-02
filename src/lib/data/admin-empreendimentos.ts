import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Empreendimento, EmpreendimentoEtapa, Foto } from "@/types/database";

export async function listarEmpreendimentosAdmin(): Promise<Empreendimento[]> {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("empreendimentos")
    .select("*")
    .order("ordem", { ascending: true });
  return data ?? [];
}

export interface EmpreendimentoAdminDetalhe {
  empreendimento: Empreendimento;
  etapas: EmpreendimentoEtapa[];
  fotos: Foto[];
}

export async function buscarEmpreendimentoAdmin(
  id: string
): Promise<EmpreendimentoAdminDetalhe | null> {
  const supabase = createSupabaseServerClient();
  const { data: empreendimento } = await supabase
    .from("empreendimentos")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!empreendimento) return null;

  const [{ data: etapas }, { data: fotosTodas }] = await Promise.all([
    supabase
      .from("empreendimento_etapas")
      .select("*")
      .eq("empreendimento_id", id)
      .order("ordem", { ascending: true }),
    // Sem .is()/.order() encadeados na mesma query — ver nota em
    // buscarEmpreendimentoPorSlug (src/lib/data/empreendimentos.ts).
    // Filtramos deleted_at e ordenamos em JS por segurança.
    supabase.from("fotos").select("*").eq("empreendimento_id", id),
  ]);

  const fotos = (fotosTodas ?? [])
    .filter((f) => !f.deleted_at)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return { empreendimento, etapas: etapas ?? [], fotos };
}
