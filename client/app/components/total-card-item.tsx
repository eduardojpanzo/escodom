import type { LucideProps } from "lucide-react";
import clsx from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router";
import { cn } from "~/lib/utils";
import { Skeleton } from "./ui/skeleton";

export type TotalCardProps = {
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  value: number | string;
  color: string;
};

export function TotalCard(data: TotalCardProps) {
  return (
    <Card className={"border min-w-48 gap-0"}>
      <CardHeader className="flex flex-row gap-2 items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn("text-sm font-semibold")}>
          {data.title}
        </CardTitle>
        {<data.icon size={24} className={cn("font-bold", data.color)} />}
      </CardHeader>
      <CardContent className="gap-0">
        <div className={cn("text-2xl")}>
          {data.value ? data.value.toString().padStart(4, " ") : "0000"}
        </div>
      </CardContent>
    </Card>
  );
}

export function TotalCardLoader() {
  return (
    <Skeleton className="flex flex-col items-center space-x-2 w-full md:w-[240px] h-[145px] px-4 py-6">
      <div className="flex gap-2 w-full">
        <Skeleton className="h-[25px] w-full rounded" />
        <Skeleton className="h-[45px] w-[45px]" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-[20px] w-[50%] rounded" />
        <Skeleton className="h-[15px] w-full rounded" />
      </div>
    </Skeleton>
  );
}
