import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";

interface SelectProps extends React.ComponentProps<"div"> {
  setValue: (value: string) => void;
  value?: string;
  label: string;
  options: { label: string; value: string }[];
  placeholder: string;
  isSelectableAll?: boolean;
}

export function SelectNoControll({
  label,
  setValue,
  options,
  placeholder,
  isSelectableAll,
  className,
  ...props
}: SelectProps) {
  return (
    <div className={cn("space-y-2")} {...props}>
      <label htmlFor="select1" className="text-sm">
        {label}
      </label>
      <Select onValueChange={(e) => setValue(e)}>
        <SelectTrigger className={cn(className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent id="select1" className={cn(className)}>
          {options && !options.length && (
            <SelectItem disabled value="no">
              Sem opções
            </SelectItem>
          )}
          {isSelectableAll && (
            <SelectItem value="all">Selecionar Todos</SelectItem>
          )}
          {options &&
            options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
