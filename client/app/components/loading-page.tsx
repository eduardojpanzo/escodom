import { useState, useEffect } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { Menu } from "lucide-react";

export function LandingSkeleton() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (isMobile) {
    // 📱 Mobile Layout
    return (
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="h-14 border-b px-4 flex items-center gap-2">
          <Menu className="w-5 h-5 text-muted-foreground" />
          <Skeleton className="h-6 w-24" />
        </header>

        {/* Content */}
        <main className="flex-1 p-4 space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </main>
      </div>
    );
  }

  // 💻 Desktop Layout
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4 space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-6 w-36" />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 border-b px-4 flex items-center">
          <Skeleton className="h-6 w-32" />
        </header>

        {/* Content */}
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
