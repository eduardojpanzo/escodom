import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import z from "zod";
import { InputWithControl } from "~/components/form/input-control";
import { Button } from "~/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { useDialog } from "~/hooks/use-dialog";
import { UsersModel } from "~/models/users.model";
import { apiClient } from "~/service/axios";
import { Z } from "~/utils/zod.validations";

const CreateUsersSchema = z.object({
  email: Z.email(),
  password: Z.password(),
});

type CreateUsersType = z.infer<typeof CreateUsersSchema>;
export function CreateUsers({
  personId,
  role,
}: {
  personId: string;
  role: "teacher" | "student";
}) {
  const { close, form, onSubmit } = useCreateUsers(personId, role);
  return (
    <>
      <DialogHeader>
        <DialogTitle>Criar uma Conta</DialogTitle>
        <DialogDescription>Informe os dados da conta</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="CreateUsers">
          <InputWithControl
            name="email"
            label="E-mail"
            type="email"
            placeholder="Digite o seu e-mail"
            control={form.control}
          />

          <InputWithControl
            name="password"
            label="Senha"
            type="password"
            placeholder="Digite a sua senha"
            control={form.control}
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
          form="CreateUsers"
          type="submit"
        >
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}

function useCreateUsers(personId: string, role: "teacher" | "student") {
  const { close, closeAndEmit } = useDialog();
  const form = useForm<CreateUsersType>({
    resolver: zodResolver(CreateUsersSchema),
    mode: "all",
  });

  const onSubmit = async (values: CreateUsersType) => {
    try {
      await apiClient.put(UsersModel.CREATEFROM, {
        personId,
        role,
        ...values,
      });

      closeAndEmit({
        message: `Conta Criada`,
        data: {
          description: `Conta criada com sucesso`,
        },
      });
    } catch {}
  };
  return { form, onSubmit, close };
}
