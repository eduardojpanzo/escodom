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

const CreateAccountSchema = z.object({
  personalCode: Z.requiredString("personalCode"),
  email: Z.email(),
  password: Z.password(),
});

type CreateAccountType = z.infer<typeof CreateAccountSchema>;
export function CreateAccount() {
  const { close, form, onSubmit } = useCreateAccount();
  return (
    <>
      <DialogHeader>
        <DialogTitle>Criar uma Conta</DialogTitle>
        <DialogDescription>Informe os dados da conta</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="CreateAccount">
          <InputWithControl
            name="personalCode"
            label="Código Pessoal"
            type="text"
            placeholder="Digite o seu Código Pessoal"
            control={form.control}
          />
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
          form="CreateAccount"
          type="submit"
        >
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}

function useCreateAccount() {
  const { close, closeAndEmit } = useDialog();
  const form = useForm<CreateAccountType>({
    resolver: zodResolver(CreateAccountSchema),
    mode: "all",
  });

  const onSubmit = async (values: CreateAccountType) => {
    try {
      await apiClient.put(UsersModel.CREATE, {
        personalCode: values.personalCode,
        email: values.email,
        password: values.password,
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
