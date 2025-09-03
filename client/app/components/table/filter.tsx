import { Fragment, memo, useCallback, useMemo, useState } from "react";
import {
  useForm,
  type Control,
  type SubmitHandler,
  type UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Funnel, FunnelX } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { z, ZodString, ZodType } from "zod";
import {
  InputWithControl,
  type InputComponentProps,
} from "../form/input-control";
import {
  SelectWithControl,
  type SelectComponentProps,
} from "../form/select-control";
import {
  AutoCompleteControl,
  type AutoCompleteComponentProps,
  type AutocompleteOptions,
} from "../form/select-component/autocomplete-control";
import { uniqueId } from "~/utils/unique_id";

let schema = z.object({});
export type Z = typeof z;

export interface Field<F extends keyof FieldTypes = keyof FieldTypes> {
  name: string;
  label?: string;
  validator?: (z: Z) => ZodType;
  type: F;
  config?: FieldTypes[F];
  column?: number;
  options?: { label: string; value: string | number }[];
}

type FieldTypes = {
  autocomplete: Omit<
    AutoCompleteComponentProps<object>,
    "label" | "control" | "name" | "required"
  >;
  input: Omit<InputComponentProps, "label" | "control" | "name" | "required">;
  select: Omit<SelectComponentProps, "label" | "control" | "name" | "required">;
};

export type FilterResult = {
  [k in string]:
    | string
    | number
    | AutocompleteOptions[]
    | AutocompleteOptions
    | undefined
    | null;
};

type FilterProps = {
  filterChange: SubmitHandler<{
    [k in string]:
      | string
      | number
      | (string | number | undefined)[]
      | undefined;
  }>;
  fields: Field[];
};

function FilterComponent({ filterChange, fields }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const memoizedRender = useMemo(
    () =>
      fields.map((field) => (
        <Fragment key={uniqueId("filter")}>
          {renderField(field, form.control, form.register)}
        </Fragment>
      )),
    [fields, form.control._formValues]
  );

  const parseFilter = useCallback(
    (form: FilterResult) => {
      const converted = Object.fromEntries(
        Object.entries(form).map(([key, value]) => {
          if (value == null) return [key, undefined];

          // Se for array de opções, extrair os valores
          if (Array.isArray(value)) {
            return [
              key,
              value.map((v) => (typeof v === "object" ? v.value : v)),
            ];
          }

          // Se for objeto AutocompleteOption, extrair o valor
          if (typeof value === "object") {
            return [key, value.value];
          }

          return [key, value];
        })
      );

      filterChange(converted ?? {});
    },
    [fields]
  );

  const handleReset = () => {
    form.reset();
    filterChange({});
  };
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={"w-full z-20"}
    >
      <div className="flex items-center justify-end px-4">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            {isOpen ? <FunnelX /> : <Funnel />}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <Form {...form}>
          <form
            className="w-full"
            id="filterForm"
            onSubmit={form.handleSubmit(parseFilter)}
          >
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2 p-5 mt-2 rounded-xl bg-accent">
              {memoizedRender}
              <div className="col-span-full flex justify-end gap-2">
                <Button
                  disabled={!form.formState.isValid}
                  form="filterForm"
                  type="submit"
                >
                  Filtrar
                </Button>
                <Button type="reset" onClick={handleReset}>
                  Limpar
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
}

function renderField(
  { type, validator, label, name, column, ...props }: Field,
  control: Control,
  register: UseFormRegister<{ [k in string]: any }>
) {
  if (!!validator)
    schema = schema.extend({
      [name]: validator(z),
    });
  register(name, {});

  if (type === "input") {
    const propsInput = props.config as InputComponentProps<object>;
    return (
      <div style={{ gridColumn: `span ${column}` }}>
        <InputWithControl
          label={label}
          control={control}
          name={name}
          type={propsInput?.type}
        />
      </div>
    );
  }

  if (type === "autocomplete") {
    const propsAutocomplete =
      props.config as AutoCompleteComponentProps<object>;
    return (
      <div style={{ gridColumn: `span ${column}` }}>
        <AutoCompleteControl
          control={control}
          name={name}
          label={label}
          path={propsAutocomplete.path}
          propertyLabel={propsAutocomplete.propertyLabel}
          propertyValue={propsAutocomplete.propertyValue}
          isMulti={propsAutocomplete.isMulti}
        />
      </div>
    );
  }
  if (type === "select") {
    const propsSelect = props.config as SelectComponentProps<object>;
    return (
      <div style={{ gridColumn: `span ${column}` }}>
        <SelectWithControl
          control={control}
          name={name}
          label={label}
          options={propsSelect.options?.map((item) => ({
            label: item.label,
            value: item.value.toString(),
          }))}
          placeholder={propsSelect.placeholder}
        />
      </div>
    );
  }

  return <></>;
}

export default memo(FilterComponent);
