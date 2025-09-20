import type { Route } from "./+types/cadastro";
import { LoginForm } from "./components/login-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Criar Conta" },
    { name: "Pagina de criar uma conta", content: "Bem vindo a ESCODOM" },
  ];
}

export default function CreateAccountPage() {
  return (
    <div className="bg-accent flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
