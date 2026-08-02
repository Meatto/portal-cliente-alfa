import { PublicarPerguntaForm } from "@/components/admin/PublicarPerguntaForm";
import { CampaignCard } from "@/components/admin/CampaignCard";
import { CampanhasOcultas } from "@/components/admin/CampanhasOcultas";
import { listarCampanhasComEstatisticas } from "@/lib/data/pesquisa";
import { exigirAdmin } from "@/lib/auth/admin-guard";

export default async function AdminPesquisaPage() {
  await exigirAdmin(["editor_completo", "administrador"]);
  const campanhas = await listarCampanhasComEstatisticas();
  const ativa = campanhas.find((c) => c.status === "ativa");
  const ordenadas = [...campanhas].sort(
    (a, b) => new Date(b.periodo_inicio).getTime() - new Date(a.periodo_inicio).getTime()
  );
  const visiveis = ordenadas.filter((c) => !c.oculta);
  const ocultas = ordenadas.filter((c) => c.oculta);

  return (
    <>
      <h2 className="text-[22px] text-navy mb-6">Pesquisa de satisfação</h2>
      <PublicarPerguntaForm perguntaAtual={ativa?.pergunta ?? null} />

      <div className="text-[10px] tracking-[.24em] uppercase text-muted mb-4 ml-1">
        Campanhas · uma pergunta por quadro
      </div>
      {visiveis.length === 0 ? (
        <p className="text-muted text-sm">Nenhuma campanha cadastrada ainda.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
          {visiveis.map((campanha) => (
            <CampaignCard key={campanha.id} campanha={campanha} />
          ))}
        </div>
      )}

      <CampanhasOcultas campanhas={ocultas} />

      <p className="text-[11.5px] text-muted leading-relaxed mt-5 max-w-[640px]">
        Cada quadro é uma pergunta. Campanhas com o mesmo título medem a mesma coisa em períodos
        diferentes, então dá para comparar a evolução. Reativar uma campanha antiga faz ela voltar
        ao banner e continuar somando no mesmo histórico — útil para acompanhar se a satisfação do
        cliente muda ao longo das fases da obra. Uma campanha pausada pode ser ocultada (fica em
        standby, fora desta lista) ou excluída (some do histórico para sempre).
      </p>
    </>
  );
}
