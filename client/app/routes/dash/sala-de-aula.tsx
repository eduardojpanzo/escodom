import type { Route } from "./+types/sala-de-aula";
import { PageHeaderComponent } from "~/components/page-header";
import { DataTableAuto } from "~/components/table/data-table-auto";
import {
  ClassroomsModel,
  type ClassroomsProps,
} from "~/models/classrooms.model";
import type { TableListHeaderProps } from "~/components/table/data-table";
import { useDialog } from "~/hooks/use-dialog";
import { apiClient } from "~/service/axios";
import { queryClient } from "~/lib/query";
import { FormClassrooms } from "./components/classrooms/form-classrooms";
import { PERMISSIONSMAP } from "~/data/permissions-map";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Salas de Aulas" },
    {
      name: "listagem das salas de aula",
      content: "Manipulação de dados das salas de aula",
    },
  ];
}

const classroomsHeaders: TableListHeaderProps<ClassroomsProps>[] = [
  {
    name: "Nome",
    data: (item) => item.name,
  },
  {
    name: "Classe",
    data: (item) => item.classes.name,
  },
  {
    name: "Descrição",
    data: (item) => item.description,
  },
];

export default function ClassroomsPage() {
  const { handleDelete, handleOpenCustom } = useClassrooms();
  return (
    <main className=" w-full max-w-[1440px] px-2 mx-auto md:px-2">
      <PageHeaderComponent
        title="Listagem das sala de aula"
        addButtonFn={() => handleOpenCustom()}
        addButtonText="Nova"
        permissions={[PERMISSIONSMAP.CLASSROOM_MANAGE]}
      />
      <DataTableAuto
        headers={classroomsHeaders}
        apiPath={[ClassroomsModel.GETS]}
        handleDelete={(item) => handleDelete(item.classId)}
      />
    </main>
  );
}

function useClassrooms() {
  const { openDeleteConfirm, openCustomComponent } = useDialog();
  const handleDelete = (id?: string) =>
    openDeleteConfirm({
      handleAccept: async () => {
        await apiClient.delete(`${ClassroomsModel.ENDPOINT}/${id}`);
        await queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes(ClassroomsModel.GETS),
        });
      },
    });

  const handleOpenCustom = (id?: string) => {
    openCustomComponent(FormClassrooms, {
      params: { id },
      handleAccept: async () =>
        await queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes(ClassroomsModel.GETS),
        }),
      size: "sm",
    });
  };

  return {
    handleDelete,
    handleOpenCustom,
  };
}
