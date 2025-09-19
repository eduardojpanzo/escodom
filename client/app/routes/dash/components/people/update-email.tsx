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

const UpdateEmailSchema = z.object({
  email: Z.email(),
});

type UpdateEmailType = z.infer<typeof UpdateEmailSchema>;
export function UpdateEmail({ userId }: { userId: string }) {
  const { close, form, onSubmit } = useUpdateEmail(userId);
  return (
    <>
      <DialogHeader>
        <DialogTitle>Atualizar o e-mail</DialogTitle>
        <DialogDescription className="sr-only">
          Informe as informações
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="UpdateEmail">
          <InputWithControl
            name="email"
            label="E-mail"
            type="email"
            placeholder="Digite o seu e-mail novo"
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
          form="UpdateEmail"
          type="submit"
        >
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}

function useUpdateEmail(userId: string) {
  const { close, closeAndEmit } = useDialog();
  const form = useForm<UpdateEmailType>({
    resolver: zodResolver(UpdateEmailSchema),
    mode: "all",
  });

  const onSubmit = async (values: UpdateEmailType) => {
    try {
      await apiClient.put(`${UsersModel.ENDPOINT}/${userId}`, {
        ...values,
      });

      closeAndEmit({
        message: `E-mail atualizado com sucesso`,
        data: {
          description: `operação concluida sucesso`,
        },
      });
    } catch {}
  };
  return { form, onSubmit, close };
}
