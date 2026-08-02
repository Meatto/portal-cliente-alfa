import Link from "next/link";
import type { Empreendimento } from "@/types/database";

export function EmpreendimentoCard({ empreendimento }: { empreendimento: Empreendimento }) {
  return (
    <Link
      href={`/portal/${empreendimento.slug}`}
      className="flex flex-col gap-4 text-left bg-surface border border-line rounded p-6 sm:p-[30px_24px] min-h-[150px] transition-all hover:border-navy hover:shadow-card-lg tap-target"
    >
      <span className="font-jost tracking-[.2em] text-[11px] text-gold">✦ ALFA</span>
      <span className="font-jost text-[20px] text-navy leading-tight">{empreendimento.nome}</span>
      <span className="text-xs text-muted">{empreendimento.bairro}</span>
      <span className="mt-auto flex items-center gap-2.5">
        <span className="flex-1 h-[3px] bg-line rounded-full overflow-hidden">
          <span
            className="block h-full bg-navy"
            style={{ width: `${empreendimento.avanco_geral}%` }}
          />
        </span>
        <span className="text-xs text-navy tabular-nums">{empreendimento.avanco_geral}%</span>
      </span>
    </Link>
  );
}
