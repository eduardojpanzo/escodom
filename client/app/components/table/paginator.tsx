import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const options = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
  { label: "200", value: 200 },
  { label: "500", value: 500 },
  { label: "1000", value: 1000 },
];
export type PaginatorProps = {
  hasNextPage?: boolean;
  filteredSelectedRow: number;
  filteredRow: number;
  pageSize: number;
  pageNumber: number;
  totalPages?: number;
  setPageSize: (pageSize: number) => void;
  setPageNumber: (pageNumber: number) => void;
};

export function Paginator({
  hasNextPage,
  filteredRow,
  filteredSelectedRow,
  pageNumber,
  pageSize,
  totalPages,
  setPageNumber,
  setPageSize,
}: PaginatorProps) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {filteredSelectedRow} de {filteredRow} linhas(s) selecionadas.
      </div>

      <div className="flex items-center gap-1 whitespace-nowrap">
        Resultados por página:{" "}
        <Select
          value={pageSize.toString()}
          defaultValue={pageSize.toString()}
          onValueChange={(value) => setPageSize(+value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Selecione.."} />
          </SelectTrigger>
          <SelectContent id="select1">
            {options.map((option) => (
              <SelectItem key={option.value} value={`${option.value}`}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 text-sm text-muted-foreground">
        Página {pageNumber} de {totalPages}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPageNumber(pageNumber - 1)}
        disabled={pageNumber === 0}
      >
        Anterior
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPageNumber(pageNumber + 1)}
        disabled={hasNextPage}
      >
        Próximo
      </Button>
    </div>
  );
}
