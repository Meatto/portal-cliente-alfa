// Supabase Edge Function: cpf-login
//
// Recebe um CPF, confere na tabela `clientes` (usando a service role key,
// que nunca fica exposta ao navegador) e devolve os dados mínimos para o
// Next.js criar a sessão do cliente (cookie httpOnly assinado).
//
// O CPF é só a "porteira": esta função não expõe nenhum dado de contrato,
// apenas { id, nome } quando o CPF é encontrado e está ativo.
//
// Deploy: supabase functions deploy cpf-login --no-verify-jwt

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Chave compartilhada simples para aceitar chamadas apenas do backend
// Next.js (evita que qualquer pessoa chame a function direto do navegador).
const INTERNAL_KEY = Deno.env.get("CPF_LOGIN_INTERNAL_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-internal-key",
};

function onlyDigits(v: string) {
  return (v || "").replace(/\D/g, "");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "method_not_allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (INTERNAL_KEY && req.headers.get("x-internal-key") !== INTERNAL_KEY) {
    return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const cpf = onlyDigits(body.cpf ?? "");

    if (cpf.length !== 11) {
      return new Response(JSON.stringify({ ok: false, error: "cpf_invalido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const { data: cliente, error } = await supabase
      .from("clientes")
      .select("id, nome, ativo")
      .eq("cpf", cpf)
      .maybeSingle();

    if (error) {
      console.error("cpf-login query error", error);
      return new Response(JSON.stringify({ ok: false, error: "erro_interno" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!cliente || !cliente.ativo) {
      return new Response(JSON.stringify({ ok: false, error: "cpf_nao_encontrado" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ ok: true, cliente: { id: cliente.id, nome: cliente.nome } }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("cpf-login unexpected error", err);
    return new Response(JSON.stringify({ ok: false, error: "erro_interno" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
