import { PageHeaderComponent } from "~/components/page-header";
import type { Route } from "./+types/niveis";
import { DataTableAuto } from "~/components/table/data-table-auto";
import { LevelsModel, type LevelsProps } from "~/models/levels.model";
import type { TableListHeaderProps } from "~/components/table/data-table";
import { useDialog } from "~/hooks/use-dialog";
import { apiClient } from "~/service/axios";
import { queryClient } from "~/lib/query";
import { FormLevels } from "./components/levels/form-levels";

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
        title="Listagem das Levels"
        addButtonFn={() => handleOpenCustom()}
        addButtonText="Nova"
      />
      <DataTableAuto
        headers={levelsHeaders}
        apiPath={[LevelsModel.GETS]}
        handleDelete={(item) => handleDelete(item.levelId)}
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
        await queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes(LevelsModel.ENDPOINT),
        });
      },
    });

  const handleOpenCustom = (id?: string) => {
    openCustomComponent(FormLevels, {
      params: { id },
      handleAccept: async () =>
        await queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes(LevelsModel.ENDPOINT),
        }),
      size: "lg",
    });
  };

  return {
    handleDelete,
    handleOpenCustom,
  };
}
