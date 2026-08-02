import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Empreendimento, EmpreendimentoEtapa, Foto } from "@/types/database";

export async function listarEmpreendimentosAtivos(): Promise<Empreendimento[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("empreendimentos")
    .select("*")
    .eq("ativo", true)
    .order("ordem", { ascending: true });

  if (error) {
    console.error("listarEmpreendimentosAtivos", error);
    return [];
  }
  return data ?? [];
}

export interface EmpreendimentoDetalhe {
  empreendimento: Empreendimento;
  etapasVisiveis: EmpreendimentoEtapa[];
  fotos: Foto[];
}

export async function buscarEmpreendimentoPorSlug(
  slug: string
): Promise<EmpreendimentoDetalhe | null> {
  const supabase = createSupabaseAdminClient();

  const { data: empreendimento, error } = await supabase
    .from("empreendimentos")
    .select("*")
    .eq("slug", slug)
    .eq("ativo", true)
    .maybeSingle();

  if (error || !empreendimento) return null;

  const { data: etapas, error: etapasError } = await supabase
    .from("empreendimento_etapas")
    .select("*")
    .eq("empreendimento_id", empreendimento.id)
    .order("ordem", { ascending: true });

  // Busca as fotos SEM encadear .order()/.is() na mesma query — essa
  // combinação com .eq() estava truncando o resultado para 1 linha só
  // neste cliente (confirmado: a mesma consulta sem .order() retornava
  // as 33 linhas certas). Ordenar e filtrar deleted_at em JS evita o
  // problema por completo.
  const { data: fotosTodas, error: fotosError } = await supabase
    .from("fotos")
    .select("*")
    .eq("empreendimento_id", empreendimento.id);

  if (etapasError) console.error("buscarEmpreendimentoPorSlug etapas:", etapasError);
  if (fotosError) console.error("buscarEmpreendimentoPorSlug fotos:", fotosError);

  const fotos = (fotosTodas ?? [])
    .filter((f) => !f.deleted_at)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // Etapas em 0% ficam ocultas do cliente — aparecem sozinhas quando a
  // obra chegar nelas (percentual > 0 lançado pelo admin).
  const etapasVisiveis = (etapas ?? []).filter((e) => e.percentual > 0);

  return { empreendimento, etapasVisiveis, fotos };
}
