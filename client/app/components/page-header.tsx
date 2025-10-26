import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router";
import { useAuth } from "~/contexts/auth-context";
import { checkPermission } from "~/helpers/permissions";
import { Skeleton } from "./ui/skeleton";

export interface PageHeaderProps {
  title?: string;
  backUrl?: number;
  addButtonText?: string;
  children?: React.ReactElement;
  permissions?: string[];
  disabledButton?: boolean;
  addButtonFn?: (navigate: (delta: number) => void) => void;
}

export function PageHeaderComponent({
  title,
  backUrl = 0,
  addButtonText,
  children,
  addButtonFn,
  disabledButton,
  permissions,
}: PageHeaderProps) {
  const navigate = useNavigate();
  const { profile, isLoading } = useAuth();

  if (isLoading) {
    <Skeleton className="w-full h-4"></Skeleton>;
  }

  const isPermited = checkPermission(
    [...permissions!],
    profile?.users?.permissions
  );

  return (
    <div className="flex my-4">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          {backUrl > 0 && (
            <Button
              onClick={() => {
                navigate(-backUrl);
              }}
              variant={"ghost"}
            >
              <ChevronLeft /> Voltar
            </Button>
          )}
          <h4 className="ml-2 text-xl font-semibold">{title}</h4>
        </div>
        <div className="flex gap-2">
          {children}
          {addButtonText && isPermited && (
            <Button
              className="self-end font-semibold"
              disabled={disabledButton}
              onClick={() => addButtonFn?.(navigate)}
            >
              {addButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
