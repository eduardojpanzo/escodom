import {
  BookOpen,
  Calendar,
  Settings,
  Shield,
  UserCheck,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

const features = [
  {
    title: " Gestão de Classes",
    desc: "Organize alunos por faixa etária e nível de conhecimento bíblico",
    itens: [
      { key: 1, title: "• Cadastro de alunos e professores" },
      { key: 2, title: "• Organização por níveis" },
      { key: 3, title: "• Chaves de acesso únicas" },
    ],
    color: "green",
    Icon: Users,
  },
  {
    title: "Controle de Presença",
    desc: "Acompanhe a frequência dos alunos de forma simples e eficaz",
    itens: [
      { key: 1, title: "• Registro rápido de presenças" },
      { key: 2, title: "• Histórico completo" },
      { key: 3, title: "• Relatórios de frequência" },
    ],
    color: "purple",
    Icon: UserCheck,
  },
  {
    title: "Escalas Dinâmicas",
    desc: "Gerencie escalas de professores e organize o cronograma de aulas",
    itens: [
      { key: 1, title: "• Programação de aulas" },
      { key: 2, title: "• Distribuição de professores<" },
      { key: 3, title: "• Notificações automáticas" },
    ],
    color: "orange",
    Icon: Calendar,
  },
  {
    title: "Gestão de Conteúdo",
    desc: "Organize lições, materiais e recursos para cada classe",
    itens: [
      { key: 1, title: "• Biblioteca de lições" },
      { key: 2, title: "• Materiais por faixa etária" },
      { key: 3, title: "• Planejamento de estudos" },
    ],
    color: "red",
    Icon: BookOpen,
  },
  {
    title: "Relatórios Completos",
    desc: "Acompanhe estatísticas e gere relatórios detalhados",
    itens: [
      { key: 1, title: "• Estatísticas de frequência" },
      { key: 2, title: "• Relatórios por classe" },
      { key: 3, title: "• Análises de crescimento" },
    ],
    color: "indigo",
    Icon: Settings,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Funcionalidades Principais
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Para organizar e tornar eficientes as actvidades na Escola Bíblica
            Dominical - Água viva. Temos:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardHeader>
                <div
                  className={cn(
                    "w-12 h-12  rounded-lg flex items-center justify-center mb-4",
                    `bg-${feature.color}-100`
                  )}
                >
                  <feature.Icon
                    className={cn("w-6 h-6", `text-${feature.color}-600`)}
                  />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  {feature.itens.map((item) => (
                    <li key={item.key}>{item.title}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
