import type { Route } from "./+types/minha-turma.tsx";
import type { TableListHeaderProps } from "~/components/table/data-table.js";
import { PageHeaderComponent } from "~/components/page-header";
import { StudentsModel, type StudentsProps } from "~/models/students.model.js";
import { DataTableAuto } from "~/components/table/data-table-auto.js";
import { useDialog } from "~/hooks/use-dialog.js";
import { apiClient } from "~/service/axios.js";
import { PERMISSIONSMAP } from "~/data/permissions-map.js";
import {
  SchedulesModel,
  type SchedulesProps,
} from "~/models/schedules.model.js";
import { useQuery } from "@tanstack/react-query";
import { invalidateQueries } from "~/helpers/query.js";
import type { HttpGetResponseModel } from "~/types/query.js";
import { FormStudentsMinhaTurma } from "./components/minha-turma/form-students.js";
import type { Field } from "~/components/table/filter.js";
import { TotalCard } from "~/components/total-card-item.js";
import { Mars, UserPenIcon, Venus } from "lucide-react";
import { ActionItem } from "~/components/table/actions.js";
import { UpdateStudents } from "./components/students/update-students.js";
import { UpdadePeople } from "./components/people/update-people.js";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Minha Turma" },
    {
      name: "Gestão da turma do monitor",
      content: "Manipulação dos dados da turma",
    },
  ];
}

const studentsHeaders: TableListHeaderProps<StudentsProps>[] = [
  {
    name: "Nome",
    data: (item) => item.people?.name,
  },
  {
    name: "telefone",
    data: (item) => item.people?.phone,
  },
  {
    name: "Classe - Sala",
    data: (item) =>
      `${item.classrooms?.classes?.name} - ${item.classrooms?.name}`,
  },
  {
    name: "Ano de Nascimento",
    data: (item) => item.people?.birthDate,
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
];

export default function MinhaTurmaPage() {
  const {
    handleDelete,
    handleOpenCustom,
    handleEditCustom,
    handleUpdatePerson,
    isLoading,
    data,
  } = useMinhaTurma();
  if (isLoading || !data) {
    <>loading ....</>;
  }

  return (
    <main className=" w-full max-w-[1440px] px-2 mx-auto md:px-2">
      <PageHeaderComponent
        title={`Listagem dos Alunos  - ${data?.[0].classrooms?.name}`}
        addButtonFn={() => handleOpenCustom()}
        addButtonText="Novo Aluno"
        permissions={[PERMISSIONSMAP.OWN_CLASSROOM]}
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
          title="Femeninas"
          icon={Venus}
          value={4}
        />
      </div>

      <DataTableAuto
        headers={studentsHeaders}
        apiPath={[StudentsModel.GETS]}
        filter={filter}
        staticParams={{
          ...(data?.[0].classrooms?.classroomId
            ? { classroomId: data?.[0].classrooms?.classroomId }
            : {}),
        }}
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

function useMinhaTurma() {
  const { openDeleteConfirm, openCustomComponent } = useDialog();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [StudentsModel.GETS, SchedulesModel.GETS],
    queryFn: () => loadSchedulesData(),
  });

  const loadSchedulesData = async () => {
    try {
      const { data } = await apiClient.get<
        HttpGetResponseModel<SchedulesProps[]>
      >(SchedulesModel.GETS, {
        params: {
          // teacherId: "fbd4e89f-eb8c-4f89-b97b-47108dbb35ee",
          active: true,
        },
      });

      return data.data;
    } catch {}
  };

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
    openCustomComponent(FormStudentsMinhaTurma, {
      params: {
        classroomId: data?.[0].classrooms?.classroomId
          ? data?.[0].classrooms?.classroomId
          : "",
        classroomName: data?.[0].classrooms?.name
          ? data?.[0].classrooms?.name
          : "",
      },
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
    refetch,
    isLoading,
    data,
  };
}

// Aqui vem a painel da turma ou a tela da turma, onde o monitor está escalado, seja como assistente ou expositor
// vem a lista de alunos
// Dá a possibilidade de cadastrar Alunos nessa turma
// Dá a possibilidade de Colocar presença nessa turma Alunos nessa turma
// Dá a possibilidade de Saber quantos Alunos são
// Dá a possibilidade de imprimir
