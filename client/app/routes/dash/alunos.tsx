import type { TableListHeaderProps } from "~/components/table/data-table.js";
import type { Route } from "./+types/alunos.tsx";
import { PageHeaderComponent } from "~/components/page-header";
import { StudentsModel, type StudentsProps } from "~/models/students.model.js";
import { DataTableAuto } from "~/components/table/data-table-auto.js";
import { useDialog } from "~/hooks/use-dialog.js";
import { apiClient } from "~/service/axios.js";
import { queryClient } from "~/lib/query.js";
import { FormStudents } from "./components/students/form-students.js";
import { PERMISSIONSMAP } from "~/data/permissions-map.js";
import type { Field } from "~/components/table/filter.js";
import { ClassroomsModel } from "~/models/classrooms.model.js";
import { LevelsModel } from "~/models/levels.model.js";
import { Mars, UserPenIcon, Venus } from "lucide-react";
import { TotalCard } from "~/components/total-card-item.js";
import { invalidateQueries } from "~/helpers/query.js";
import { UpdateStudents } from "./components/students/update-students.js";
import { UpdadePeople } from "./components/people/update-people.js";
import { IconButton } from "~/components/icon-button.js";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu.js";
import { ActionItem } from "~/components/table/actions.js";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Alunos" },
    {
      name: "listagem dos alunos",
      content: "Manipulação de dados dos alunos",
    },
  ];
}

const studentsHeaders: TableListHeaderProps<StudentsProps>[] = [
  {
    name: "Nome",
    data: (item) => item?.people?.name,
  },
  {
    name: "telefone",
    data: (item) => item?.people?.phone,
  },
  {
    name: "Sala - Classe",
    data: (item) =>
      `${item?.classrooms?.name ?? ""} - ${item.classrooms?.classes?.name ?? ""}`,
  },
  {
    name: "Ano de Nascimento",
    data: (item) => item?.people?.birthDate,
    isDate: true,
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
];

export default function SrudentsPage() {
  const {
    handleDelete,
    handleOpenCustom,
    handleEditCustom,
    handleUpdatePerson,
  } = useStudents();
  return (
    <main className=" w-full max-w-[1440px] px-2 mx-auto md:px-2">
      <PageHeaderComponent
        title="Listagem dos Alunos"
        addButtonFn={() => handleOpenCustom()}
        addButtonText="Novo"
        permissions={[PERMISSIONSMAP.STUDENT_MANAGE]}
      />

      <div className="max-w-full my-4 flex gap-4 overflow-x-auto">
        <TotalCard
          color="text-blue-500"
          title="Masculinos"
          icon={Mars}
          value={4}
        />
        <TotalCard
          color="text-pink-500"
          title="Alunos do 2º Nível"
          icon={Venus}
          value={4}
        />
      </div>

      <DataTableAuto
        headers={studentsHeaders}
        filter={filter}
        apiPath={[StudentsModel.GETS]}
        handleEdit={(item) => handleEditCustom(item.studentId)}
        handleDelete={(item) => handleDelete(item.studentId)}
        customActions={(item) => (
          <>
            <ActionItem
              onClick={(e) => {
                e.stopPropagation();
                handleUpdatePerson(item.personId);
              }}
              Icon={<UserPenIcon />}
              text="Atualizar dados pessoais"
            />
          </>
        )}
      />
    </main>
  );
}

function useStudents() {
  const { openDeleteConfirm, openCustomComponent } = useDialog();
  const handleDelete = (id?: string) =>
    openDeleteConfirm({
      handleAccept: async () => {
        await apiClient.delete(`${StudentsModel.ENDPOINT}/${id}`);
        await invalidateQueries({
          queryKey: StudentsModel.GETS,
        });
      },
    });

  const handleOpenCustom = () => {
    openCustomComponent(FormStudents, {
      handleAccept: async () =>
        await invalidateQueries({
          queryKey: StudentsModel.GETS,
        }),
      size: "lg",
    });
  };

  const handleEditCustom = (id: string) => {
    openCustomComponent(UpdateStudents, {
      handleAccept: async () =>
        await invalidateQueries({
          queryKey: StudentsModel.GETS,
        }),
      params: { id },
      size: "sm",
    });
  };
  const handleUpdatePerson = (id: string) => {
    openCustomComponent(UpdadePeople, {
      handleAccept: async () =>
        await invalidateQueries({
          queryKey: StudentsModel.GETS,
        }),
      params: { id },
      size: "lg",
    });
  };

  return {
    handleDelete,
    handleOpenCustom,
    handleEditCustom,
    handleUpdatePerson,
  };
}
