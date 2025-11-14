import { useEffect, useImperativeHandle, useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "~/service/axios";
import type { HttpGetResponseModel } from "~/types/query";
import type { TableListProps } from "~/types/table-list.type";
import { DataTable } from "./data-table";
import Filter from "./filter";
import { IconButton } from "../icon-button";
import { FileDown, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

const getPath = (path?: string | string[]) =>
  Array.isArray(path) ? path?.filter((param) => !!param).join("/") : path;

export function DataTableAuto<T>({
  apiPath,
  staticParams,
  orderProperty,
  filter,
  refreshKey,
  ref,
  customFilter,
  ...props
}: TableListProps<T>) {
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const [totalPages, setTotalPages] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [dynamicFilter, setDynamicFilter] = useState({});
  const path = getPath(apiPath);
  const buildSearchParams = () => {
    const filterParams = Object.entries(dynamicFilter)
      .filter(
        ([_, value]) =>
          (typeof value === "string" && value.length) ||
          typeof value === "number"
      )
      .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

    const orderBy =
      sorting.length > 0
        ? sorting.map((s) => `${s.id} ${s.desc ? "desc" : "asc"}`)
        : undefined;

    return {
      ...filterParams,
      ...staticParams,
      pageNumber: pageIndex + 1,
      pageSize,
      orderBy,
    };
  };

  const callApi = async (path: string, search?: object) => {
    const { data } = await apiClient.get<HttpGetResponseModel<T[]>>(path, {
      params: search,
    });
    setTotalPages(data.totalPages);
    return data.data;
  };

  const { data, isLoading, refetch } = useQuery<T[], Error>({
    queryKey: [
      path,
      dynamicFilter,
      sorting,
      refreshKey,
      staticParams,
      pageIndex,
      pageSize,
    ],
    queryFn: () => callApi(path!, buildSearchParams()),
  });

  useEffect(() => {
    if (orderProperty && !sorting.length) setSorting(orderProperty);
  }, [orderProperty]);

  useImperativeHandle(ref, () => ({
    refresh: () => refetch(),
  }));

  const filteredData = customFilter
    ? (data ?? []).filter(customFilter)
    : (data ?? []);

  return (
    <div className="p-1">
      <DataTable
        data={filteredData}
        totalPages={totalPages}
        isLoading={isLoading}
        handlePaginationChange={(e) => setPagination(e)}
        {...props}
      >
        {{
          actions: (
            <div className="flex gap-1 items-center justify-end">
              <IconButton
                tooltipText="Atualizar"
                Icon={<RefreshCw />}
                onClick={() => {
                  refetch();
                }}
              />
              {true && (
                <Button variant="outline" onClick={() => {}} disabled={true}>
                  <FileDown />
                  Exportar
                </Button>
              )}
            </div>
          ),
          subhead: filter && (
            <Filter
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              fields={filter}
              filterChange={(form) => setDynamicFilter(form)}
            />
          ),
        }}
      </DataTable>
    </div>
  );
}
