import { Church } from "lucide-react";
import React from "react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Church className="w-6 h-6" />
            <span className="text-xl font-bold">Sistema Escola Dominical</span>
          </div>
          <p className="text-gray-400">
            Fortalecendo o ensino bíblico através da tecnologia
          </p>
        </div>
      </div>
    </footer>
  );
}
