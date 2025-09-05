import { Church } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export function HeroSection() {
  return (
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
                Escola Bíblica Dominical - Água viva
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto text-pretty">
              Uma plataforma completa para organizar classes, controlar
              presenças e fortalecer o ensino bíblico
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
              >
                Entrar
              </Button>
            </Link>
            {/* <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 bg-transparent"
            >
              Saiba Mais
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
