import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Save, X } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCanvasStore, CanvasContent } from "@/store/canvas-store";
import { AICoursePlanningCanvas } from "@/components/AICoursePlanningCanvas";
import { useAuth } from "@/context/auth-context";

export default function CanvasPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCanvas, fetchCanvases, saveCanvasContent, updateCanvasTitle, updateCanvasVersion, updateCanvasVisibility } = useCanvasStore();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [canvas, setCanvas] = useState<ReturnType<typeof getCanvas>>(undefined);
  const [pendingTitle, setPendingTitle] = useState<string | null>(null);
  const [pendingVersion, setPendingVersion] = useState<string | null>(null);
  const [pendingVisibility, setPendingVisibility] = useState<boolean | null>(null);
  const [hasEditedCanvas, setHasEditedCanvas] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [shouldEnterEditMode, setShouldEnterEditMode] = useState(false);
  const [newCanvasId, setNewCanvasId] = useState<string | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        await fetchCanvases();
        
        if (id) {
          const canvasData = getCanvas(id);
          setCanvas(canvasData);
          
          if (canvasData) {
            setPendingTitle(canvasData.title || null);
            setPendingVersion(canvasData.version || null);
            setPendingVisibility(canvasData.isPublic !== undefined ? canvasData.isPublic : true);
          }
          
          if (!canvasData) {
            toast.error("Canvas not found");
            navigate("/");
          } else if (canvasData.userId === user?.id && !canvasData.domain) {
            setShouldEnterEditMode(true);
          }
        }
      } catch (error) {
        console.error("Error loading canvas:", error);
        toast.error("Failed to load canvas");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [id, getCanvas, navigate, fetchCanvases, user]);

  useEffect(() => {
    if (newCanvasId && newCanvasId !== id) {
      navigate(`/canvas/${newCanvasId}`);
      setNewCanvasId(null);
    }
  }, [newCanvasId, id, navigate]);

  useEffect(() => {
    if (!isLoading && shouldEnterEditMode && !isEditing) {
      setIsEditing(true);
      setShouldEnterEditMode(false);
      toast.info("You can now edit your new canvas");
    }
  }, [isLoading, shouldEnterEditMode, isEditing]);

  const handleTitleChange = (title: string) => {
    setPendingTitle(title);
    setHasEditedCanvas(true);
  };

  const handleVersionChange = (version: string) => {
    setPendingVersion(version);
    setHasEditedCanvas(true);
  };

  const handleVisibilityChange = (isPublic: boolean) => {
    setPendingVisibility(isPublic);
    setHasEditedCanvas(true);
  };

  const handleToggleEdit = async () => {
    if (!user) {
      toast.error("Please login to edit this canvas", {
        description: "You need to be logged in to make changes.",
      });
      return;
    }
    if (isEditing) {
      setIsSaving(true);
      try {
        setIsEditing(false);
        if (hasEditedCanvas) {
          toast.success("Changes saved successfully");
          setHasEditedCanvas(false);
        } else {
          toast.info("No changes were made");
        }
      } catch (error) {
        console.error("Error saving changes:", error);
        toast.error("Failed to save changes");
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setHasEditedCanvas(false);
    
    if (canvas) {
      setPendingTitle(canvas.title || null);
      setPendingVersion(canvas.version || null);
      setPendingVisibility(canvas.isPublic !== undefined ? canvas.isPublic : true);
    }
    
    toast.info("Edit cancelled");
  };

  const handleSaveCanvas = async (content: CanvasContent, title?: string, version?: string, isPublic?: boolean) => {
    try {
      if (isSaving) {
        console.log("Save already in progress, ignoring duplicate request");
        return;
      }
      
      setIsSaving(true);
      setHasEditedCanvas(true);
      
      // Use provided values or fallback to pending values
      const titleToSave = title || pendingTitle;
      const versionToSave = version || pendingVersion;
      const visibilityToSave = isPublic !== undefined ? isPublic : pendingVisibility;
      
      const isPublicCanvas = canvas && user && canvas.userId !== user.id;
      
      if (isPublicCanvas && user) {
        // For public canvas, create a personal copy
        const updatedContent = await saveCanvasContent(content, user.id, visibilityToSave);
        
        if (updatedContent && updatedContent.canvasId !== id) {
          // Update title and version on the newly created copy
          let titleUpdateSuccess = true;
          let versionUpdateSuccess = true;
          let visibilityUpdateSuccess = true;
          
          if (titleToSave && titleToSave !== canvas.title) {
            titleUpdateSuccess = await updateCanvasTitle(updatedContent.canvasId, titleToSave);
            if (!titleUpdateSuccess) {
              console.error("Failed to update title on the new canvas copy");
            }
          }
          
          if (versionToSave && versionToSave !== canvas.version) {
            versionUpdateSuccess = await updateCanvasVersion(updatedContent.canvasId, versionToSave);
            if (!versionUpdateSuccess) {
              console.error("Failed to update version on the new canvas copy");
            }
          }
          
          if (visibilityToSave !== undefined && visibilityToSave !== canvas.isPublic) {
            visibilityUpdateSuccess = await updateCanvasVisibility(updatedContent.canvasId, visibilityToSave);
            if (!visibilityUpdateSuccess) {
              console.error("Failed to update visibility on the new canvas copy");
            }
          }
          
          setNewCanvasId(updatedContent.canvasId);
          
          const successMessage = titleUpdateSuccess && versionUpdateSuccess && visibilityUpdateSuccess
            ? "Created your personal copy of the canvas with all changes"
            : "Created your personal copy, but some metadata updates failed";
          
          // toast.success(successMessage);
          
          // Update local canvas info to reflect the changes
          if (titleToSave) {
            setCanvas(prev => prev ? { ...prev, title: titleToSave } : prev);
          }
          if (versionToSave) {
            setCanvas(prev => prev ? { ...prev, version: versionToSave } : prev);
          }
          if (visibilityToSave !== undefined) {
            setCanvas(prev => prev ? { ...prev, isPublic: visibilityToSave } : prev);
          }
          
          return;
        }
      } else {
        // For user's own canvas, save content directly
        await saveCanvasContent(content, undefined, visibilityToSave);
        
        // Update title, version, and visibility if changed
        let updateSuccessCount = 0;
        let updateAttemptCount = 0;
        
        if (titleToSave && titleToSave !== canvas?.title) {
          updateAttemptCount++;
          const success = await updateCanvasTitle(id!, titleToSave);
          if (success) {
            updateSuccessCount++;
            setCanvas(prev => prev ? { ...prev, title: titleToSave } : prev);
          }
        }
        
        if (versionToSave && versionToSave !== canvas?.version) {
          updateAttemptCount++;
          const success = await updateCanvasVersion(id!, versionToSave);
          if (success) {
            updateSuccessCount++;
            setCanvas(prev => prev ? { ...prev, version: versionToSave } : prev);
          }
        }
        
        if (visibilityToSave !== undefined && visibilityToSave !== canvas?.isPublic) {
          updateAttemptCount++;
          const success = await updateCanvasVisibility(id!, visibilityToSave);
          if (success) {
            updateSuccessCount++;
            setCanvas(prev => prev ? { ...prev, isPublic: visibilityToSave } : prev);
          }
        }
        
        if (updateAttemptCount > 0 && updateSuccessCount < updateAttemptCount) {
          toast.warning("Canvas content saved but some metadata updates failed");
        } else {
          // toast.success("Canvas saved successfully");
        }
      }
    } catch (error) {
      setHasEditedCanvas(false);
      console.error("Error saving canvas:", error);
      toast.error("Failed to save canvas content");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
          <div className="text-sm text-muted-foreground">Loading canvas...</div>
        </div>
      </div>
    );
  }

  if (!canvas) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-3xl font-bold">{canvas?.title}</h1>
        </div>
        
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button 
                onClick={handleToggleEdit} 
                variant="default" 
                disabled={isSaving}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Button 
                onClick={handleCancelEdit} 
                variant="outline" 
                disabled={isSaving}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={handleToggleEdit} variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Canvas
            </Button>
          )}
        </div>
      </div>
      
      {canvas && (
        
          <div className="max-w-3xl mx-auto space-y-6">
            
            
            <div className="pt-4 flex gap-4">
              {!isEditing ? (
                <Button 
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                  onClick={handleToggleEdit}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Canvas
                </Button>
              ) : (
                <Button 
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                  onClick={handleToggleEdit}
                  disabled={isSaving}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              )}
            </div>
          </div>
      )}
      
      <div className="border rounded-lg p-6 bg-card">
        <AICoursePlanningCanvas 
          isEditing={isEditing} 
          onSave={handleSaveCanvas}
          onTitleChange={handleTitleChange}
          onVersionChange={handleVersionChange}
          onVisibilityChange={handleVisibilityChange}
        />
      </div>
    </div>
  );
}