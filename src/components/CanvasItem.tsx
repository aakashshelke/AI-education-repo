
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RichTextEditor } from "@/components/RichTextEditor";

interface CanvasItemProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  isEditing?: boolean;
  isDisabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function CanvasItem({
  title,
  description,
  icon,
  className,
  isEditing = false,
  isDisabled = false,
  value = "",
  onChange,
}: CanvasItemProps) {
  return (
    <div className={cn("mb-4 last:mb-0", isDisabled && "opacity-50", className)}>
      <div className="flex items-start gap-2">
        {icon && <div className="mt-0.5 text-primary">{icon}</div>}
        <div className="w-full">
          <h4 className="font-medium text-foreground">{title}</h4>
          {description && (
            <p className="text-muted-foreground text-xs mt-1 mb-2">{description}</p>
          )}
          
          {isDisabled && isEditing && (
            <div className="mt-2 p-3 bg-muted/50 rounded-md border-2 border-dashed border-muted-foreground/30">
              <p className="text-sm text-muted-foreground text-center">
                Complete the previous section to unlock this field
              </p>
            </div>
          )}
          
          {isEditing && !isDisabled && (
            <div className="mt-2">
              <RichTextEditor 
                placeholder={`Enter details for ${title}...`}
                value={value}
                onChange={(value) => onChange?.(value)}
              />
            </div>
          )}
          
          {!isEditing && value && (
            <div 
              className="mt-2 prose prose-sm max-w-none text-sm"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
