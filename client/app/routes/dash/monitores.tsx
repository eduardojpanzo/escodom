import { PageHeaderComponent } from "~/components/page-header";
import type { Route } from "./+types/monitores";
import { DataTableAuto } from "~/components/table/data-table-auto";
import { TeachersModel, type TeachersProps } from "~/models/teachers.model";
import type { TableListHeaderProps } from "~/components/table/data-table";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lista de Dados" },
    { name: "description", content: "Manipulação de dados" },
  ];
}

const teachersHeaders: TableListHeaderProps<TeachersProps>[] = [
  {
    name: "Nome",
    data: (item) => item.person.name,
    orderProperty: "person.nome",
  },
  {
    name: "telefone",
    data: (item) => item.person.phone,
    orderProperty: "person.phone",
  },
  {
    name: "Cargo",
    data: (item) => item.position,
    orderProperty: "person.position",
  },
  {
    name: "Ano de Formação",
    data: (item) => item.trainingYear,
    orderProperty: "person.trainingYear",
  },
];

export default function MonitoresPage() {
  return (
    <main className=" w-full max-w-[1440px] px-2 mx-auto md:px-2">
      <PageHeaderComponent title="Listagem dos Monitores" />
      <DataTableAuto headers={teachersHeaders} apiPath={[TeachersModel.GETS]} />
    </main>
  );
}
