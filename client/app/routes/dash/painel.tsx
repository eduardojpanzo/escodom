import type { Route } from "../dash/+types/painel";
import { SectionCards } from "~/components/section-cards";
import { ChartAreaInteractive } from "~/components/chart-area-interactive";

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
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
        </div>
      </div>
    </div>
  );
}
