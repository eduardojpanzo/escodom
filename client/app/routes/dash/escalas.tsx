import type { Route } from "./+types/escalas";
import { PageHeaderComponent } from "~/components/page-header";
import { DataTableAuto } from "~/components/table/data-table-auto";
import type { TableListHeaderProps } from "~/components/table/data-table";
import { useDialog } from "~/hooks/use-dialog";
import { apiClient } from "~/service/axios";
import { queryClient } from "~/lib/query";
import { SchedulesModel, type SchedulesProps } from "~/models/schedules.model";
import { FormSchedules } from "./components/schedules/form-schedules";
import { TotalCard } from "~/components/total-card-item";
import { NotebookTabs } from "lucide-react";
import type { Field } from "~/components/table/filter";
import { TeachersModel } from "~/models/teachers.model";
import { ClassroomsModel } from "~/models/classrooms.model";
import { invalidateQueries } from "~/helpers/query";
import { PERMISSIONSMAP } from "~/data/permissions-map";

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
    data: (item) => item.teachers?.people?.name,
  },
  {
    name: "Sala de Aula",
    data: (item) => item.classrooms?.name,
  },
  {
    name: "Classe",
    data: (item) => item.classrooms?.classes?.name,
  },
  {
    name: "Estado",
    data: (item) => (item.active ? "Activo" : "Não Activo"),
  },
  {
    name: "Data de Início",
    data: (item) => item.startDate,
    isDateTime: true,
  },
  {
    name: "Data de Fim",
    data: (item) => item.endDate,
    isDateTime: true,
  },
  {
    name: "Criado Em",
    data: (item) => item.createdAt,
    isDateTime: true,
  },
];

const filter: Field[] = [
  {
    type: "input",
    label: "Nome",
    name: "name",
    config: {
      type: "text",
      placeholder: "Nome da sala de aula",
    },
    validator: (z) =>
      z.string({ message: "o nome tem que ser uma string" }).optional(),
  },
  {
    type: "autocomplete",
    label: "Monitor",
    name: "teacherId",
    config: {
      placeholder: "Selecione a classe",
      path: TeachersModel.GETS,
      propertyLabel: "name",
      propertyValue: "teacherId",
    },
    validator: (z) =>
      z
        .object({
          label: z.string().optional(),
          value: z.string().optional(),
        })
        .optional(),
  },
  {
    type: "autocomplete",
    label: "Sala de Aula",
    name: "classroomId",
    config: {
      placeholder: "Selecione a sala de aula",
      path: ClassroomsModel.GETS,
      propertyLabel: "name",
      propertyValue: "classroomId",
    },
    validator: (z) =>
      z
        .object({
          label: z.string().optional(),
          value: z.string().optional(),
        })
        .optional(),
  },
  {
    type: "input",
    label: "Data de Início da Escala",
    name: "startDate",
    config: {
      type: "date",
      placeholder: "Nome da sala de aula",
    },
    validator: (z) => z.coerce.date().optional(),
  },
  {
    type: "input",
    label: "Data de Fim da Escala",
    name: "endDate",
    config: {
      type: "date",
      placeholder: "Nome da sala de aula",
    },
    validator: (z) => z.coerce.date().optional(),
  },
];

export default function SchedulesPage() {
  const { handleDelete, handleOpenCustom } = useSchedules();
  return (
    <main className=" w-full max-w-[1440px] px-2 mx-auto md:px-2">
      <PageHeaderComponent
        title="Listagem das Escalas"
        addButtonFn={() => handleOpenCustom()}
        addButtonText="Nova Escala"
        permissions={[PERMISSIONSMAP.SCHEDULE_MANAGE]}
      />

      <div className="max-w-full my-4 flex gap-4 overflow-x-auto">
        <TotalCard
          color="text-yellow-500"
          title="Escalas Ativas"
          icon={NotebookTabs}
          value={4}
        />
        <TotalCard
          color="text-yellow-500"
          title="Escalas Inativas"
          icon={NotebookTabs}
          value={4}
        />
      </div>

      <DataTableAuto
        headers={levelsHeaders}
        filter={filter}
        apiPath={[SchedulesModel.GETS]}
        handleDelete={(item) => handleDelete(item.scheduleId)}
        handleEdit={(item) => handleOpenCustom(item.scheduleId)}
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
        await invalidateQueries({
          queryKey: SchedulesModel.GETS,
        });
      },
    });

  const handleOpenCustom = (id?: string) => {
    openCustomComponent(FormSchedules, {
      params: { id },
      handleAccept: async () =>
        await invalidateQueries({
          queryKey: SchedulesModel.GETS,
        }),
      size: "lg",
    });
  };

  return {
    handleDelete,
    handleOpenCustom,
  };
}
