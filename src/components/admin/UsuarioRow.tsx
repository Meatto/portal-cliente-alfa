"use client";

import { useState, useTransition } from "react";
import { reenviarConvite, atualizarNivelAcesso, excluirUsuarioAdmin } from "@/app/actions/usuarios";
import type { NivelAcesso, UsuarioAdmin } from "@/types/database";

const LABEL_NIVEL: Record<string, string> = {
  editor_obras: "Editor de obras",
  editor_completo: "Editor completo",
  administrador: "Administrador",
};

const NIVEIS: NivelAcesso[] = ["editor_obras", "editor_completo", "administrador"];

export function UsuarioRow({
  usuario,
  souEu,
}: {
  usuario: UsuarioAdmin;
  souEu: boolean;
}) {
  const pendente = usuario.convite_status === "pendente";
  const [isPending, startTransition] = useTransition();
  const [editandoNivel, setEditandoNivel] = useState(false);
  const [nivel, setNivel] = useState<NivelAcesso>(usuario.nivel_acesso);
  const [erro, setErro] = useState<string | null>(null);
  const [excluindo, setExcluindo] = useState(false);

  async function handleSalvarNivel() {
    setErro(null);
    const resultado = await atualizarNivelAcesso(usuario.id, nivel);
    if (resultado.error) {
      setErro(resultado.error);
      setNivel(usuario.nivel_acesso);
    } else {
      setEditandoNivel(false);
    }
  }

  async function handleExcluir() {
    const ok = window.confirm(
      pendente
        ? `Cancelar o convite de ${usuario.email}?`
        : `Excluir o acesso de ${usuario.nome}? Essa pessoa não vai mais conseguir entrar no admin.`
    );
    if (!ok) return;

    setExcluindo(true);
    setErro(null);
    const formData = new FormData();
    formData.set("id", usuario.id);
    const resultado = await excluirUsuarioAdmin(formData);
    if (resultado?.error) {
      setErro(resultado.error);
      setExcluindo(false);
    }
    // Sucesso: revalidatePath tira a linha da lista sozinho.
  }

  return (
    <>
      <tr>
        <td className="py-3.5 pr-3 border-b border-line text-[13.5px]">
          {pendente ? (
            <span className="text-muted">Aguardando cadastro</span>
          ) : (
            <span className="text-navy font-medium">{usuario.nome}</span>
          )}
        </td>
        <td className="py-3.5 pr-3 border-b border-line text-muted text-[13.5px]">{usuario.email}</td>
        <td className="py-3.5 pr-3 border-b border-line text-[13.5px]">
          {editandoNivel ? (
            <select
              value={nivel}
              onChange={(e) => setNivel(e.target.value as NivelAcesso)}
              className="border border-line rounded px-2 py-1.5 text-[13.5px]"
            >
              {NIVEIS.map((n) => (
                <option key={n} value={n}>
                  {LABEL_NIVEL[n]}
                </option>
              ))}
            </select>
          ) : (
            LABEL_NIVEL[usuario.nivel_acesso]
          )}
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
        <td className="py-3.5 border-b border-line text-right text-[13.5px] whitespace-nowrap">
          {editandoNivel ? (
            <>
              <button
                type="button"
                disabled={isPending}
                onClick={() => startTransition(handleSalvarNivel)}
                className="text-navy hover:text-gold active:text-gold transition-colors disabled:opacity-50 mr-3"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => {
                  setNivel(usuario.nivel_acesso);
                  setEditandoNivel(false);
                }}
                className="text-muted hover:text-navy transition-colors"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              {pendente && (
                <button
                  disabled={isPending || excluindo}
                  onClick={() => startTransition(() => reenviarConvite(usuario.email))}
                  className="text-gold hover:underline disabled:opacity-50 mr-3"
                >
                  Reenviar
                </button>
              )}
              {!souEu && (
                <button
                  type="button"
                  disabled={excluindo}
                  onClick={() => setEditandoNivel(true)}
                  className="text-navy hover:text-gold active:text-gold transition-colors disabled:opacity-50 mr-3"
                >
                  Editar nível
                </button>
              )}
              {souEu ? (
                <span className="text-muted text-xs">Você</span>
              ) : (
                <button
                  type="button"
                  disabled={excluindo}
                  onClick={handleExcluir}
                  className="text-[#8A5252] hover:text-gold active:text-gold transition-colors disabled:opacity-50"
                >
                  {excluindo ? "Excluindo…" : pendente ? "Cancelar convite" : "Excluir"}
                </button>
              )}
            </>
          )}
        </td>
      </tr>
      {erro && (
        <tr>
          <td colSpan={5} className="pb-3 pt-1 border-b border-line text-[12px] text-[#8A5252]">
            {erro}
          </td>
        </tr>
      )}
    </>
  );
}
