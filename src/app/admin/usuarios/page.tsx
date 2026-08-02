import { UsersTable } from "@/components/admin/UsersTable";
import { InviteForm } from "@/components/admin/InviteForm";
import { listarUsuariosAdmin } from "@/lib/data/admin-usuarios";
import { exigirAdmin } from "@/lib/auth/admin-guard";

export default async function AdminUsuariosPage() {
  await exigirAdmin(["administrador"]);
  const usuarios = await listarUsuariosAdmin();

  return (
    <>
      <h2 className="text-[22px] text-navy mb-6">Usuários</h2>
      <UsersTable usuarios={usuarios} />
      <InviteForm />
    </>
  );
}
