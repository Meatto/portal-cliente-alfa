"use client";

import { limparRespostasCampanha } from "@/app/actions/pesquisa";

export function ClearRespostasButton({
  id,
  totalRespostas,
}: {
  id: string;
  totalRespostas: number;
}) {
  if (totalRespostas === 0) return null;

  return (
    <form
      action={limparRespostasCampanha}
      className="inline"
      onSubmit={(e) => {
        const ok = window.confirm(
          `Apagar as ${totalRespostas} respostas desta campanha? A pergunta continua no quadro, só o histórico de notas é zerado. Não pode ser desfeito.`
        );
        if (!ok) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-navy hover:text-gold active:text-gold transition-colors underline decoration-dotted underline-offset-2"
      >
        limpar respostas
      </button>
    </form>
  );
}
