import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase com a service role key — só pode ser usado em código
 * que roda no servidor (Server Actions, Route Handlers). Ignora RLS por
 * desenho do Supabase, então é o que alimenta o Portal do Cliente
 * (login por CPF, empreendimentos, etapas, fotos, resposta de pesquisa).
 *
 * Nunca importe este arquivo em um Client Component.
 */
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase não configurado: defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local"
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
