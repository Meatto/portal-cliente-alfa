"use client";

import { useTransition } from "react";
import { pausarCampanha, reativarCampanha, ocultarCampanha } from "@/app/actions/pesquisa";
import { DeleteCampanhaButton } from "@/components/admin/DeleteCampanhaButton";
import { ClearRespostasButton } from "@/components/admin/ClearRespostasButton";
import { formatPeriodo } from "@/lib/utils";
import type { CampanhaComEstatisticas } from "@/types/database";

export function CampaignCard({ campanha }: { campanha: CampanhaComEstatisticas }) {
  const [isPending, startTransition] = useTransition();
  const ativa = campanha.status === "ativa";
  const max = Math.max(...campanha.distribuicao, 1);

  return (
    <div className="bg-surface border border-line rounded p-5 sm:p-6 flex flex-col">
      <div className="flex justify-between items-start gap-3.5 mb-5">
        <div>
          <div className="font-jost text-[16px] text-navy leading-snug">{campanha.pergunta}</div>
          <div className="text-[11.5px] text-muted mt-1">
            {formatPeriodo(campanha.periodo_inicio, campanha.periodo_fim)} · {campanha.total_respostas} respostas
            {campanha.total_respostas > 0 && (
              <>
                {" · "}
                <ClearRespostasButton id={campanha.id} totalRespostas={campanha.total_respostas} />
              </>
            )}
          </div>
        </div>
        <span
          className={`shrink-0 text-[11px] px-2.5 py-1 rounded-full ${
            ativa ? "bg-[#E8F0E8] text-[#3F6B45]" : "bg-[#F0E8E8] text-[#8A5252]"
          }`}
        >
          {ativa ? "No ar" : "Pausada"}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3.5 sm:items-center">
        <div className="flex sm:flex-col items-baseline sm:items-center gap-3 sm:gap-0 sm:pr-[22px] sm:border-r border-line pb-3.5 sm:pb-0 border-b sm:border-b-0 border-line">
          <div className="font-jost text-[26px] sm:text-[34px] text-navy leading-none">
            {campanha.media.toFixed(1)}
          </div>
          <div className="text-gold text-xs tracking-[2px]">★★★★★</div>
          <div className="text-[9px] tracking-[.2em] uppercase text-muted sm:mt-1.5">média</div>
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          {campanha.distribuicao.map((count, idx) => (
            <div key={idx} className="flex items-center gap-2.5">
              <span className="text-[10.5px] text-muted w-[22px] text-right">{idx + 1}★</span>
              <span className="flex-1 h-2 bg-[#EDEFF2] rounded-full overflow-hidden">
                <span
                  className={`block h-full rounded-full ${idx === 4 ? "bg-gold" : "bg-navy"}`}
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </span>
              <span className="text-[11px] text-muted w-6 tabular-nums">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-nowrap justify-between items-center mt-auto pt-4 border-t border-line gap-2">
        <button
          disabled={isPending}
          onClick={() =>
            startTransition(() => {
              if (ativa) pausarCampanha(campanha.id);
              else reativarCampanha(campanha.id);
            })
          }
          className="shrink-0 text-navy text-[12.5px] hover:text-gold active:text-gold transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {ativa ? "Pausar campanha" : "Reativar campanha"}
        </button>

        <div className="flex flex-nowrap items-center gap-3">
          {!ativa && (
            <>
              <button
                type="button"
                disabled={isPending}
                onClick={() => startTransition(() => ocultarCampanha(campanha.id))}
                className="shrink-0 text-[12.5px] text-navy hover:text-gold active:text-gold transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                Ocultar
              </button>
              <DeleteCampanhaButton id={campanha.id} />
            </>
          )}
          <a
            href={`/api/export/excel?campanha=${campanha.id}`}
            className="shrink-0 text-navy text-[12.5px] hover:text-gold active:text-gold transition-colors whitespace-nowrap"
          >
            Exportar
          </a>
        </div>
      </div>
    </div>
  );
}
