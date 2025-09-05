import { useEffect, useMemo, type JSX } from "react";
import {
  type CellContext,
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import dayjs from "dayjs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Skeleton } from "~/components/ui/skeleton";
import { CircleSlash } from "lucide-react";
import { TableActions } from "./actions";
import { Checkbox } from "~/components/ui/checkbox";
import { Paginator } from "./paginator";

export type TableListHeaderProps<T> = {
  name: string;
  orderProperty?: string;
  filter?: "input" | "toggle";
  data: (item: T) => string | number | undefined | Date | null | boolean;
  isDate?: boolean;
  isDateTime?: boolean;
  isPrice?: boolean;
  isTime?: boolean;
  dateFormat?: string;
  customRender?: (
    data: CellContext<T, unknown>
  ) => React.ReactNode | JSX.Element;
};

export type PageEvent = {
  pageIndex: number;
  pageSize: number;
};

export interface DataTableProps<TData> {
  headers: TableListHeaderProps<TData>[];
  data: TData[];
  filterFild?: string;
  filterPlaceholder?: string;
  isLoading?: boolean;
  hasSelect?: boolean;
  enableColumnFilter?: boolean;
  totalPages?: number;
  pageSize?: number;
  children?: {
    actions?: JSX.Element;
    subhead?: JSX.Element;
  };
  handleEdit?: (item: TData) => void;
  handleDelete?: (item: TData) => void;
  handleOpenDetails?: (item: TData) => void;
  handleClickFn?: (item: TData) => void;
  customActions?: (item: TData) => JSX.Element;
  handlePaginationChange?: (event: PageEvent) => void;
}

export function DataTable<TData>({
  headers,
  isLoading,
  data,
  filterFild,
  filterPlaceholder,
  hasSelect,
  enableColumnFilter,
  children,
  handleEdit,
  handleClickFn,
  handleDelete,
  handleOpenDetails,
  customActions,
  handlePaginationChange,
  ...props
}: DataTableProps<TData>) {
  const columns: ColumnDef<TData>[] = headers.map((head) => ({
    header: head.name,
    accessorFn: (item) => {
      const data = head.data?.(item) as string | number | undefined;
      if (head.isDate && !!data && dayjs(data).isValid())
        return dayjs(data).format(head.dateFormat ?? "DD/MM/YYYY");
      if (head.isDateTime && !!data && dayjs(data).isValid()) {
        return dayjs(data).format(head.dateFormat ?? "DD/MM/YYYY HH:mm:ss");
      }
      if (head.isPrice)
        return new Intl.NumberFormat("pt-AO", {
          currency: "AOA",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(Number(data) ?? 0);
      if (head.isTime && !!data && dayjs(data).isValid()) {
        return dayjs(data).format("HH:mm");
      }
      return data ?? "-";
    },
    ...(head.customRender ? { cell: head.customRender } : {}),
    accessorKey: head.orderProperty,
    enableSorting: !!head.orderProperty,
    enableColumnFilter: !!enableColumnFilter,
  }));

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const hasActions =
    (!!handleEdit ||
      !!handleDelete ||
      !!handleOpenDetails ||
      !!customActions) &&
    !!data.length;
  const [{ pageIndex, pageSize }, setPagination] = useState<PageEvent>({
    pageIndex: 0,
    pageSize: props.pageSize ?? 20,
  });

  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data,
    columns,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    pageCount: props.totalPages || Math.ceil(data.length / pageSize),
    ...(props.totalPages ? { manualPagination: true } : {}),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  useEffect(() => {
    if (!handlePaginationChange) return;
    handlePaginationChange?.(pagination);
  }, [pagination, handlePaginationChange]);

  return (
    <div>
      {isLoading ? (
        <div className="h-96 mt-4">
          <div className="flex justify-between">
            <Skeleton className="h-9 w-96 bg-accent"></Skeleton>
            <Skeleton className="h-9 w-24 bg-accent" />
          </div>

          <div className="flex flex-col gap-2 py-3">
            <Skeleton className="h-80 bg-accent"></Skeleton>
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-9 w-40 bg-accent"></Skeleton>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-16 bg-accent" />
              <Skeleton className="h-9 w-16 bg-accent" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* top table - filter and constumize */}
          <div className="flex items-center py-4">
            {filterFild && (
              <Input
                placeholder={
                  filterPlaceholder ? filterPlaceholder : `Filtrar...`
                }
                value={
                  (table.getColumn(filterFild)?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn(filterFild)
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm bg-card"
              />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Colunas
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            {children?.actions}
          </div>

          {children?.subhead}
          {/* table main content */}
          <div className="rounded-md border overflow-y-auto bg-card">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {hasSelect && (
                      <TableHead className="sticky left-0">
                        <Checkbox
                          checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() &&
                              "indeterminate")
                          }
                          onCheckedChange={(value) =>
                            table.toggleAllPageRowsSelected(!!value)
                          }
                          aria-label="Select all"
                        />
                      </TableHead>
                    )}
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                    {hasActions && (
                      <TableHead className="sticky bg-white right-0 max-w-[40px_!important]"></TableHead>
                    )}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      data-pointer={!!handleClickFn}
                      onClick={() => {
                        handleClickFn?.(row.original);
                      }}
                      className="data-[pointer=true]:cursor-pointer"
                    >
                      {hasSelect && (
                        <TableCell className="sticky left-0">
                          <Checkbox
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) =>
                              row.toggleSelected(!!value)
                            }
                            aria-label="Select row"
                          />
                        </TableCell>
                      )}
                      {row.getVisibleCells().map((cell) => (
                        <TableCell className="min-w-28" key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                      {hasActions && (
                        <TableCell className="sticky max-w-min bg-white right-0 ">
                          <div>
                            <TableActions
                              data={row.original}
                              handleEdit={handleEdit}
                              handleDelete={handleDelete}
                              handleOpenDetails={handleOpenDetails}
                              customActions={customActions}
                            />
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + (hasActions ? 1 : 0)}
                      className="min-w-full h-36 flex gap-2 justify-center items-center text-center text-2xl"
                    >
                      Não há Dados Disponivel <CircleSlash />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* paginator */}
          <Paginator
            pageSize={pageSize}
            pageNumber={pageIndex}
            totalPages={table.getPageCount()}
            filteredRow={table.getRowModel().rows.length}
            filteredSelectedRow={
              table.getFilteredSelectedRowModel().rows.length
            }
            hasNextPage={!table.getCanNextPage()}
            setPageNumber={(number) =>
              setPagination((prev) => ({ ...prev, pageIndex: number }))
            }
            setPageSize={(number) =>
              setPagination((prev) => ({ ...prev, pageSize: number }))
            }
          />
        </>
      )}
    </div>
  );
}
