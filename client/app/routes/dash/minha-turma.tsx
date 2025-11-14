import type { Route } from "./+types/minha-turma.tsx";
import type { TableListHeaderProps } from "~/components/table/data-table.js";
import { PageHeaderComponent } from "~/components/page-header";
import { StudentsModel, type StudentsProps } from "~/models/students.model.js";
import { DataTableAuto } from "~/components/table/data-table-auto.js";
import { useDialog } from "~/hooks/use-dialog.js";
import { apiClient } from "~/service/axios.js";
import { queryClient } from "~/lib/query.js";
import { FormStudents } from "./components/students/form-students.js";
import { PERMISSIONSMAP } from "~/data/permissions-map.js";

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

export default function MinhaTurmaPage() {
  const { handleDelete, handleOpenCustom } = useStudents();
  return (
    <main className=" w-full max-w-[1440px] px-2 mx-auto md:px-2">
      <PageHeaderComponent
        title="Listagem dos Alunos"
        addButtonFn={() => handleOpenCustom()}
        addButtonText="Novo Aluno"
        permissions={[PERMISSIONSMAP.OWN_CLASSROOM]}
      />
      <DataTableAuto
        headers={studentsHeaders}
        apiPath={[StudentsModel.GETS]}
        handleDelete={(item) => handleDelete(item.studentId)}
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
        await queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes(StudentsModel.ENDPOINT),
        });
      },
    });

  const handleOpenCustom = (id?: string) => {
    openCustomComponent(FormStudents, {
      params: { id },
      handleAccept: async () =>
        await queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes(StudentsModel.ENDPOINT),
        }),
      size: "lg",
    });
  };

  return {
    handleDelete,
    handleOpenCustom,
  };
}

// Aqui vem a painel da turma ou a tela da turma, onde o monitor está escalado, seja como assistente ou expositor
// vem a lista de alunos
// Dá a possibilidade de cadastrar Alunos nessa turma
// Dá a possibilidade de Colocar presença nessa turma Alunos nessa turma
// Dá a possibilidade de Saber quantos Alunos são
// Dá a possibilidade de imprimir
