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
import { invalidateQueries } from "~/helpers/query";
import type { Field } from "~/components/table/filter";
import { TotalCard } from "~/components/total-card-item";
import { BookUser } from "lucide-react";
import { LevelsModel } from "~/models/levels.model";

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
    data: (item) => item.levels?.name,
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
      placeholder: "Nome da classe",
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
];

export default function ClassesPage() {
  const { handleDelete, handleOpenCustom } = useClasses();
  return (
    <main className=" w-full max-w-[1440px] px-2 mx-auto md:px-2">
      <PageHeaderComponent
        title="Listagem de Classes"
        addButtonFn={() => handleOpenCustom()}
        addButtonText="Nova Classe"
        permissions={[PERMISSIONSMAP.CLASS_MANAGE]}
      />
      <div className="max-w-full my-4 flex gap-4 overflow-x-auto">
        <TotalCard
          color="text-yellow-500"
          title="Alunos do Jardim"
          icon={BookUser}
          value={4}
        />
        <TotalCard
          color="text-yellow-500"
          title="Alunos do Jardim"
          icon={BookUser}
          value={4}
        />
      </div>
      <DataTableAuto
        filter={filter}
        headers={classesHeaders}
        apiPath={[ClassesModel.GETS]}
        handleEdit={(item) => handleOpenCustom(item.classId)}
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
        await invalidateQueries({ queryKey: ClassesModel.GETS });
      },
    });

  const handleOpenCustom = (id?: string) => {
    openCustomComponent(FormClasses, {
      params: { id },
      handleAccept: async () =>
        await invalidateQueries({ queryKey: ClassesModel.GETS }),
      size: "md",
    });
  };

  return {
    handleDelete,
    handleOpenCustom,
  };
}
