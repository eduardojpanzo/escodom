import { PageHeaderComponent } from "~/components/page-header";
import type { Route } from "./+types/monitores";
import { DataTableAuto } from "~/components/table/data-table-auto";
import { TeachersModel, type TeachersProps } from "~/models/teachers.model";
import type { TableListHeaderProps } from "~/components/table/data-table";
import { useDialog } from "~/hooks/use-dialog";
import { apiClient } from "~/service/axios";
import { queryClient } from "~/lib/query";
import { FormTeachers } from "./components/teachers/form-teachers";
import { POSITIONS } from "~/data/positions";
import { PERMISSIONSMAP } from "~/data/permissions-map";
import type { Field } from "~/components/table/filter";
import { TotalCard } from "~/components/total-card-item";
import { Mars, UserPenIcon, Venus } from "lucide-react";
import { ActionItem } from "~/components/table/actions";
import { UpdadePeople } from "./components/people/update-people";
import { invalidateQueries } from "~/helpers/query";
import { UpdateTeachers } from "./components/teachers/update-monitores";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Monitores" },
    {
      name: "listagem dos monitores",
      content: "Manipulação de dados dos monitores",
    },
  ];
}

const teachersHeaders: TableListHeaderProps<TeachersProps>[] = [
  {
    name: "Nome",
    data: (item) => item.people?.name,
  },
  {
    name: "telefone",
    data: (item) => item.people?.phone,
  },
  {
    name: "Cargo",
    data: (item) => POSITIONS.find((pos) => pos.value === item.position)?.label,
  },
  {
    name: "Ano de Formação",
    data: (item) => item.trainingYear,
    isDateTime: true,
  },
];

const filter: Field[] = [
  {
    type: "input",
    label: "Cargo ou Posição",
    name: "position",
    config: {
      type: "text",
      placeholder: "Cargo do monitor",
    },
    validator: (z) =>
      z.string({ message: "o cargo tem que ser texto" }).optional(),
  },
  {
    type: "input",
    label: "Data de Formação",
    name: "trainingYear",
    config: {
      type: "date",
      placeholder: "Data de formação",
    },
    validator: (z) => z.coerce.date().optional(),
  },
];

export default function TeachersPage() {
  const {
    handleDelete,
    handleUpdatePerson,
    handleOpenCustom,
    handleEditCustom,
  } = useTeachers();
  return (
    <main className=" w-full max-w-[1440px] px-2 mx-auto md:px-2">
      <PageHeaderComponent
        title="Listagem dos Monitores"
        addButtonFn={() => handleOpenCustom()}
        addButtonText="Novo"
        permissions={[PERMISSIONSMAP.TEACHER_MANAGE]}
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
        headers={teachersHeaders}
        filter={filter}
        apiPath={[TeachersModel.GETS]}
        handleDelete={(item) => handleDelete(item.teacherId)}
        handleEdit={(item) => handleEditCustom(item.teacherId)}
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

  const handleOpenCustom = () => {
    openCustomComponent(FormTeachers, {
      handleAccept: async () =>
        await invalidateQueries({
          queryKey: TeachersModel.GETS,
        }),
      size: "lg",
    });
  };

  const handleEditCustom = (id: string) => {
    openCustomComponent(UpdateTeachers, {
      handleAccept: async () =>
        await invalidateQueries({
          queryKey: TeachersModel.GETS,
        }),
      params: { id },
      size: "md",
    });
  };

  const handleUpdatePerson = (id: string) => {
    openCustomComponent(UpdadePeople, {
      handleAccept: async () =>
        await invalidateQueries({
          queryKey: TeachersModel.GETS,
        }),
      params: { id },
      size: "lg",
    });
  };

  return {
    handleDelete,
    handleOpenCustom,
    handleUpdatePerson,
    handleEditCustom,
  };
}
