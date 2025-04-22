
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCanvasStore } from "@/store/canvas-store";

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const { canvases } = useCanvasStore();
  const navigate = useNavigate();
  
  const filteredCanvases = canvases.filter(canvas => 
    canvas.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    canvas.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCanvasSelect = (id: string) => {
    navigate(`/canvas/${id}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-4 pt-5 pb-0">
          <DialogTitle>Search Canvases</DialogTitle>
          <DialogDescription>
            Find AI educational resources and canvases
          </DialogDescription>
        </DialogHeader>
        <div className="px-4 py-4 flex items-center border-b">
          <Search className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
          <Input 
            placeholder="Search templates..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-transparent shadow-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {filteredCanvases.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No canvases found matching your search
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 p-4">
              {filteredCanvases.map((canvas) => (
                <Button
                  key={canvas.id}
                  variant="ghost"
                  className="justify-start px-4 py-6 h-auto text-left"
                  onClick={() => handleCanvasSelect(canvas.id)}
                >
                  <div>
                    <div className="font-medium">{canvas.title}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {canvas.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
