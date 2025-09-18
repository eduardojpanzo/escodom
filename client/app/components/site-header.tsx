import { ChevronRight } from "lucide-react";
import { useLocation } from "react-router";
import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar";

export function SiteHeader() {
  const { pathname } = useLocation();

  const currentPage =
    pathname.split("/").length > 2 ? pathname.split("/")[2] : "";

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="flex items-center gap-1 text-base font-medium">
          Painel
          {!!currentPage.trim() && (
            <ChevronRight className="hidden w-4 md:inline" />
          )}
          <span>{currentPage}</span>
        </h1>
        <div className="ml-auto flex items-center gap-2"></div>
      </div>
    </header>
  );
}
