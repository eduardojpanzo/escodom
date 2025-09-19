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
import { PeopleModel } from "~/models/people.model";
import { UsersModel } from "~/models/users.model";
import { apiClient } from "~/service/axios";
import { Z } from "~/utils/zod.validations";

const UpdatePasswordSchema = z
  .object({
    password: Z.password(),
    newPassword: Z.password(),
    confirmNewPassword: Z.password(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem",
  });

type UpdatePasswordType = z.infer<typeof UpdatePasswordSchema>;
export function UpdatePassword({ userId }: { userId: string }) {
  const { close, form, onSubmit } = useUpdatePassword(userId);
  return (
    <>
      <DialogHeader>
        <DialogTitle>Alterar a Senha</DialogTitle>
        <DialogDescription>Defina a senha e a nova senha</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="UpdatePassword">
          <InputWithControl
            name="password"
            label="Senha"
            type="password"
            placeholder="Digite a sua senha"
            control={form.control}
          />

          <InputWithControl
            name="newPassword"
            label="Nova Senha"
            type="password"
            placeholder="Digite a nova senha"
            control={form.control}
          />

          <InputWithControl
            name="confirmNewPassword"
            label="Confirme a Nova Senha"
            type="password"
            placeholder="Confirme a nova senha"
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
          form="UpdatePassword"
          type="submit"
        >
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}

function useUpdatePassword(userId: string) {
  const { close, closeAndEmit } = useDialog();
  const form = useForm<UpdatePasswordType>({
    resolver: zodResolver(UpdatePasswordSchema),
    mode: "all",
  });

  const onSubmit = async (values: UpdatePasswordType) => {
    try {
      await apiClient.put(UsersModel.CHANGEPASSWORD, {
        userId,
        ...values,
      });

      closeAndEmit({
        message: `Senha alterada com sucesso`,
        data: {
          description: `Senha alterada com sucesso`,
        },
      });
    } catch {}
  };
  return { form, onSubmit, close };
}
