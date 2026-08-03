import { UsuarioRow } from "@/components/admin/UsuarioRow";
import type { UsuarioAdmin } from "@/types/database";

export function UsersTable({
  usuarios,
  usuarioAtualId,
}: {
  usuarios: UsuarioAdmin[];
  usuarioAtualId: string;
}) {
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
          {usuarios.map((usuario) => (
            <UsuarioRow key={usuario.id} usuario={usuario} souEu={usuario.id === usuarioAtualId} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
