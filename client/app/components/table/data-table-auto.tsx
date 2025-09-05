import { useEffect, useImperativeHandle, useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import Filter, { type Field, type Z } from "~/components/table/filter";
import { api } from "~/service/axios";
import type { HttpGetResponseModel } from "~/types/query";
import type { TableListProps } from "~/types/table-list.type";
import { DataTable } from "./data-table";

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
  const [dynamicFilter, setDynamicFilter] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const path = getPath(apiPath);
  const { data, isLoading, refetch } = useQuery<T[], Error>({
    queryKey: [path, dynamicFilter, sorting, refreshKey, staticParams],
    queryFn: () =>
      callApi(path!, {
        ...Object.entries(dynamicFilter)
          .filter(
            ([_, value]) =>
              (typeof value === "string" && value.length) ||
              typeof value === "number"
          )
          .map(([key, value]) => ({ [key]: value }))
          .reduce((prev, next) => ({ ...prev, ...next }), {}),
      }),
  });

  const callApi = async (path: string, search?: object) => {
    console.log(path, search);
    const { data } = await api.get<HttpGetResponseModel<T[]>>(path);
    return data.data;
  };

  const refreshTable = () => refetch();

  useEffect(() => {
    if (orderProperty && !sorting.length) setSorting(orderProperty);
  }, [orderProperty]);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refreshTable();
    },
  }));

  const filteredData = customFilter
    ? (data ?? []).filter(customFilter)
    : (data ?? []);

  return (
    <div className="p-1">
      <DataTable hasSelect data={filteredData} isLoading={isLoading} {...props}>
        {{
          actions: props.children?.actions,
          // subhead: filter && (
          //   <Filter
          //     fields={filter}
          //     filterChange={(form) => setDynamicFilter(form)}
          //   />
          // ),
        }}
      </DataTable>
    </div>
  );
}
