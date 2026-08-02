"use client";

import { useFormState, useFormStatus } from "react-dom";
import { importarClientesCsv, type ImportState } from "@/app/actions/clientes";

const initialState: ImportState = {};

function ImportarButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="tap-target inline-flex items-center px-6 py-2.5 rounded bg-navy text-white text-sm font-medium hover:bg-navy-soft transition-colors disabled:opacity-60"
    >
      {pending ? "Importando…" : "Importar CSV"}
    </button>
  );
}

export function ClientesImport() {
  const [state, formAction] = useFormState(importarClientesCsv, initialState);

  return (
    <div className="bg-surface border border-line rounded p-6 sm:p-8 mb-6">
      <h2 className="text-lg mb-2">Importar base do Sienge</h2>
      <p className="text-[12.5px] text-muted mb-5">
        Envie o CSV exportado do Sienge com as colunas <code>cpf, nome, email, telefone</code>.
        Clientes com o mesmo CPF são atualizados; novos CPFs são cadastrados.
      </p>
      <form action={formAction} className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
        <input
          type="file"
          name="arquivo"
          accept=".csv,text/csv"
          required
          className="tap-target text-[13px]"
        />
        <ImportarButton />
      </form>
      {state?.error && <p className="text-[12.5px] text-[#8A5252] mt-3.5">{state.error}</p>}
      {state?.success && (
        <p className="text-[12.5px] text-[#3F6B45] mt-3.5">
          {state.importados} cliente(s) importado(s){state.ignorados ? ` · ${state.ignorados} linha(s) ignorada(s)` : ""}.
        </p>
      )}
    </div>
  );
}
