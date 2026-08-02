import { NovaObraForm } from "@/components/admin/NovaObraForm";
import { exigirAdmin } from "@/lib/auth/admin-guard";

export default async function NovaObraPage() {
  await exigirAdmin(["editor_obras", "editor_completo", "administrador"]);
  return (
    <>
      <h2 className="text-[22px] text-navy mb-6">Cadastrar empreendimento</h2>
      <NovaObraForm />
    </>
  );
}
