import { Clock, Heart, Star } from "lucide-react";
import { cn } from "~/lib/utils";

const data = [
  {
    point: 1,
    title: "Para Alunos",
    desc: "Acesso simples com chave única fornecida pelo professor. Visualize suas informações, frequência e próximas aulas.",
    bg: "bg-blue-600",
  },
  {
    point: 2,
    title: "Para Professores",
    desc: "Login completo com acesso ao painel administrativo. Gerencie classes, registre presenças e acompanhe relatórios.",
    bg: "bg-green-600",
  },
  {
    point: 3,
    title: "Gestão Completa",
    desc: "Organize escalas, acompanhe estatísticas e mantenha tudo organizado em um só lugar.",
    bg: "bg-purple-600",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Como Funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interface simples e intuitiva, pensada para voluntários com
            diferentes níveis de experiência tecnológica
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {data.map((item) => (
              <div key={item.title} className="flex items-start space-x-4">
                <div
                  className={cn(
                    "w-8 h-8 max-w-8 max-h-8 text-white rounded-full flex items-center justify-center font-bold text-sm",
                    item.bg
                  )}
                >
                  {item.point}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Feito com Amor
                </h3>
                <p className="text-gray-600">
                  Desenvolvido especialmente para modernizar e organizar a
                  Escola Bíblica Dominical - Água viva
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">
                    Economia de Tempo
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <Star className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">
                    Fácil de Usar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
