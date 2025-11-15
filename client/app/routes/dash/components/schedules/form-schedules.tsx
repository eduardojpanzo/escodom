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
import { ClassroomsModel } from "~/models/classrooms.model";
import { SchedulesModel, type SchedulesProps } from "~/models/schedules.model";
import { TeachersModel } from "~/models/teachers.model";
import { apiClient } from "~/service/axios";
import type { HttpGetResponseModel } from "~/types/query";
import { Z } from "~/utils/zod.validations";

export const formScheduleSchema = z.object({
  teacherId: Z.requiredOptionField("teacherId"),
  startDate: Z.requiredDate("startDate"),
  endDate: Z.requiredDate("endDate"),
  classroomId: Z.requiredOptionField("classroomId"),
});

type FormSchedulesType = z.infer<typeof formScheduleSchema>;
export function FormSchedules({ id }: { id?: string }) {
  const { close, form, onSubmit } = useFormSchedules(id);
  return (
    <>
      <DialogHeader>
        <DialogTitle>{id ? "Atualizar" : "Criar"} escala</DialogTitle>
        <DialogDescription>Dados de uma escala</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="formSchedules">
          <ResponsiveGrid className="gap-2">
            <AutoCompleteControl
              name="teacherId"
              label="Monitor(a)"
              placeholder="Selecione o monitor"
              control={form.control}
              path={TeachersModel.GETS}
              propertyLabel="people.name"
              propertyValue="teacherId"
            />

            <AutoCompleteControl
              name="classroomId"
              label="Sala de aula"
              placeholder="Selecione a classe"
              control={form.control}
              path={ClassroomsModel.GETS}
              propertyLabel="name"
              propertyValue="classroomId"
            />

            <InputWithControl
              name="startDate"
              label="Data de ínicio"
              type="date"
              control={form.control}
            />

            <InputWithControl
              name="endDate"
              label="Data de fim"
              type="date"
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
          form="formSchedules"
          type="submit"
        >
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}

function useFormSchedules(id?: string) {
  const { close, closeAndEmit } = useDialog();
  const form = useForm<FormSchedulesType>({
    resolver: zodResolver(formScheduleSchema),
    mode: "all",
  });

  const onSubmit = async (values: FormSchedulesType) => {
    const data = {
      teacherId: values.teacherId.value,
      startDate: values.startDate,
      endDate: values.endDate,
      classroomId: values.classroomId.value,
    };
    const path = id
      ? `${SchedulesModel.ENDPOINT}/${id}`
      : SchedulesModel.CREATE;

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
        HttpGetResponseModel<SchedulesProps>
      >(`${SchedulesModel.ENDPOINT}/${id}`);
      const scheduleData = response.data;
      form.reset({
        teacherId: {
          label: scheduleData.data.teachers?.people?.name,
          value: scheduleData.data.teachers?.teacherId,
        },
        startDate: scheduleData.data.startDate,
        endDate: scheduleData.data.endDate,
        classroomId: {
          label: scheduleData.data.classrooms?.name,
          value: scheduleData.data.classrooms?.classroomId,
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

//na escala criar a possibilidade de escalar os monitores de maneira multipla, ou seja, em massa. e tambem a sua edição.
