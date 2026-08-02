"use server";

import { cookies } from "next/headers";
import { CLIENTE_SESSION_COOKIE, lerSessaoCliente } from "@/lib/auth/cliente-session";
import { registrarResposta } from "@/lib/data/pesquisa";

export async function responderPesquisa(campanhaId: string, nota: number) {
  const token = cookies().get(CLIENTE_SESSION_COOKIE)?.value;
  const sessao = await lerSessaoCliente(token);
  if (!sessao) return { ok: false };

  if (nota < 1 || nota > 5) return { ok: false };

  const ok = await registrarResposta(campanhaId, nota, sessao.clienteId);
  return { ok };
}
