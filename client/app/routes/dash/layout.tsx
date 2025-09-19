import { Outlet } from "react-router";
import { AppSidebar } from "~/components/app-sidebar";
import { SiteHeader } from "~/components/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { DialogContextProvider } from "~/contexts/dialog-context";
import ProtectedRoute from "../protected";
import { useAuth } from "~/contexts/auth-context";

export default function LayoutDash() {
  const { isAuthenticated, isLoading, profile } = useAuth();
  return (
    <ProtectedRoute
      isLoading={isLoading}
      isAllowed={isAuthenticated && profile?.users?.role === "teacher"}
      redirectPath="/auth"
    >
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <DialogContextProvider>
            <Outlet />
          </DialogContextProvider>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
