"use server";

import Papa from "papaparse";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { exigirAdmin } from "@/lib/auth/admin-guard";
import { cpfValido, onlyDigits } from "@/lib/utils";

export interface ImportState {
  error?: string;
  success?: boolean;
  importados?: number;
  ignorados?: number;
}

const initialState: ImportState = {};

export async function importarClientesCsv(
  _prevState: ImportState,
  formData: FormData
): Promise<ImportState> {
  await exigirAdmin(["administrador"]);
  const supabase = createSupabaseServerClient();

  const arquivo = formData.get("arquivo");
  if (!(arquivo instanceof File) || arquivo.size === 0) {
    return { error: "Selecione o arquivo CSV exportado do Sienge." };
  }

  const texto = await arquivo.text();
  const { data } = Papa.parse<Record<string, string>>(texto, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase(),
  });

  const linhasValidas = [];
  let ignorados = 0;

  for (const linha of data) {
    const cpf = onlyDigits(linha.cpf ?? "");
    const nome = (linha.nome ?? "").trim();
    if (!cpfValido(cpf) || !nome) {
      ignorados += 1;
      continue;
    }
    linhasValidas.push({
      cpf,
      nome,
      email: (linha.email ?? "").trim() || null,
      telefone: (linha.telefone ?? "").trim() || null,
      ativo: true,
    });
  }

  if (linhasValidas.length === 0) {
    return { error: "Nenhuma linha válida encontrada. Confira as colunas: cpf, nome, email, telefone." };
  }

  const { error } = await supabase.from("clientes").upsert(linhasValidas, { onConflict: "cpf" });

  if (error) {
    return { error: "Erro ao importar. Verifique o formato do arquivo e tente novamente." };
  }

  revalidatePath("/admin/clientes");
  return { success: true, importados: linhasValidas.length, ignorados };
}
