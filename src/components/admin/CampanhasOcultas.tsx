"use client";

import { useState, useTransition } from "react";
import { reexibirCampanha } from "@/app/actions/pesquisa";
import { formatPeriodo } from "@/lib/utils";
import type { CampanhaComEstatisticas } from "@/types/database";

export function CampanhasOcultas({ campanhas }: { campanhas: CampanhaComEstatisticas[] }) {
  const [aberto, setAberto] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (campanhas.length === 0) return null;

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        className="tap-target text-[12.5px] text-muted hover:text-navy transition-colors"
      >
        {aberto ? "Ocultar esta lista" : `Ver campanhas ocultas (${campanhas.length})`}
      </button>

      {aberto && (
        <div className="mt-3 flex flex-col gap-2.5">
          {campanhas.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between gap-3 bg-surface border border-line rounded px-4 py-3"
            >
              <div>
                <div className="text-[13px] text-navy">{c.pergunta}</div>
                <div className="text-[11px] text-muted mt-0.5">
                  {formatPeriodo(c.periodo_inicio, c.periodo_fim)} · {c.total_respostas} respostas
                </div>
              </div>
              <button
                type="button"
                disabled={isPending}
                onClick={() => startTransition(() => reexibirCampanha(c.id))}
                className="tap-target shrink-0 text-gold text-[12.5px] hover:underline disabled:opacity-50"
              >
                Reexibir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
