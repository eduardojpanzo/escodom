import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Church,
  Users,
  BookOpen,
  Calendar,
  UserCheck,
  Settings,
  Heart,
  Star,
  Shield,
  Clock,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

export function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-lg">
              <Church className="w-12 h-12 text-white" />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 text-balance">
                Sistema de Gestão da
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {" "}
                  Escola Dominical
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto text-pretty">
                Uma plataforma completa para organizar classes, controlar
                presenças e fortalecer o ensino bíblico em sua igreja
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                >
                  Acessar Sistema
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 bg-transparent"
              >
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar sua Escola Dominical de forma
              eficiente e organizada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Gestão de Classes</CardTitle>
                <CardDescription>
                  Organize alunos por faixa etária e nível de conhecimento
                  bíblico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Cadastro de alunos e professores</li>
                  <li>• Organização por níveis</li>
                  <li>• Chaves de acesso únicas</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Controle de Presença</CardTitle>
                <CardDescription>
                  Acompanhe a frequência dos alunos de forma simples e eficaz
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Registro rápido de presenças</li>
                  <li>• Histórico completo</li>
                  <li>• Relatórios de frequência</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Escalas Dinâmicas</CardTitle>
                <CardDescription>
                  Gerencie escalas de professores e organize o cronograma de
                  aulas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Programação de aulas</li>
                  <li>• Distribuição de professores</li>
                  <li>• Notificações automáticas</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Gestão de Conteúdo</CardTitle>
                <CardDescription>
                  Organize lições, materiais e recursos para cada classe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Biblioteca de lições</li>
                  <li>• Materiais por faixa etária</li>
                  <li>• Planejamento de estudos</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Relatórios Completos</CardTitle>
                <CardDescription>
                  Acompanhe estatísticas e gere relatórios detalhados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Estatísticas de frequência</li>
                  <li>• Relatórios por classe</li>
                  <li>• Análises de crescimento</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Acesso Seguro</CardTitle>
                <CardDescription>
                  Sistema de autenticação diferenciado para cada tipo de usuário
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Login para professores</li>
                  <li>• Chaves únicas para alunos</li>
                  <li>• Níveis de permissão</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
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
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Para Alunos
                  </h3>
                  <p className="text-gray-600">
                    Acesso simples com chave única fornecida pelo professor.
                    Visualize suas informações, frequência e próximas aulas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Para Professores
                  </h3>
                  <p className="text-gray-600">
                    Login completo com acesso ao painel administrativo. Gerencie
                    classes, registre presenças e acompanhe relatórios.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Gestão Completa
                  </h3>
                  <p className="text-gray-600">
                    Organize escalas, acompanhe estatísticas e mantenha tudo
                    organizado em um só lugar.
                  </p>
                </div>
              </div>
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
                    Desenvolvido especialmente para igrejas que desejam
                    modernizar e organizar sua Escola Dominical
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para Transformar sua Escola Dominical?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Comece hoje mesmo a organizar suas classes e fortalecer o ensino
            bíblico em sua igreja
          </p>
          <Link to="/auth">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              Acessar Sistema Agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Church className="w-6 h-6" />
              <span className="text-xl font-bold">
                Sistema Escola Dominical
              </span>
            </div>
            <p className="text-gray-400">
              Fortalecendo o ensino bíblico através da tecnologia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
