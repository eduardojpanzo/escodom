import type { SortingState, VisibilityState } from "@tanstack/react-table";
import type { Ref } from "react";
import type { DataTableProps } from "~/components/table/data-table";
import type { Field } from "~/components/table/filter";

export type TableListComponentRef = {
  refresh?: () => void;
};
export interface TableListProps<T>
  extends Omit<DataTableProps<T>, "totalPages" | "data"> {
  customFilter?: (item: T) => boolean;
  apiPath?: string | string[];
  limit?: number;
  staticParams?: object;
  orderProperty?: SortingState;
  filter?: Field[];
  refreshKey?: string;
  initialHiddenColumn?: VisibilityState;
  ref?: Ref<TableListComponentRef>;
}
