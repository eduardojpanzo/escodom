import { PageHeaderComponent } from "~/components/page-header";
import type { Route } from "./+types/monitores";
import { DataTableAuto } from "~/components/table/data-table-auto";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lista de Dados" },
    { name: "description", content: "Manipulação de dados" },
  ];
}

export default function MonitoresPage() {
  return (
    <main className=" w-full max-w-[1440px] px-2 mx-auto md:px-2">
      <PageHeaderComponent backUrl="./" title="Informações das Pedras" />
      {/* <DataTableAuto /> */}
    </main>
  );
}
