import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { useNavigate } from "react-router";
import z from "zod";
import { Z } from "~/utils/zod.validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWithControl } from "~/components/form/input-control";
import { Form } from "~/components/ui/form";
import { setAuthToken } from "~/lib/session";
import { toast } from "sonner";
import { apiClient } from "~/service/axios";
import { type HttpGetResponseModel } from "~/types/query";
import { UsersModel } from "~/models/users.model";

const CreateFormShema = z.object({
  email: Z.email(),
  password: Z.password(),
});

type CreateFormType = z.infer<typeof CreateFormShema>;

export function CreateForm() {
  const navigate = useNavigate();

  const form = useForm({
    mode: "all",
    resolver: zodResolver(CreateFormShema),
  });

  const onSubmit = async (data: CreateFormType) => {
    try {
      const response = await apiClient.post<
        HttpGetResponseModel<{ token: string }>
      >(UsersModel.SIGN, data);

      if (!response.data.success) {
        toast.info("Verifique os seus Dados!");
      }
      if (response.data.success) {
        setAuthToken(response.data.data.token);
        navigate("/dash");
      }
    } catch (err) {
      toast.error("Erro ao fazer o login");
    }
  };
  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="grid p-0 md:grid-cols-2">
        <Form {...form}>
          <form
            className="py-3 px-2"
            id="CreateForm"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
                <p className="text-muted-foreground text-balance">
                  Entre com suas credenciais
                </p>
              </div>
              <InputWithControl
                label="E-mail"
                name="email"
                control={form.control}
                required
                type="email"
              />

              <InputWithControl
                label="Senha"
                name="password"
                control={form.control}
                required
                type="password"
              />
              <Button
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                type="submit"
                form="CreateForm"
                className="w-full"
              >
                Entrar
              </Button>
            </div>
          </form>
        </Form>
        <div className="bg-muted relative hidden md:block">
          <img
            src="/monitores.jpg"
            alt="monitores"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </CardContent>
    </Card>
  );
}
