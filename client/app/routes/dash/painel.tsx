import type { Route } from "../dash/+types/painel";
import { SectionCards } from "~/components/section-cards";
import { ChartAreaInteractive } from "~/components/chart-area-interactive";
import { ChartRadialStackedByGender } from "./components/painel/por-genero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Painel" },
    {
      name: "Resumo de acções e actividades na aplicação",
      content: "Painel",
    },
  ];
}

export default function Painel() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="grid gap-1 grid-cols-1 py-4 px-4  sm:grid-cols-2 md:gap-6 md:py-6 lg:gap-3 lg:px-6 lg:grid-cols-3">
          <ChartRadialStackedByGender />
          <ChartRadialStackedByGender />
        </div>
      </div>
    </div>
  );
}
