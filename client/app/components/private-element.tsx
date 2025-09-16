import { cn } from "~/lib/utils";
import { Skeleton } from "./ui/skeleton";

type PrivateElementProps = {
  isAllowed?: boolean;
  children?: React.ReactNode;
  isLoading: boolean;
  className?: string;
};

export default function PrivateElement({
  children,
  isAllowed,
  isLoading,
  className,
}: PrivateElementProps) {
  if (isLoading) {
    return <Skeleton className={cn("h-6 w-24", className)} />;
  }

  if (!isAllowed) {
    return <></>;
  }

  return children;
}
