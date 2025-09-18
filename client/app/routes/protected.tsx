import { Navigate, Outlet } from "react-router";
import { LandingSkeleton } from "~/components/loading-page";

type ProtectedRouteProps = {
  isAllowed?: boolean;
  redirectPath: string;
  children?: React.ReactNode;
  isLoading: boolean;
};

export default function ProtectedRoute({
  children,
  isAllowed,
  redirectPath,
  isLoading,
}: ProtectedRouteProps) {
  if (isLoading) {
    return <LandingSkeleton />;
  }
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}
