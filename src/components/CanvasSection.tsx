
import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CanvasSectionProps {
  title: string;
  number?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function CanvasSection({
  title,
  number,
  icon,
  children,
  className,
}: CanvasSectionProps) {
  return (
    <Card className={cn("h-full shadow-sm", className)}>
      <CardHeader className="bg-muted/50 py-3 border-b">
        <div className="flex items-center justify-between">
          {number && (
            <span className="text-sm font-medium text-muted-foreground">{number}</span>
          )}
          <CardTitle className="text-md font-medium">{title}</CardTitle>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent className="p-4 text-sm">{children}</CardContent>
    </Card>
  );
}
