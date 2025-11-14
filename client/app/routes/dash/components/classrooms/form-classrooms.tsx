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
import { ClassesModel } from "~/models/classes.model";
import {
  ClassroomsModel,
  type ClassroomsProps,
} from "~/models/classrooms.model";
import { apiClient } from "~/service/axios";
import type { HttpGetResponseModel } from "~/types/query";
import { Z } from "~/utils/zod.validations";

const formClassroomsSchema = z.object({
  name: Z.requiredString("name"),
  description: Z.optionalString("description"),
  classId: Z.requiredOptionField("classId"),
});

type FormClassroomsType = z.infer<typeof formClassroomsSchema>;
export function FormClassrooms({ id }: { id?: string }) {
  const { close, form, onSubmit } = useFormClassrooms(id);
  return (
    <>
      <DialogHeader>
        <DialogTitle>{id ? "Atualizar" : "Criar"} a Sala de Aula</DialogTitle>
        <DialogDescription>Dados de uma Sala</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="formClassrooms">
          <ResponsiveGrid className="gap-2">
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
              name="classId"
              label="Classe"
              placeholder="Selecione Classe da sala"
              control={form.control}
              path={ClassesModel.GETS}
              propertyLabel="name"
              propertyValue="classId"
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
          form="formClassrooms"
          type="submit"
        >
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}

function useFormClassrooms(id?: string) {
  const { close, closeAndEmit } = useDialog();
  const form = useForm<FormClassroomsType>({
    resolver: zodResolver(formClassroomsSchema),
    mode: "all",
  });

  const onSubmit = async (values: FormClassroomsType) => {
    const data = {
      classId: values.classId.value,
      name: values.name,
      description: values.description,
    };
    const path = id
      ? `${ClassroomsModel.ENDPOINT}/${id}`
      : ClassroomsModel.CREATE;

    try {
      await apiClient[id ? "put" : "post"](path, {
        ...data,
      });

      closeAndEmit({
        message: `${id ? "Atualizado" : "Criado"} com sucesso`,
        data: {
          description: `Dados alterados com sucesso`,
        },
      });
    } catch {}
  };

  const loadData = async (id: string) => {
    try {
      const response = await apiClient.get<
        HttpGetResponseModel<ClassroomsProps>
      >(`${ClassroomsModel.ENDPOINT}/${id}`);
      const classData = response.data;
      form.reset({
        name: classData.data.name,
        description: classData.data.description,
        classId: {
          label: classData.data.classes?.name,
          value: classData.data.classes?.classId,
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
