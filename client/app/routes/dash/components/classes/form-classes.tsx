import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { InputWithControl } from "~/components/form/input-control";
import { AutoCompleteControl } from "~/components/form/select-component/autocomplete-control";
import { ResponsiveGrid } from "~/components/responsive-grid";
import { Button } from "~/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { useDialog } from "~/hooks/use-dialog";
import { ClassesModel, type ClassesProps } from "~/models/classes.model";
import { LevelsModel } from "~/models/levels.model";
import { apiClient } from "~/service/axios";
import type { HttpGetResponseModel } from "~/types/query";
import { Z } from "~/utils/zod.validations";

const formClassesSchema = z.object({
  name: Z.requiredString("name"),
  description: Z.optionalString("description"),
  levelId: Z.requiredOptionField("classId"),
});

type FormClassesType = z.infer<typeof formClassesSchema>;
export function FormClasses({ id }: { id: string }) {
  const { close, form, onSubmit } = useFormClasses(id);
  return (
    <>
      <DialogHeader>
        <DialogTitle>{id ? "Criar " : "Atualizar"} a classe</DialogTitle>
        <DialogDescription>Dados de um classe</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="formClasses">
          <ResponsiveGrid columns={3} className="gap-2">
            <InputWithControl
              name="name"
              label="Nome"
              placeholder="Digite o nome"
              control={form.control}
            />

            <InputWithControl
              name="description"
              label="Descrição"
              placeholder="Escreva uma descrição"
              control={form.control}
            />

            <AutoCompleteControl
              name="levelId"
              label="Nível"
              placeholder="Selecione o Nível da classe"
              control={form.control}
              path={LevelsModel.GETS}
              propertyLabel="name"
              propertyValue="levelId"
            />
          </ResponsiveGrid>
        </form>
      </Form>
      <DialogFooter>
        <Button
          variant={"ghost"}
          onClick={() => {
            close();
          }}
        >
          Cancelar
        </Button>
        <Button
          disabled={
            !form.formState.isValid ||
            !form.formState.isDirty ||
            form.formState.isSubmitting
          }
          form="formClasses"
          type="submit"
        >
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}

function useFormClasses(id: string) {
  const { close, closeAndEmit } = useDialog();
  const form = useForm<FormClassesType>({
    resolver: zodResolver(formClassesSchema),
    mode: "all",
  });

  const onSubmit = async (values: FormClassesType) => {
    const data = {
      levelId: values.levelId.value,
      name: values.name,
      description: values.description,
    };
    const path = id ? ClassesModel.CREATE : `${ClassesModel.ENDPOINT}/${id}`;

    try {
      await apiClient[id ? "put" : "post"](path, {
        ...data,
      });

      closeAndEmit({
        message: `${id ? "Criado" : "Atualizado"} com sucesso`,
        data: {
          description: `Dados alterados com sucesso`,
        },
      });
    } catch {}
  };

  const loadData = async (id: string) => {
    try {
      const response = await apiClient.get<HttpGetResponseModel<ClassesProps>>(
        `${ClassesModel.ENDPOINT}/${id}`
      );
      const classData = response.data;
      form.reset({
        name: classData.data.name,
        description: classData.data.description,
        levelId: {
          label: classData.data.level.name,
          value: classData.data.levelId,
        },
      });
    } catch {}
  };

  useEffect(() => {
    if (id) {
      loadData(id);
    }
  }, [id]);
  return { form, onSubmit, close };
}
