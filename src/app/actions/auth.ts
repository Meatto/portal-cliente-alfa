"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  CLIENTE_SESSION_COOKIE,
  CLIENTE_SESSION_MAX_AGE,
  criarTokenSessaoCliente,
} from "@/lib/auth/cliente-session";
import { cpfValido, onlyDigits } from "@/lib/utils";

export interface LoginState {
  error?: string;
}

/**
 * Confere o CPF contra a tabela `clientes`. Tenta primeiro a Supabase
 * Edge Function `cpf-login` (mantém a service role key fora do processo
 * Next.js); se ela não estiver configurada/disponível ainda, cai para uma
 * consulta direta usando o client admin — útil durante o setup inicial.
 */
async function buscarClientePorCpf(cpf: string): Promise<{ id: string; nome: string } | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const internalKey = process.env.CPF_LOGIN_INTERNAL_KEY;

  if (supabaseUrl) {
    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/cpf-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(internalKey ? { "x-internal-key": internalKey } : {}),
        },
        body: JSON.stringify({ cpf }),
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.ok) return data.cliente;
        return null;
      }
      // se a function não existir ainda (404) cai no fallback abaixo
      if (res.status !== 404) return null;
    } catch {
      // rede indisponível para a edge function — cai no fallback abaixo
    }
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("clientes")
      .select("id, nome, ativo")
      .eq("cpf", cpf)
      .maybeSingle();

    if (error || !data || !data.ativo) return null;
    return { id: data.id, nome: data.nome };
  } catch {
    return null;
  }
}

export async function loginComCpf(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const cpfDigitado = String(formData.get("cpf") ?? "");
  const cpf = onlyDigits(cpfDigitado);

  if (!cpfValido(cpf)) {
    return { error: "CPF inválido. Confira os números digitados." };
  }

  const cliente = await buscarClientePorCpf(cpf);

  if (!cliente) {
    return {
      error: "Não encontramos esse CPF na nossa base. Verifique os números ou fale com a Alfa.",
    };
  }

  const token = await criarTokenSessaoCliente({ clienteId: cliente.id, nome: cliente.nome });

  cookies().set(CLIENTE_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: CLIENTE_SESSION_MAX_AGE,
  });

  redirect("/portal");
}

export async function logoutCliente() {
  cookies().delete(CLIENTE_SESSION_COOKIE);
  redirect("/");
}
