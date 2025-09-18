import { PageHeaderComponent } from "~/components/page-header";
import type { Route } from "./+types/monitores";
import { DataTableAuto } from "~/components/table/data-table-auto";
import { TeachersModel, type TeachersProps } from "~/models/teachers.model";
import type { TableListHeaderProps } from "~/components/table/data-table";
import { useDialog } from "~/hooks/use-dialog";
import { apiClient } from "~/service/axios";
import { queryClient } from "~/lib/query";
import { FormTeachers } from "./components/monitores/form-monitores";
import { POSITIONS } from "~/data/positions";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lista de Dados" },
    { name: "description", content: "Manipulação de dados" },
  ];
}

const teachersHeaders: TableListHeaderProps<TeachersProps>[] = [
  {
    name: "Nome",
    data: (item) => item.people.name,
  },
  {
    name: "telefone",
    data: (item) => item.people.phone,
  },
  {
    name: "Cargo",
    data: (item) => POSITIONS.find((pos) => pos.value === item.position)?.label,
  },
  {
    name: "Ano de Formação",
    data: (item) => item.trainingYear,
  },
];

export default function TeachersPage() {
  const { handleDelete, handleOpenCustom } = useTeachers();
  return (
    <main className=" w-full max-w-[1440px] px-2 mx-auto md:px-2">
      <PageHeaderComponent
        title="Listagem dos Monitores"
        addButtonFn={() => handleOpenCustom()}
        addButtonText="Novo"
      />
      <DataTableAuto
        headers={teachersHeaders}
        apiPath={[TeachersModel.GETS]}
        handleDelete={(item) => handleDelete(item.teacherId)}
      />
    </main>
  );
}

function useTeachers() {
  const { openDeleteConfirm, openCustomComponent } = useDialog();
  const handleDelete = (id?: string) =>
    openDeleteConfirm({
      handleAccept: async () => {
        await apiClient.delete(`${TeachersModel.ENDPOINT}/${id}`);
        await queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes(TeachersModel.ENDPOINT),
        });
      },
    });

  const handleOpenCustom = (id?: string) => {
    openCustomComponent(FormTeachers, {
      params: { id },
      handleAccept: async () =>
        await queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes(TeachersModel.ENDPOINT),
        }),
      size: "lg",
    });
  };

  return {
    handleDelete,
    handleOpenCustom,
  };
}
