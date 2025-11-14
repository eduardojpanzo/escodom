import { PageHeaderComponent } from "~/components/page-header";
import type { Route } from "./+types/niveis";
import { DataTableAuto } from "~/components/table/data-table-auto";
import { LevelsModel, type LevelsProps } from "~/models/levels.model";
import type { TableListHeaderProps } from "~/components/table/data-table";
import { useDialog } from "~/hooks/use-dialog";
import { apiClient } from "~/service/axios";
import { FormLevels } from "./components/levels/form-levels";
import { PERMISSIONSMAP } from "~/data/permissions-map";
import { invalidateQueries } from "~/helpers/query";
import { TotalCard } from "~/components/total-card-item";
import { BookUser } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Níveis" },
    {
      name: "listagem dos Níveis",
      content: "Manipulação de dados dos níveis",
    },
  ];
}

const levelsHeaders: TableListHeaderProps<LevelsProps>[] = [
  {
    name: "Nome",
    data: (item) => item.name,
  },
  {
    name: "Descrição",
    data: (item) => item.description,
  },
];

export default function LevelsPage() {
  const { handleDelete, handleOpenCustom } = useLevels();
  return (
    <main className=" w-full max-w-[1440px] px-2 mx-auto md:px-2">
      <PageHeaderComponent
        title="Listagem de Níveis"
        addButtonFn={() => handleOpenCustom()}
        addButtonText="Novo Nível"
        permissions={[PERMISSIONSMAP.LEVEL_MANAGE]}
      />

      <div className="max-w-full my-4 flex gap-4 overflow-x-auto">
        <TotalCard
          color="text-yellow-500"
          title="Alunos do 1º Nível"
          icon={BookUser}
          value={4}
        />
        <TotalCard
          color="text-blue-500"
          title="Alunos do 2º Nível"
          icon={BookUser}
          value={4}
        />
      </div>

      <DataTableAuto
        headers={levelsHeaders}
        apiPath={[LevelsModel.GETS]}
        handleDelete={(item) => handleDelete(item.levelId)}
        handleEdit={(item) => handleOpenCustom(item.levelId)}
      />
    </main>
  );
}

function useLevels() {
  const { openDeleteConfirm, openCustomComponent } = useDialog();
  const handleDelete = (id?: string) =>
    openDeleteConfirm({
      handleAccept: async () => {
        await apiClient.delete(`${LevelsModel.ENDPOINT}/${id}`);
        await invalidateQueries({
          queryKey: LevelsModel.GETS,
        });
      },
    });

  const handleOpenCustom = (id?: string) => {
    openCustomComponent(FormLevels, {
      params: { id },
      handleAccept: async () =>
        await invalidateQueries({
          queryKey: LevelsModel.GETS,
        }),
      size: "md",
    });
  };

  return {
    handleDelete,
    handleOpenCustom,
  };
}
