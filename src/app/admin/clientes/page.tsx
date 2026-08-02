import { ClientesImport } from "@/components/admin/ClientesImport";
import { ClienteAdicionar } from "@/components/admin/ClienteAdicionar";
import { ClienteRow } from "@/components/admin/ClienteRow";
import { listarClientesRecentes } from "@/lib/data/admin-clientes";
import { exigirAdmin } from "@/lib/auth/admin-guard";

export default async function AdminClientesPage() {
  await exigirAdmin(["administrador"]);
  const { clientes, total } = await listarClientesRecentes();

  return (
    <>
      <h2 className="text-[22px] text-navy mb-6">Clientes</h2>
      <ClientesImport />
      <ClienteAdicionar />

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
              <ClienteRow key={cliente.id} cliente={cliente} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
