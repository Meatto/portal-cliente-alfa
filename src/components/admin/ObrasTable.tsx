import Link from "next/link";
import type { Empreendimento, NivelAcesso } from "@/types/database";
import { DeleteObraButton } from "./DeleteObraButton";

export function ObrasTable({
  empreendimentos,
  nivelAcesso,
}: {
  empreendimentos: Empreendimento[];
  nivelAcesso: NivelAcesso;
}) {
  const podeExcluir = nivelAcesso === "editor_completo" || nivelAcesso === "administrador";
  return (
    <div className="bg-surface border border-line rounded p-6 sm:p-8 mb-6 overflow-x-auto">
      <table className="w-full border-collapse min-w-[560px]">
        <thead>
          <tr>
            {["Empreendimento", "Bairro", "Avanço geral", "Status", ""].map((h) => (
              <th
                key={h}
                className="text-left text-[10px] tracking-[.15em] uppercase text-muted font-medium pb-[11px] pr-3 border-b border-line"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {empreendimentos.map((emp) => (
            <tr key={emp.id}>
              <td className="py-3.5 pr-3 border-b border-line text-navy font-medium text-[13.5px]">
                {emp.nome}
              </td>
              <td className="py-3.5 pr-3 border-b border-line text-muted text-[13.5px]">{emp.bairro}</td>
              <td className="py-3.5 pr-3 border-b border-line text-[13.5px]">
                <span className="inline-block w-[90px] h-[5px] bg-[#EDEFF2] rounded-full overflow-hidden align-middle mr-2.5">
                  <span className="block h-full bg-navy" style={{ width: `${emp.avanco_geral}%` }} />
                </span>
                {emp.avanco_geral}%
              </td>
              <td className="py-3.5 pr-3 border-b border-line text-[13.5px]">
                <span
                  className={`text-[11px] px-2.5 py-1 rounded-full ${
                    emp.ativo ? "bg-[#E8F0E8] text-[#3F6B45]" : "bg-[#F0E8E8] text-[#8A5252]"
                  }`}
                >
                  {emp.ativo ? "Obra ativa" : "Inativa"}
                </span>
              </td>
              <td className="py-3.5 border-b border-line text-right text-[13.5px] whitespace-nowrap">
                <Link href={`/admin/obras?edit=${emp.id}`} className="text-gold hover:underline tap-target">
                  Editar
                </Link>
                {podeExcluir && <DeleteObraButton id={emp.id} nome={emp.nome} />}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={5} className="text-center py-4">
              <Link href="/admin/obras/novo" className="text-gold text-[13px] hover:underline tap-target">
                + Cadastrar empreendimento
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
