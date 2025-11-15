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
import { BAPTIZED } from "~/data/baptized";
import { useDialog } from "~/hooks/use-dialog";
import { StudentsModel } from "~/models/students.model";
import { apiClient } from "~/service/axios";
import { Z } from "~/utils/zod.validations";

const formStudentsSchema = z.object({
  name: Z.requiredString("name"),
  baptized: Z.requiredString("baptized"),
  birthDate: Z.requiredDate("birthDate"),
  profession: Z.optionalString("profession"),
  phone: Z.optionalString("phone"),
});

type FormStudentsType = z.infer<typeof formStudentsSchema>;
export function FormStudentsMinhaTurma({
  classroomId,
  classroomName,
}: {
  classroomId: string;
  classroomName: string;
}) {
  const { close, form, onSubmit } = useFromStudentsMinhaTurma(classroomId);
  return (
    <>
      <DialogHeader>
        <DialogTitle>Criar um Aluno do {classroomName}</DialogTitle>
        <DialogDescription>Informe as informações do aluno</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="formStudentsTurma">
          <ResponsiveGrid className="gap-2">
            <InputWithControl
              name="name"
              label="Nome"
              placeholder="Digite o nome"
              control={form.control}
            />
            <InputWithControl
              name="birthDate"
              label="Ano de Nascimento"
              type="date"
              control={form.control}
            />
            <InputWithControl
              name="phone"
              label="Número de telefone"
              placeholder="900 000 000"
              control={form.control}
            />
            <SelectWithControl
              name="baptized"
              label="Baptizado?"
              placeholder="selecione uma opção"
              control={form.control}
              options={BAPTIZED}
            />

            <InputWithControl
              name="profession"
              label="Profissão"
              placeholder="bombeiro"
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
          form="formStudentsTurma"
          type="submit"
        >
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}

function useFromStudentsMinhaTurma(classroomId: string) {
  const { close, closeAndEmit } = useDialog();
  const form = useForm<FormStudentsType>({
    resolver: zodResolver(formStudentsSchema),
    mode: "all",
  });

  const onSubmit = async (values: FormStudentsType) => {
    const data = {
      classroomId: classroomId,
      name: values.name,
      baptized: values.baptized,
      birthDate: values.birthDate.toISOString(),
      profession: values.profession,
      phone: values.phone,
    };
    try {
      await apiClient.post(StudentsModel.CREATE, {
        ...data,
      });

      closeAndEmit({
        message: `Criado com sucesso`,
        data: {
          description: `Dados alterados com sucesso`,
        },
      });
    } catch {}
  };
  return { form, onSubmit, close };
}
