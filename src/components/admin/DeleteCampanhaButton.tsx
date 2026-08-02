"use client";

import { excluirCampanha } from "@/app/actions/pesquisa";

export function DeleteCampanhaButton({ id }: { id: string }) {
  return (
    <form
      action={excluirCampanha}
      onSubmit={(e) => {
        const ok = window.confirm(
          "Excluir esta campanha permanentemente do histórico? Todas as respostas recebidas serão apagadas e isso não pode ser desfeito."
        );
        if (!ok) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="shrink-0 whitespace-nowrap text-[12.5px] text-navy hover:text-gold active:text-gold transition-colors"
      >
        Excluir
      </button>
    </form>
  );
}
