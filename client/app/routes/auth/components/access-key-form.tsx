import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { useNavigate } from "react-router";
import z from "zod";
import { Z } from "~/utils/zod.validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import { InputWithControl } from "~/components/form/input-control";
import { toast } from "sonner";
import { apiClient } from "~/service/axios";
import type { HttpGetResponseModel } from "~/types/query";
import type { StudentsProps } from "~/models/students.model";

const AcessKeyFormShema = z.object({
  accessKey: Z.requiredString("chave de acesso"),
});

type AcessKeyFormType = z.infer<typeof AcessKeyFormShema>;

export function AcessKeyForm() {
  const navigate = useNavigate();

  const form = useForm({
    mode: "all",
    resolver: zodResolver(AcessKeyFormShema),
  });

  const onSumbit = async (data: AcessKeyFormType) => {
    try {
      navigate(`/aluno?acess-key=${data.accessKey}`);
      // const response = await apiClient.get<HttpGetResponseModel<StudentsProps>>(
      //   `/students/get/${data.accessKey}`
      // );

      // if (!response.data.success) {
      //   toast.info("Verifique bem a sua chave de acesso e Tente de Novo");
      // }
      // if (response.data.success) {
      //   navigate(`/aluno?acess-key=${response.data.data.accessKey}`);
      // }
    } catch (err) {
      toast.error("Aluno Não Encotrado!");
    }
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="grid p-0 md:grid-cols-2">
        <Form {...form}>
          <form className="py-3 px-2" onSubmit={form.handleSubmit(onSumbit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bem-vindo Aluno (a)</h1>
                <p className="text-muted-foreground text-balance">
                  Entre com a sua chave de Acesso
                </p>
              </div>
              <InputWithControl
                label="Chave de Acesso"
                name="accessKey"
                control={form.control}
                type="password"
                required
              />
              <Button
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                type="submit"
                className="w-full"
              >
                Entrar
              </Button>
            </div>
          </form>
        </Form>
        <div className="bg-muted relative hidden md:block">
          <img
            src="/alunos.jpeg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </CardContent>
    </Card>
  );
}
