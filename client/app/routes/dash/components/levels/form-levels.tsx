import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { InputWithControl } from "~/components/form/input-control";
import { ResponsiveGrid } from "~/components/responsive-grid";
import { Button } from "~/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { useDialog } from "~/hooks/use-dialog";
import { LevelsModel, type LevelsProps } from "~/models/levels.model";
import { apiClient } from "~/service/axios";
import type { HttpGetResponseModel } from "~/types/query";
import { Z } from "~/utils/zod.validations";

const formLevelsSchema = z.object({
  name: Z.requiredString("name"),
  description: Z.optionalString("description"),
});

type FormLevelsType = z.infer<typeof formLevelsSchema>;
export function FormLevels({ id }: { id: string }) {
  const { close, form, onSubmit } = useFormLevels(id);
  return (
    <>
      <DialogHeader>
        <DialogTitle>{id ? "Criar " : "Atualizar"} a Nível</DialogTitle>
        <DialogDescription>Dados de um nível</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="formLevels">
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
          form="formLevels"
          type="submit"
        >
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}

function useFormLevels(id: string) {
  const { close, closeAndEmit } = useDialog();
  const form = useForm<FormLevelsType>({
    resolver: zodResolver(formLevelsSchema),
    mode: "all",
  });

  const onSubmit = async (values: FormLevelsType) => {
    const data = {
      name: values.name,
      description: values.description,
    };
    const path = id ? LevelsModel.CREATE : `${LevelsModel.ENDPOINT}/${id}`;

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
      const response = await apiClient.get<HttpGetResponseModel<LevelsProps>>(
        `${LevelsModel.ENDPOINT}/${id}`
      );
      const classData = response.data;
      form.reset({
        name: classData.data.name,
        description: classData.data.description,
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
