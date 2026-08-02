"use client";

import { useTransition } from "react";
import { reenviarConvite } from "@/app/actions/usuarios";
import type { UsuarioAdmin } from "@/types/database";

const LABEL_NIVEL: Record<string, string> = {
  editor_obras: "Editor de obras",
  editor_completo: "Editor completo",
  administrador: "Administrador",
};

export function UsersTable({ usuarios }: { usuarios: UsuarioAdmin[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="bg-surface border border-line rounded p-6 sm:p-8 mb-6 overflow-x-auto">
      <table className="w-full border-collapse min-w-[560px]">
        <thead>
          <tr>
            {["Pessoa", "E-mail", "Nível de acesso", "Status", ""].map((h) => (
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
          {usuarios.map((usuario) => {
            const pendente = usuario.convite_status === "pendente";
            return (
              <tr key={usuario.id}>
                <td className="py-3.5 pr-3 border-b border-line text-[13.5px]">
                  {pendente ? (
                    <span className="text-muted">Aguardando cadastro</span>
                  ) : (
                    <span className="text-navy font-medium">{usuario.nome}</span>
                  )}
                </td>
                <td className="py-3.5 pr-3 border-b border-line text-muted text-[13.5px]">{usuario.email}</td>
                <td className="py-3.5 pr-3 border-b border-line text-[13.5px]">
                  {LABEL_NIVEL[usuario.nivel_acesso]}
                </td>
                <td className="py-3.5 pr-3 border-b border-line text-[13.5px]">
                  <span
                    className={`text-[11px] px-2.5 py-1 rounded-full ${
                      pendente ? "bg-[#F0E8E8] text-[#8A5252]" : "bg-[#E8F0E8] text-[#3F6B45]"
                    }`}
                  >
                    {pendente ? "Convite pendente" : "Ativo"}
                  </span>
                </td>
                <td className="py-3.5 border-b border-line text-right text-[13.5px]">
                  {pendente ? (
                    <button
                      disabled={isPending}
                      onClick={() => startTransition(() => reenviarConvite(usuario.email))}
                      className="tap-target text-gold hover:underline disabled:opacity-50"
                    >
                      Reenviar
                    </button>
                  ) : (
                    <span className="text-muted text-xs">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
