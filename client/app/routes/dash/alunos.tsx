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

export default function SrudentsPage() {
  const { handleDelete, handleOpenCustom } = useStudents();
  return (
    <main className=" w-full max-w-[1440px] px-2 mx-auto md:px-2">
      <PageHeaderComponent
        title="Listagem dos Alunos"
        addButtonFn={() => handleOpenCustom()}
        addButtonText="Novo"
        permissions={[PERMISSIONSMAP.STUDENT_MANAGE]}
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
