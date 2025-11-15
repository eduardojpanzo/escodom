import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { AutoCompleteControl } from "~/components/form/select-component/autocomplete-control";
import { Button } from "~/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { useDialog } from "~/hooks/use-dialog";
import { ClassroomsModel } from "~/models/classrooms.model";
import { StudentsModel, type StudentsProps } from "~/models/students.model";
import { apiClient } from "~/service/axios";
import type { HttpGetResponseModel } from "~/types/query";
import { Z } from "~/utils/zod.validations";

const updateStudentsSchema = z.object({
  classroomId: Z.requiredOptionField("classroomId"),
});

type UpdateStudentsType = z.infer<typeof updateStudentsSchema>;
export function UpdateStudents({ id }: { id: string }) {
  const { close, form, onSubmit } = useUpdateStudents(id);
  return (
    <>
      <DialogHeader>
        <DialogTitle>Atualizar Informações do Aluno</DialogTitle>
        <DialogDescription>Informe as informações do aluno</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="UpdateStudents">
          <AutoCompleteControl
            name="classroomId"
            label="Sala"
            placeholder="Selecione uma sala de aula"
            control={form.control}
            path={ClassroomsModel.GETS}
            propertyLabel="name"
            propertyValue="classroomId"
          />
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
          form="UpdateStudents"
          type="submit"
        >
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}

function useUpdateStudents(id: string) {
  const { close, closeAndEmit } = useDialog();
  const form = useForm<UpdateStudentsType>({
    resolver: zodResolver(updateStudentsSchema),
    mode: "all",
  });

  const onSubmit = async (values: UpdateStudentsType) => {
    const data = {
      classroomId: values.classroomId.value,
    };
    try {
      await apiClient.put(`${StudentsModel.ENDPOINT}/${id}`, {
        ...data,
      });

      closeAndEmit({
        message: `Atualizado com sucesso`,
        data: {
          description: `Dados alterados com sucesso`,
        },
      });
    } catch {}
  };

  const loadData = async (id: string) => {
    try {
      const response = await apiClient.get<HttpGetResponseModel<StudentsProps>>(
        `${StudentsModel.ENDPOINT}/${id}`
      );
      const studentData = response.data;
      form.reset({
        classroomId: {
          label: studentData.data.classrooms?.name,
          value: studentData.data.classrooms?.classroomId,
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
