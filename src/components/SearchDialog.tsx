import { useState, useEffect, useRef } from "react";
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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const { canvases } = useCanvasStore();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const filteredCanvases = canvases.filter((canvas) =>
    canvas.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    canvas.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCanvasSelect = (id) => {
    navigate(`/canvas/${id}`);
    onOpenChange(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredCanvases.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleCanvasSelect(filteredCanvases[highlightedIndex].id);
    }
  };

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

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
            ref={inputRef}
            placeholder="Search templates..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-transparent shadow-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setHighlightedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {filteredCanvases.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No canvases found matching your search
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 p-4">
              {filteredCanvases.map((canvas, index) => (
                <Button
                  key={canvas.id}
                  variant="ghost"
                  className={`justify-start px-4 py-6 h-auto text-left ${
                    index === highlightedIndex ? "bg-gray-200" : ""
                  }`}
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
