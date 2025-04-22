
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";

interface CanvasHeaderProps {
  title: string;
  course?: string;
  author?: string;
  date?: string;
  version?: string;
  isEditing?: boolean;
  onTitleChange?: (title: string) => void;
  onVersionChange?: (version: string) => void;
}

export function CanvasHeader({
  title,
  course,
  author,
  date,
  version,
  isEditing = false,
  onTitleChange,
  onVersionChange,
}: CanvasHeaderProps) {
  const [courseValue, setCourseValue] = useState(course || "");
  const [versionValue, setVersionValue] = useState(version || "");

  // Update local state when props change or when edit mode changes
  useEffect(() => {
    setCourseValue(course || "");
    setVersionValue(version || "");
  }, [course, version, isEditing]);

  // Handle course title change
  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCourseValue(newValue);
    if (onTitleChange) {
      onTitleChange(newValue);
    }
  };

  // Handle version change
  const handleVersionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setVersionValue(newValue);
    if (onVersionChange) {
      onVersionChange(newValue);
    }
  };

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(course || isEditing) && (
          <Card className="shadow-sm relative">
            <CardContent className="p-3">
              <div className="text-xs text-muted-foreground">Course:</div>
              {isEditing ? (
                <Input 
                  className="text-sm py-1 h-7 mt-1"
                  value={courseValue}
                  onChange={handleCourseChange}
                />
              ) : (
                <div className="text-sm font-medium truncate">
                  {course}
                </div>
              )}
            </CardContent>
          </Card>
        )}
        {author && (
          <Card className="shadow-sm">
            <CardContent className="p-3">
              <div className="text-xs text-muted-foreground">Author:</div>
              <div className="text-sm font-medium truncate">{author}</div>
            </CardContent>
          </Card>
        )}
        {date && (
          <Card className="shadow-sm">
            <CardContent className="p-3">
              <div className="text-xs text-muted-foreground">Date:</div>
              <div className="text-sm font-medium truncate">{date}</div>
            </CardContent>
          </Card>
        )}
        {(version || isEditing) && (
          <Card className="shadow-sm relative">
            <CardContent className="p-3">
              <div className="text-xs text-muted-foreground">Version:</div>
              {isEditing ? (
                <Input 
                  className="text-sm py-1 h-7 mt-1"
                  value={versionValue}
                  onChange={handleVersionChange}
                />
              ) : (
                <div className="text-sm font-medium truncate">
                  {version}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}