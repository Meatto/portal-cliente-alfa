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

export interface CriarClienteState {
  error?: string;
  success?: boolean;
}

// Cadastro manual de um único cliente, sem precisar montar/subir CSV.
export async function criarClienteManual(
  _prevState: CriarClienteState,
  formData: FormData
): Promise<CriarClienteState> {
  await exigirAdmin(["administrador"]);
  const supabase = createSupabaseServerClient();

  const cpf = onlyDigits(String(formData.get("cpf") ?? ""));
  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const telefone = String(formData.get("telefone") ?? "").trim();

  if (!cpfValido(cpf)) return { error: "CPF inválido. Confira os números digitados." };
  if (!nome) return { error: "Digite o nome do cliente." };

  const { error } = await supabase.from("clientes").insert({
    cpf,
    nome,
    email: email || null,
    telefone: telefone || null,
    ativo: true,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "Já existe um cliente cadastrado com esse CPF." };
    }
    return { error: "Não foi possível cadastrar o cliente." };
  }

  revalidatePath("/admin/clientes");
  return { success: true };
}

// Edição de um cliente já cadastrado (nome, e-mail, telefone). O CPF não
// é editável aqui — é a chave usada no login do cliente e na importação.
export async function atualizarCliente(id: string, nome: string, email: string, telefone: string) {
  await exigirAdmin(["administrador"]);
  const supabase = createSupabaseServerClient();

  const nomeLimpo = nome.trim();
  if (!id || !nomeLimpo) return;

  await supabase
    .from("clientes")
    .update({
      nome: nomeLimpo,
      email: email.trim() || null,
      telefone: telefone.trim() || null,
    })
    .eq("id", id);

  revalidatePath("/admin/clientes");
}
