import * as XLSX from "xlsx";
import type { CampanhaPesquisa, RespostaPesquisaComCliente } from "@/types/database";

/**
 * Gera um .xlsx com os dados brutos das respostas de uma (ou mais)
 * campanhas de pesquisa de satisfação.
 */
export function gerarExcelRespostas(
  campanhas: CampanhaPesquisa[],
  respostasPorCampanha: Record<string, RespostaPesquisaComCliente[]>
): Buffer {
  const wb = XLSX.utils.book_new();

  const linhas: Record<string, string | number>[] = [];
  for (const campanha of campanhas) {
    const respostas = respostasPorCampanha[campanha.id] ?? [];
    for (const resposta of respostas) {
      linhas.push({
        Pergunta: campanha.pergunta,
        Periodo_Inicio: campanha.periodo_inicio,
        Periodo_Fim: campanha.periodo_fim ?? "",
        Status: campanha.status,
        Cliente: resposta.cliente?.nome ?? "(não identificado)",
        CPF: resposta.cliente?.cpf ?? "",
        Nota: resposta.nota,
        Data_Resposta: new Date(resposta.created_at).toLocaleString("pt-BR"),
      });
    }
  }

  const sheet = XLSX.utils.json_to_sheet(
    linhas.length > 0 ? linhas : [{ Aviso: "Nenhuma resposta neste período" }]
  );
  sheet["!cols"] = [
    { wch: 40 },
    { wch: 14 },
    { wch: 14 },
    { wch: 10 },
    { wch: 26 },
    { wch: 16 },
    { wch: 8 },
    { wch: 20 },
  ];
  XLSX.utils.book_append_sheet(wb, sheet, "Respostas");

  const resumo = campanhas.map((c) => {
    const respostas = respostasPorCampanha[c.id] ?? [];
    const media =
      respostas.length > 0
        ? respostas.reduce((acc, r) => acc + r.nota, 0) / respostas.length
        : 0;
    return {
      Pergunta: c.pergunta,
      Status: c.status,
      Total_Respostas: respostas.length,
      Media: Number(media.toFixed(2)),
    };
  });
  const resumoSheet = XLSX.utils.json_to_sheet(resumo);
  resumoSheet["!cols"] = [{ wch: 40 }, { wch: 10 }, { wch: 16 }, { wch: 8 }];
  XLSX.utils.book_append_sheet(wb, resumoSheet, "Resumo");

  const out = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  return out as Buffer;
}
