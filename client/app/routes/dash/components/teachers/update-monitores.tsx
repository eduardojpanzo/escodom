import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import z from "zod";
import { InputWithControl } from "~/components/form/input-control";
import { SelectWithControl } from "~/components/form/select-control";
import { ResponsiveGrid } from "~/components/responsive-grid";
import { Button } from "~/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { POSITIONS } from "~/data/positions";
import { useDialog } from "~/hooks/use-dialog";
import { TeachersModel } from "~/models/teachers.model";
import { apiClient } from "~/service/axios";
import { Z } from "~/utils/zod.validations";

const updateTeachersSchema = z.object({
  position: Z.requiredString("position"),
  trainingYear: Z.requiredDate("trainingYear"),
});

type UpdateTachersType = z.infer<typeof updateTeachersSchema>;
export function UpdateTeachers({ id }: { id: string }) {
  const { close, form, onSubmit } = useUpdateTeachers(id);
  return (
    <>
      <DialogHeader>
        <DialogTitle>Dados do Monitor</DialogTitle>
        <DialogDescription>Informe as informações do monitor</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="updateTeachers">
          <ResponsiveGrid columns={3} className="gap-2">
            <SelectWithControl
              name="position"
              label="Posição do monitor na ebd"
              placeholder="Selecione o cargo"
              control={form.control}
              options={POSITIONS}
            />
            <InputWithControl
              name="trainingYear"
              label="Conclusão da formação"
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
          form="updateTeachers"
          type="submit"
        >
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}

function useUpdateTeachers(id: string) {
  const { close, closeAndEmit } = useDialog();
  const form = useForm<UpdateTachersType>({
    resolver: zodResolver(updateTeachersSchema),
    mode: "all",
  });

  const onSubmit = async (values: UpdateTachersType) => {
    const data = {
      position: values.position,
      trainingYear: values.trainingYear.toISOString(),
    };
    try {
      await apiClient.put(`${TeachersModel.ENDPOINT}/${id}`, {
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
  return { form, onSubmit, close };
}
