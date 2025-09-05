import type { Route } from "./+types/cadastro";
import { LoginForm } from "./components/login-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Entrar na aplicação" },
    { name: "Pagina de Autenticação", content: "Bem vindo a dimate queno" },
  ];
}

export default function LoginPage() {
  return (
    <div className="bg-accent flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
