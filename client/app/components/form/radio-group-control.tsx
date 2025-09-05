import type { ReactNode } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Skeleton } from "../ui/skeleton";

export interface RadioGroupComponentProps<
  FormValues extends FieldValues = FieldValues
> extends UseControllerProps<FormValues> {
  label?: string;
  isLoading?: boolean;
  helperText?: ReactNode;
  groupValues: { label: string; value: string }[];
}

export function RadioGroupWithControl<
  FormValues extends FieldValues = FieldValues
>({
  name,
  control,
  isLoading,
  label,
  groupValues,
}: RadioGroupComponentProps<FormValues>) {
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-12 w-full my-2 bg-gray-400" />
      ) : (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row gap-8 space-y-1"
                >
                  {groupValues.map(({ value, label }) => (
                    <FormItem
                      key={value}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={value} />
                      </FormControl>
                      <FormLabel className="font-normal">{label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
}
