import type { Route } from "./+types/entrar";
import { LoginForm } from "./components/login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { AcessKeyForm } from "./components/access-key-form";
import ProtectedRoute from "../protected";
import { useAuth } from "~/contexts/auth-context";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Entrar" },
    { name: "Pagina de Autenticação", content: "Bem vindo a ESCODOM" },
  ];
}

export default function LoginPage() {
  const { isLoading, isAuthenticated } = useAuth();
  return (
    <ProtectedRoute
      isLoading={isLoading}
      isAllowed={!isAuthenticated}
      redirectPath="/dash"
    >
      <div className="bg-accent flex min-h-svh flex-col items-center justify-center p-2 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <Tabs defaultValue="teacher" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="teacher">Monitor</TabsTrigger>
              <TabsTrigger value="student">Aluno</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <AcessKeyForm />
            </TabsContent>

            <TabsContent value="teacher">
              <LoginForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}
