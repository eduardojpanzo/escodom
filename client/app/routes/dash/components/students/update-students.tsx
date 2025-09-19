import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import z from "zod";
import { InputWithControl } from "~/components/form/input-control";
import { AutoCompleteControl } from "~/components/form/select-component/autocomplete-control";
import { SelectWithControl } from "~/components/form/select-control";
import { ResponsiveGrid } from "~/components/responsive-grid";
import { Button } from "~/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { BAPTIZED } from "~/data/baptized";
import { useDialog } from "~/hooks/use-dialog";
import { ClassesModel } from "~/models/classes.model";
import { StudentsModel } from "~/models/students.model";
import { apiClient } from "~/service/axios";
import { Z } from "~/utils/zod.validations";

const updateStudentsSchema = z.object({
  classId: Z.requiredOptionField("classId"),
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
            name="classId"
            label="Classe"
            placeholder="Selecione a Classe"
            control={form.control}
            path={ClassesModel.GETS}
            propertyLabel="name"
            propertyValue="classId"
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
      classId: values.classId.value,
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
  return { form, onSubmit, close };
}
