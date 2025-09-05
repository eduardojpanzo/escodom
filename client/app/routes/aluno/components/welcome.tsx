import { Calendar, Church, UserCheck, Users } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const studentData = {
  name: "João Silva",
  class: "Jovens (18-25 anos)",
  level: "Intermediário",
  attendance: 85,
  nextClass: "Domingo, 08:00",
};
export function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Church className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">
                Portal do Aluno
              </h1>
            </div>
            <Button variant="outline">Sair</Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Olá, {studentData.name}!
          </h2>
          <p className="text-gray-600">
            Bem-vindo ao seu portal da Escola Dominical
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Minha Classe</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{studentData.class}</p>
              <Badge variant="secondary" className="mt-2">
                {studentData.level}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-green-600" />
                <span>Frequência</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {studentData.attendance}%
              </p>
              <p className="text-sm text-gray-600">Nos últimos 3 meses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span>Próxima Aula</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{studentData.nextClass}</p>
              <p className="text-sm text-gray-600">Lição: Parábolas de Jesus</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Presenças</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  date: "15/12/2024",
                  status: "Presente",
                  lesson: "O Bom Samaritano",
                },
                {
                  date: "08/12/2024",
                  status: "Presente",
                  lesson: "A Ovelha Perdida",
                },
                {
                  date: "01/12/2024",
                  status: "Falta",
                  lesson: "O Filho Pródigo",
                },
                {
                  date: "24/11/2024",
                  status: "Presente",
                  lesson: "Os Dez Mandamentos",
                },
              ].map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{record.date}</p>
                    <p className="text-sm text-gray-600">{record.lesson}</p>
                  </div>
                  <Badge
                    variant={
                      record.status === "Presente" ? "default" : "destructive"
                    }
                  >
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
