import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Skeleton } from "~/components/ui/skeleton";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { SelectComponent } from "./select-component";

import { useQuery } from "@tanstack/react-query";
import { type HttpGetResponseModel } from "~/types/query";
import { api } from "~/service/axios";

export type AutocompleteOptions =
  | {
      label: string;
      value: string;
    }
  | undefined;

export interface AutoCompleteComponentProps<
  FormValues extends FieldValues = FieldValues,
> extends UseControllerProps<FormValues> {
  label?: string;
  path: string | string[];
  propertyLabel: string;
  propertyValue: string;
  customFilter?: string;
  isObject?: boolean;
  isMulti?: boolean;
  placeholder?: string;
  defaultValueByPropertyValue?: string;
}

const getDeepValue = (obj: object, path: string) => {
  const keys = path.split(".");
  let value = obj;

  keys.forEach((key) => {
    if (value && typeof value === "object" && key in value) {
      value = value[key as keyof typeof value];
    } else {
      return undefined;
    }
  });

  return value as unknown as string;
};

export function AutoCompleteControl<
  FormValues extends FieldValues = FieldValues,
>({
  name,
  control,
  label,
  isMulti,
  path,
  propertyLabel,
  propertyValue,
  customFilter,
  isObject,
  placeholder = "Selecione...",
  defaultValueByPropertyValue,
}: AutoCompleteComponentProps<FormValues>) {
  // const [filter, setFilter] = useState<FieldValues | undefined>({});

  const useLoadOptions = async () => {
    const apiPath = Array.isArray(path)
      ? path.filter((item) => !!item).join("/")
      : path;

    let data: FormValues[] = [];

    try {
      if (isObject) {
        const response = await api.get<HttpGetResponseModel<FormValues[]>>(
          `${apiPath}${customFilter ? "?" + customFilter : ""}`
        );
        data = response.data.data;
      } else {
        const response = await api.get<FormValues[]>(
          `${apiPath}${customFilter ? "?" + customFilter : ""}`
        );
        data = response.data;
      }

      const options = data.map((item) => ({
        label: getDeepValue(item, propertyLabel),
        value: getDeepValue(item, propertyValue),
      }));

      return options;
    } catch {}
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getOptions" + path.toString() + customFilter],
    queryFn: useLoadOptions,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormDescription className="sr-only">
            selecione uma opção
          </FormDescription>
          {isLoading ? (
            <Skeleton className="w-full h-10 bg-gray-500" />
          ) : (
            <FormControl>
              <SelectComponent
                createAble={false}
                isMulti={isMulti}
                options={data}
                placeholder={placeholder}
                defaultValue={data?.find(
                  (item) => item.value == defaultValueByPropertyValue
                )}
                {...field}

                // onChange={(item) => {
                //   getValue({label : item. , vale : item})
                // }}
              />
            </FormControl>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
