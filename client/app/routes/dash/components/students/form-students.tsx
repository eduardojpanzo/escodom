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

const formStudentsSchema = z.object({
  name: Z.requiredString("name"),
  baptized: Z.requiredString("baptized"),
  birthDate: Z.requiredDate("birthDate"),
  profession: Z.optionalString("profession"),
  phone: Z.optionalString("phone"),
  classId: Z.requiredOptionField("classId"),
});

type FormStudentsType = z.infer<typeof formStudentsSchema>;
export function FormStudents() {
  const { close, form, onSubmit } = useFromStudents();
  return (
    <>
      <DialogHeader>
        <DialogTitle>Criar um Aluno</DialogTitle>
        <DialogDescription>Informe as informações do aluno</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="formStudents">
          <ResponsiveGrid columns={3} className="gap-2">
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
            <AutoCompleteControl
              name="classId"
              label="Classe"
              placeholder="Selecione a Classe"
              control={form.control}
              path={ClassesModel.GETS}
              propertyLabel="name"
              propertyValue="classId"
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
          form="formStudents"
          type="submit"
        >
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}

function useFromStudents() {
  const { close, closeAndEmit } = useDialog();
  const form = useForm<FormStudentsType>({
    resolver: zodResolver(formStudentsSchema),
    mode: "all",
  });

  const onSubmit = async (values: FormStudentsType) => {
    const data = {
      classId: values.classId.value,
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
