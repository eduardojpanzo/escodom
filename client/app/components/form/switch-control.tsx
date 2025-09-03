import type { ReactNode } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Switch } from "../ui/switch";
import { Skeleton } from "../ui/skeleton";

export interface SwitchComponentProps<
  FormValues extends FieldValues = FieldValues
> extends UseControllerProps<FormValues> {
  label?: string;
  isLoading?: boolean;
  helperText?: ReactNode;
}

export function SwitchWithControl<
  FormValues extends FieldValues = FieldValues
>({
  name,
  control,
  label,
  isLoading,
  helperText,
}: SwitchComponentProps<FormValues>) {
  console.log(isLoading);
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-12 w-full my-2 bg-gray-400" />
      ) : (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">{label}</FormLabel>
                {helperText && <FormDescription>{helperText}</FormDescription>}
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </>
  );
}
