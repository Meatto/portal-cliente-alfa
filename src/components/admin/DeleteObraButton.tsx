"use client";

import { excluirEmpreendimento } from "@/app/actions/obras";

export function DeleteObraButton({ id, nome }: { id: string; nome: string }) {
  return (
    <form
      action={excluirEmpreendimento}
      onSubmit={(e) => {
        const ok = window.confirm(
          `Excluir "${nome}"? Essa ação não pode ser desfeita — as etapas e fotos cadastradas também serão removidas.`
        );
        if (!ok) e.preventDefault();
      }}
      className="inline"
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="tap-target text-[#8A5252] hover:underline ml-3">
        Excluir
      </button>
    </form>
  );
}
