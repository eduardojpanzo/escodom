import { Skeleton } from "~/components/ui/skeleton";
import { useIsMobile } from "~/hooks/use-mobile";

export function LandingSkeleton() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen">
        <header className="h-14 px-4 flex items-center gap-2">
          <Skeleton className="h-6 w-24" />
        </header>

        <main className="flex-1 p-4 space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 p-4 space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-6 w-36" />
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-14 px-4 flex items-center">
          <Skeleton className="h-6 w-32" />
        </header>

        <main className="flex-1 p-6 space-y-4">
          <Skeleton className="h-10 w-1/3" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
          <Skeleton className="h-40 w-full rounded-xl" />
        </main>
      </div>
    </div>
  );
}
