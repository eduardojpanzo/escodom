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
import { SchedulesModel, type SchedulesProps } from "~/models/schedules.model";
import { apiClient } from "~/service/axios";
import type { HttpGetResponseModel } from "~/types/query";
import { Z } from "~/utils/zod.validations";

export const formScheduleSchema = z.object({
  teacherId: Z.requiredOptionField("teacherId"),
  startDate: Z.requiredDate("startDate"),
  endDate: Z.requiredDate("endDate"),
  classId: Z.requiredOptionField("classId"),
});

type FormSchedulesType = z.infer<typeof formScheduleSchema>;
export function FormSchedules({ id }: { id?: string }) {
  const { close, form, onSubmit } = useFormSchedules(id);
  return (
    <>
      <DialogHeader>
        <DialogTitle>{id ? "Criar " : "Atualizar"} uma escala</DialogTitle>
        <DialogDescription>Dados de uma escala</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="formSchedules">
          <ResponsiveGrid className="gap-2">
            <AutoCompleteControl
              name="teacherId"
              label="Monitor"
              placeholder="Selecione o monitor"
              control={form.control}
              path={ClassesModel.GETS}
              propertyLabel="name"
              propertyValue="teacherId"
            />

            <AutoCompleteControl
              name="classId"
              label="Classe"
              placeholder="Selecione a classe"
              control={form.control}
              path={ClassesModel.GETS}
              propertyLabel="name"
              propertyValue="classId"
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
      teacherId: values.teacherId,
      startDate: values.startDate,
      endDate: values.endDate,
      classId: values.classId,
    };
    const path = id
      ? SchedulesModel.CREATE
      : `${SchedulesModel.ENDPOINT}/${id}`;

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
      const response = await apiClient.get<
        HttpGetResponseModel<SchedulesProps>
      >(`${ClassesModel.ENDPOINT}/${id}`);
      const scheduleData = response.data;
      form.reset({
        teacherId: {
          label: scheduleData.data.classes?.name,
          value: scheduleData.data.classes?.classId,
        },
        startDate: scheduleData.data.startDate,
        endDate: scheduleData.data.endDate,
        classId: {
          label: scheduleData.data.classes?.name,
          value: scheduleData.data.classes?.classId,
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
