import { Link } from "react-router";
import { cn } from "~/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link className={cn("block h-14 w-14", className)} to={"/"}>
      <img
        className="max-w-full object-center object-contain"
        src="/logo.png"
        alt="logo"
      />
    </Link>
  );
}
