import { cn } from "~/lib/utils";

export interface ResponsiveGridProps {
  minColumnWidth?: string; // largura mínima antes de quebrar
  gap?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ResponsiveGrid({
  minColumnWidth = "300px",
  gap = "1rem",
  className,
  children,
}: ResponsiveGridProps) {
  return (
    <div
      className={cn("grid w-full max-w-full", className)}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${minColumnWidth}, 100%), 1fr))`,
        gap,
      }}
    >
      {children}
    </div>
  );
}
