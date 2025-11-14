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
import { BookUser } from "lucide-react";
import { TotalCard } from "~/components/total-card-item";
import { ClassesModel } from "~/models/classes.model";
import type { Field } from "~/components/table/filter";
import { invalidateQueries } from "~/helpers/query";
import { LevelsModel } from "~/models/levels.model";

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
    data: (item) => item.classes?.name,
  },
  {
    name: "Descrição",
    data: (item) => item.description,
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
    label: "Classe",
    name: "classId",
    config: {
      placeholder: "Selecione a classe",
      path: ClassesModel.GETS,
      propertyLabel: "name",
      propertyValue: "classId",
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
    label: "Nível",
    name: "levelId",
    config: {
      placeholder: "Selecione o nível",
      path: LevelsModel.GETS,
      propertyLabel: "name",
      propertyValue: "levelId",
    },
    validator: (z) =>
      z
        .object({
          label: z.string().optional(),
          value: z.string().optional(),
        })
        .optional(),
  },
];

export default function ClassroomsPage() {
  const { handleDelete, handleOpenCustom } = useClassrooms();
  return (
    <main className=" w-full max-w-[1440px] px-2 mx-auto md:px-2">
      <PageHeaderComponent
        title="Listagem de sala de aula"
        addButtonFn={() => handleOpenCustom()}
        addButtonText="Nova Sala"
        permissions={[PERMISSIONSMAP.CLASSROOM_MANAGE]}
      />

      <div className="max-w-full my-4 flex gap-4 overflow-x-auto">
        <TotalCard
          color="text-yellow-500"
          title="Alunos do Jardim A"
          icon={BookUser}
          value={4}
        />
        <TotalCard
          color="text-yellow-500"
          title="Alunos do Jardim B"
          icon={BookUser}
          value={4}
        />
      </div>

      <DataTableAuto
        headers={classroomsHeaders}
        filter={filter}
        apiPath={[ClassroomsModel.GETS]}
        handleDelete={(item) => handleDelete(item.classroomId)}
        handleEdit={(item) => handleOpenCustom(item.classroomId)}
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
        await invalidateQueries({ queryKey: ClassroomsModel.GETS });
      },
    });

  const handleOpenCustom = (id?: string) => {
    openCustomComponent(FormClassrooms, {
      params: { id },
      handleAccept: async () =>
        await invalidateQueries({ queryKey: ClassroomsModel.GETS }),
      size: "md",
    });
  };

  return {
    handleDelete,
    handleOpenCustom,
  };
}
