"use client";

import { excluirFoto } from "@/app/actions/obras";

export function DeleteFotoButton({ fotoId }: { fotoId: string }) {
  return (
    <form
      action={excluirFoto}
      onSubmit={(e) => {
        if (!window.confirm("Remover esta foto da galeria?")) e.preventDefault();
      }}
      className="absolute top-1 right-1"
    >
      <input type="hidden" name="foto_id" value={fotoId} />
      <button
        type="submit"
        title="Remover foto"
        aria-label="Remover foto"
        className="w-7 h-7 flex items-center justify-center rounded-full bg-black/55 text-white text-[15px] leading-none hover:bg-black/75 transition-colors"
      >
        ×
      </button>
    </form>
  );
}
