import type { ReactNode } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";

export interface CheckboxComponentProps<
  FormValues extends FieldValues = FieldValues
> extends UseControllerProps<FormValues> {
  label?: string;
  isLoading?: boolean;
  helperText?: ReactNode;
}

export function CheckboxithControl<
  FormValues extends FieldValues = FieldValues
>({
  name,
  control,
  label,
  isLoading,
  helperText,
}: CheckboxComponentProps<FormValues>) {
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-12 w-full my-2 bg-gray-400" />
      ) : (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{label}</FormLabel>
                {helperText && <FormDescription>{helperText}</FormDescription>}
              </div>
            </FormItem>
          )}
        />
      )}
    </>
  );
}
