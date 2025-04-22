
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CanvasCard } from "@/components/CanvasCard";
import { useAuth } from "@/context/auth-context";
import { useCanvasStore } from "@/store/canvas-store";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const { userCanvases, fetchUserCanvases, isLoading, addCanvas, removeCanvas, updateCanvasVisibility } = useCanvasStore();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCreatingCanvas, setIsCreatingCanvas] = useState(false);
  const [canvasToDelete, setCanvasToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch user canvases when component mounts or when returning to this page
  useEffect(() => {
    if (isAuthenticated && user) {
      const loadUserCanvases = async () => {
        try {
          await fetchUserCanvases(user.id);
          setIsInitialized(true);
        } catch (error) {
          console.error("Error loading user canvases:", error);
          toast.error("Failed to load your canvases");
        }
      };
      
      loadUserCanvases();
    }
  }, [isAuthenticated, user, fetchUserCanvases]);

  // Force a refresh when the page becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isAuthenticated && user) {
        fetchUserCanvases(user.id);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthenticated, user, fetchUserCanvases]);

  const handleCreateCanvas = async () => {
    if (!user) {
      toast.error("You must be logged in to create a canvas");
      return;
    }

    try {
      setIsCreatingCanvas(true);
      
      // Create a new blank canvas with default values
      const newCanvas = {
        id: "",
        title: "New Canvas",
        description: "My custom AI course planning canvas",
        userId: user.id,
        gradient: Math.floor(Math.random() * 5) + 1, // Random gradient between 1-5
        domain: "",
        potentialUseCase: "",
        domainData: "",
        implications: "",
        resources: "",
        learners: "",
        instructors: "",
        support: "",
        outcomes: "",
        assessment: "",
        activities: "",
        isPublic: false // Default to private canvas
      };
      
      await addCanvas(newCanvas);
      toast.success("New canvas created successfully");
      
      // Refresh user canvases and then sort them
      await fetchUserCanvases(user.id);
      
      // Find the newly created canvas (should be the most recent one)
      if (userCanvases.length > 0) {
        // Sort by creation date (newest first) and get the first one
        const sortedCanvases = [...userCanvases].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date();
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date();
          return dateB.getTime() - dateA.getTime();
        });
        
        // Navigate to the edit page for the new canvas
        navigate(`/canvas/${sortedCanvases[-1].id}`);
      }
    } catch (error) {
      console.error("Error creating canvas:", error);
      toast.error("Failed to create new canvas");
    } finally {
      setIsCreatingCanvas(false);
    }
  };

  const handleDeleteCanvas = async (canvasId: string) => {
    setCanvasToDelete(canvasId);
  };

  const confirmDeleteCanvas = async () => {
    if (!canvasToDelete) return;
    
    try {
      setIsDeleting(true);
      await removeCanvas(canvasToDelete);
      toast.success("Canvas deleted successfully");
      
      // Refresh canvases list
      if (user) {
        await fetchUserCanvases(user.id);
      }
    } catch (error) {
      console.error("Error deleting canvas:", error);
      toast.error("Failed to delete canvas");
    } finally {
      setIsDeleting(false);
      setCanvasToDelete(null);
    }
  };

  const toggleCanvasVisibility = async (canvasId: string, currentVisibility: boolean) => {
    try {
      await updateCanvasVisibility(canvasId, !currentVisibility);
      toast.success(`Canvas is now ${!currentVisibility ? "public" : "private"}`);
      
      // Refresh canvases list
      if (user) {
        await fetchUserCanvases(user.id);
      }
    } catch (error) {
      console.error("Error toggling canvas visibility:", error);
      toast.error("Failed to update canvas visibility");
    }
  };

  const cancelDeleteCanvas = () => {
    setCanvasToDelete(null);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to view your profile");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  if (isLoading && !isInitialized) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
          <div className="text-sm text-muted-foreground">Loading your canvases...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-xl font-semibold text-primary-foreground">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">My Canvases</h2>
          <Button 
            className="bg-primary text-primary-foreground" 
            onClick={handleCreateCanvas}
            disabled={isCreatingCanvas}
          >
            <Plus className="mr-2 h-4 w-4" />
            {isCreatingCanvas ? "Creating..." : "Create New Canvas"}
          </Button>
        </div>

        {userCanvases.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <h3 className="text-lg font-medium">No canvases yet</h3>
            <p className="mt-2 text-muted-foreground">
              Create your first canvas to get started.
            </p>
            <Button 
              className="mt-4 bg-primary text-primary-foreground" 
              onClick={handleCreateCanvas}
              disabled={isCreatingCanvas}
            >
              <Plus className="mr-2 h-4 w-4" />
              {isCreatingCanvas ? "Creating..." : "Create New Canvas"}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCanvases.map((canvas) => (
              <div key={canvas.id} className="relative">
                <div className="absolute top-2 left-2 z-10">
                  <Badge variant={canvas.isPublic ? "default" : "secondary"} className="flex items-center gap-1">
                    {canvas.isPublic ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    {canvas.isPublic ? "Public" : "Private"}
                  </Badge>
                </div>
                <CanvasCard
                  id={canvas.id}
                  title={canvas.title}
                  description={canvas.description}
                  gradient={canvas.gradient}
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="p-2 bg-background"
                    onClick={() => toggleCanvasVisibility(canvas.id, canvas.isPublic === true)}
                    title={canvas.isPublic ? "Make private" : "Make public"}
                  >
                    {canvas.isPublic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="p-2"
                    onClick={() => handleDeleteCanvas(canvas.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Delete Canvas Confirmation Dialog */}
      <AlertDialog open={!!canvasToDelete} onOpenChange={(open) => !open && cancelDeleteCanvas()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this canvas?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the canvas and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteCanvas} disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteCanvas} 
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Canvas"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}