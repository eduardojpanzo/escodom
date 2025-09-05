import { useState } from "react";
import type { Route } from "./+types/entrar";
import { LoginForm } from "./components/login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { AcessKeyForm } from "./components/access-key-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Entrar na aplicação" },
    { name: "Pagina de Autenticação", content: "Bem vindo a dimate queno" },
  ];
}

export default function LoginPage() {
  return (
    <div className="bg-accent flex min-h-svh flex-col items-center justify-center p-2 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">Aluno</TabsTrigger>
            <TabsTrigger value="teacher">Monitor</TabsTrigger>
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
  );
}
