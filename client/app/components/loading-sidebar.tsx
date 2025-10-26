import { Skeleton } from "~/components/ui/skeleton";

export function LandingSidebar() {
  return (
    <aside className="w-64 max-w-full p-4 space-y-4">
      <Skeleton className="h-8 w-32" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-6 w-44" />
        <Skeleton className="h-6 w-36" />
      </div>
    </aside>
  );
}
