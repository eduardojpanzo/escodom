import { type JSX } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "../ui/button";

interface TableActionsProps<TData> {
  handleEdit?: (item: TData) => void;
  handleDelete?: (item: TData) => void;
  handleOpenDetails?: (item: TData) => void;
  customActions?: (item: TData) => JSX.Element;
  data: TData;
}

export function TableActions<TData>({
  customActions,
  handleOpenDetails,
  handleEdit,
  handleDelete,
  data,
}: TableActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        {customActions && (
          <DropdownMenuItem>{customActions(data)}</DropdownMenuItem>
        )}

        {handleOpenDetails && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDetails(data);
            }}
          >
            {<Eye />}Detalhes
          </DropdownMenuItem>
        )}
        {handleEdit && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(data);
            }}
          >
            {<Edit />}Editar
          </DropdownMenuItem>
        )}

        {handleDelete && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(data);
            }}
          >
            {<Trash />} Remover
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
