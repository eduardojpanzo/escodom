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
import { POSITIONS } from "~/data/positions";
import { useDialog } from "~/hooks/use-dialog";
import { TeachersModel } from "~/models/teachers.model";
import { apiClient } from "~/service/axios";
import { Z } from "~/utils/zod.validations";

const formTeachersSchema = z.object({
  position: Z.requiredString("position"),
  name: Z.requiredString("name"),
  baptized: Z.requiredString("baptized"),
  birthDate: Z.requiredDate("birthDate"),
  profession: Z.optionalString("profession"),
  trainingYear: Z.requiredDate("trainingYear"),
  phone: Z.optionalString("phone"),
});

type FormTachersType = z.infer<typeof formTeachersSchema>;
export function FormTeachers() {
  const { close, form, onSubmit } = useFromTeachers();
  return (
    <>
      <DialogHeader>
        <DialogTitle>Criar um Monitor</DialogTitle>
        <DialogDescription>Informe as informações do monitor</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="formTeachers">
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
          form="formTeachers"
          type="submit"
        >
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}

function useFromTeachers() {
  const { close, closeAndEmit } = useDialog();
  const form = useForm<FormTachersType>({
    resolver: zodResolver(formTeachersSchema),
    mode: "all",
  });

  const onSubmit = async (values: FormTachersType) => {
    const data = {
      position: values.position,
      name: values.name,
      baptized: values.baptized,
      birthDate: values.birthDate.toISOString(),
      profession: values.profession,
      trainingYear: values.trainingYear.toISOString(),
      phone: values.phone,
    };
    try {
      await apiClient.post(TeachersModel.CREATE, {
        ...data,
      });

      closeAndEmit({
        message: `Criado com sucesso`,
        data: {
          description: `Dados da entidade alterados com sucesso`,
        },
      });
    } catch {}
  };
  return { form, onSubmit, close };
}
