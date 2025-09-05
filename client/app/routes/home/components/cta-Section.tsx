import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export function CTASection() {
  return (
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
            Entrar
          </Button>
        </Link>
      </div>
    </section>
  );
}
