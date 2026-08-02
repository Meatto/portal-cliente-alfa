import { ClientesImport } from "@/components/admin/ClientesImport";
import { listarClientesRecentes } from "@/lib/data/admin-clientes";
import { exigirAdmin } from "@/lib/auth/admin-guard";

export default async function AdminClientesPage() {
  await exigirAdmin(["administrador"]);
  const { clientes, total } = await listarClientesRecentes();

  return (
    <>
      <h2 className="text-[22px] text-navy mb-6">Clientes</h2>
      <ClientesImport />

      <div className="bg-surface border border-line rounded p-6 sm:p-8 overflow-x-auto">
        <div className="text-[10px] tracking-[.24em] uppercase text-muted mb-4">
          {total} cliente(s) na base · mostrando os mais recentes
        </div>
        <table className="w-full border-collapse min-w-[520px]">
          <thead>
            <tr>
              {["Nome", "CPF", "E-mail", "Telefone", "Status"].map((h) => (
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
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td className="py-3 pr-3 border-b border-line text-navy font-medium text-[13.5px]">
                  {cliente.nome}
                </td>
                <td className="py-3 pr-3 border-b border-line text-muted text-[13.5px]">
                  {cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
                </td>
                <td className="py-3 pr-3 border-b border-line text-muted text-[13.5px]">
                  {cliente.email ?? "—"}
                </td>
                <td className="py-3 pr-3 border-b border-line text-muted text-[13.5px]">
                  {cliente.telefone ?? "—"}
                </td>
                <td className="py-3 border-b border-line text-[13.5px]">
                  <span
                    className={`text-[11px] px-2.5 py-1 rounded-full ${
                      cliente.ativo ? "bg-[#E8F0E8] text-[#3F6B45]" : "bg-[#F0E8E8] text-[#8A5252]"
                    }`}
                  >
                    {cliente.ativo ? "Ativo" : "Inativo"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
