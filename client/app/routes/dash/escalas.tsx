import type { Route } from "./+types/escalas";
import { PageHeaderComponent } from "~/components/page-header";
import { DataTableAuto } from "~/components/table/data-table-auto";
import type { TableListHeaderProps } from "~/components/table/data-table";
import { useDialog } from "~/hooks/use-dialog";
import { apiClient } from "~/service/axios";
import { queryClient } from "~/lib/query";
import { SchedulesModel, type SchedulesProps } from "~/models/schedules.model";
import { FormSchedules } from "./components/schedules/form-schedules";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Escalas" },
    {
      name: "listagem dos escalas",
      content: "Manipulação de dados das escalas",
    },
  ];
}

const levelsHeaders: TableListHeaderProps<SchedulesProps>[] = [
  {
    name: "Monitor",
    data: (item) => item.teachers?.teacherId,
  },
  {
    name: "Classe",
    data: (item) => item.classes?.name,
  },
  {
    name: "Nível",
    data: (item) => item.classes?.level.name,
  },
  {
    name: "Estado",
    data: (item) => (item.active ? "Activo" : "Não Activo"),
    orderProperty: "active",
  },
];

export default function SchedulesPage() {
  const { handleDelete, handleOpenCustom } = useSchedules();
  return (
    <main className=" w-full max-w-[1440px] px-2 mx-auto md:px-2">
      <PageHeaderComponent
        title="Listagem das Escalas"
        addButtonFn={() => handleOpenCustom()}
        addButtonText="Nova"
      />
      <DataTableAuto
        headers={levelsHeaders}
        apiPath={[SchedulesModel.GETS]}
        handleDelete={(item) => handleDelete(item.scheduleId)}
      />
    </main>
  );
}

function useSchedules() {
  const { openDeleteConfirm, openCustomComponent } = useDialog();
  const handleDelete = (id?: string) =>
    openDeleteConfirm({
      handleAccept: async () => {
        await apiClient.delete(`${SchedulesModel.ENDPOINT}/${id}`);
        await queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey.includes(SchedulesModel.ENDPOINT),
        });
      },
    });

  const handleOpenCustom = (id?: string) => {
    openCustomComponent(FormSchedules, {
      params: { id },
      handleAccept: async () =>
        await queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey.includes(SchedulesModel.ENDPOINT),
        }),
      size: "lg",
    });
  };

  return {
    handleDelete,
    handleOpenCustom,
  };
}
