import type { Route } from "./+types/alunos.tsx";
import { PageHeaderComponent } from "~/components/page-header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lista de Dados" },
    { name: "description", content: "Manipulação de dados" },
  ];
}

export default function AlunosPage() {
  return (
    <main className=" w-full max-w-[1440px] px-2 mx-auto md:px-2">
      <PageHeaderComponent backUrl="./" title="Informações das Pedras" />
      {/* <DataTableAuto /> */}
    </main>
  );
}
