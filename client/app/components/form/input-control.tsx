import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { Eye, EyeClosed } from "lucide-react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}
export interface InputComponentProps<
  FormValues extends FieldValues = FieldValues
> extends Omit<InputProps, "name" | "defaultValue">,
    UseControllerProps<FormValues> {
  label?: string;
  isLoading?: boolean;
  helperText?: ReactNode;
}

export function InputWithControl<FormValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  isLoading,
  helperText,
  ...props
}: InputComponentProps<FormValues>) {
  const [show, setShow] = useState(props.type === "password" ? false : true);
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-12 w-full my-2 bg-gray-400" />
      ) : (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...props}
                    type={
                      props.type === "password"
                        ? show
                          ? "text"
                          : "password"
                        : props.type
                    }
                    {...field}
                  />
                  {props.type === "password" &&
                    (show ? (
                      <Eye
                        onClick={() => setShow(false)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      />
                    ) : (
                      <EyeClosed
                        onClick={() => setShow(true)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      />
                    ))}
                </div>
              </FormControl>
              <FormDescription>{helperText}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
}
