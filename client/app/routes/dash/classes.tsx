import { PageHeaderComponent } from "~/components/page-header";
import type { Route } from "./+types/classes";
import { DataTableAuto } from "~/components/table/data-table-auto";
import { ClassesModel, type ClassesProps } from "~/models/classes.model";
import type { TableListHeaderProps } from "~/components/table/data-table";
import { useDialog } from "~/hooks/use-dialog";
import { apiClient } from "~/service/axios";
import { queryClient } from "~/lib/query";
import { FormClasses } from "./components/classes/form-classes";
import { PERMISSIONSMAP } from "~/data/permissions-map";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Classes" },
    {
      name: "listagem das classes",
      content: "Manipulação de dados das classes",
    },
  ];
}

const classesHeaders: TableListHeaderProps<ClassesProps>[] = [
  {
    name: "Nome",
    data: (item) => item?.name,
  },
  {
    name: "Nível",
    data: (item) => item.levels.name,
  },
  {
    name: "Descrição",
    data: (item) => item.description,
  },
];

export default function ClassesPage() {
  const { handleDelete, handleOpenCustom } = useClasses();
  return (
    <main className=" w-full max-w-[1440px] px-2 mx-auto md:px-2">
      <PageHeaderComponent
        title="Listagem das Classes"
        addButtonFn={() => handleOpenCustom()}
        addButtonText="Nova"
        permissions={[PERMISSIONSMAP.CLASS_MANAGE]}
      />
      <DataTableAuto
        headers={classesHeaders}
        apiPath={[ClassesModel.GETS]}
        handleDelete={(item) => handleDelete(item.classId)}
      />
    </main>
  );
}

function useClasses() {
  const { openDeleteConfirm, openCustomComponent } = useDialog();
  const handleDelete = (id?: string) =>
    openDeleteConfirm({
      handleAccept: async () => {
        await apiClient.delete(`${ClassesModel.ENDPOINT}/${id}`);
        await queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes(ClassesModel.GETS),
        });
      },
    });

  const handleOpenCustom = (id?: string) => {
    openCustomComponent(FormClasses, {
      params: { id },
      handleAccept: async () =>
        await queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes(ClassesModel.GETS),
        }),
      size: "sm",
    });
  };

  return {
    handleDelete,
    handleOpenCustom,
  };
}
