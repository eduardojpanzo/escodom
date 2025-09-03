import type { ReactNode } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Select, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { Skeleton } from "../ui/skeleton";

export interface SelectComponentProps<
  FormValues extends FieldValues = FieldValues
> extends UseControllerProps<FormValues> {
  label?: string;
  isLoading?: boolean;
  helperText?: ReactNode;
  options?: { label: string; value: string }[];
  placeholder: string;
  setValue?: (value: string) => void;
}

export function SelectWithControl<
  FormValues extends FieldValues = FieldValues
>({
  name,
  control,
  label,
  isLoading,
  helperText,
  placeholder,
  options,
  setValue,
}: SelectComponentProps<FormValues>) {
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-12 w-full my-2 bg-gray-400" />
      ) : (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{label}</FormLabel>
              <Select
                onValueChange={(e) => {
                  field.onChange(e);

                  if (setValue)
                    setValue(
                      options?.filter((item) => item.value === e)[0].label ?? ""
                    );
                }}
                defaultValue={field.value}
              >
                <FormControl className="w-full">
                  <SelectTrigger className="w-full border p-2 rounded-[8px] text-sm active:border-black/40 text-left">
                    <SelectValue
                      placeholder={placeholder}
                      className="text-left"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full">
                  {options?.length ? (
                    options?.map(({ label, value }, index) => (
                      <SelectItem key={`${value}-${index}`} value={value}>
                        {label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="n">Sem itens</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormDescription>{helperText}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
}
