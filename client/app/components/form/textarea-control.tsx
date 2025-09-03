import type { ReactNode, TextareaHTMLAttributes } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Skeleton } from "../ui/skeleton";
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}
export interface TextareaComponentProps<
  FormValues extends FieldValues = FieldValues
> extends Omit<TextareaProps, "name" | "defaultValue">,
    UseControllerProps<FormValues> {
  label?: string;
  isLoading?: boolean;
  helperText?: ReactNode;
}

export function TextareaWithControl<
  FormValues extends FieldValues = FieldValues
>({
  name,
  control,
  label,
  isLoading,
  helperText,
  ...props
}: TextareaComponentProps<FormValues>) {
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-24 w-full my-2 bg-gray-400" />
      ) : (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={props.placeholder}
                  className="resize-none"
                  {...field}
                  {...props}
                />
              </FormControl>
              {helperText && <FormDescription>{helperText}</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
}
