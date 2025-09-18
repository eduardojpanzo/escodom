import { useSearchParams } from "react-router";
import ProtectedRoute from "../protected";
import type { Route } from "./+types/page";
import { Welcome } from "./components/welcome";
import { apiClient } from "~/service/axios";
import type { HttpGetResponseModel } from "~/types/query";
import type { StudentsProps } from "~/models/students.model";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [searchParams] = useSearchParams();
  const accessKey = searchParams.get("acess-key");

  const getStudentData = async () => {
    try {
      const response = await apiClient.get<HttpGetResponseModel<StudentsProps>>(
        `/students/get/${accessKey}`
      );

      if (!response.data.success) {
        toast.info("Verifique bem a sua chave de acesso e Tente de Novo");
      }

      return response.data.data;
    } catch (err) {
      toast.error("Aluno Não Encotrado!");
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getStudentData", accessKey ?? ""],
    queryFn: getStudentData,
  });

  return (
    <ProtectedRoute
      isLoading={isLoading}
      isAllowed={!!data?.studentId}
      redirectPath="/auth"
    >
      {" "}
      <Welcome />
    </ProtectedRoute>
  );
}
