
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CanvasCard } from "@/components/CanvasCard";
import { useCanvasStore } from "@/store/canvas-store";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";

export default function HomePage() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { canvases, fetchCanvases, isLoading, addCanvas, fetchUserCanvases } = useCanvasStore();
  const navigate = useNavigate();
  const [isCreatingCanvas, setIsCreatingCanvas] = useState(false);
  const { user } = useAuth();

  // Fetch canvases on mount
  useEffect(() => {
    const loadCanvases = async () => {
      try {
        await fetchCanvases();
        setIsInitialized(true);
      } catch (error) {
        console.error("Error loading canvases:", error);
        toast.error("Failed to load canvases");
      }
    };

    loadCanvases();
  }, [fetchCanvases]);

  // Show welcome toast only after data is loaded
  useEffect(() => {
    if (isInitialized) {

    }
  }, [isInitialized]);


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

      // await addCanvas(newCanvas);
      const createdCanvas = await addCanvas(newCanvas);
      toast.success("New canvas created successfully");

      // Refresh user canvases to get the newly created canvas
      // await fetchUserCanvases(user.id);
      // Navigate directly to the newly created canvas for editing
      if (createdCanvas?.id) {
        navigate(`/canvas/${createdCanvas.id}`);
      }

      // Navigate to the profile page to see the new canvas
      // navigate("/mycanvases");
    } catch (error) {
      console.error("Error creating canvas:", error);
      toast.error("Failed to create new canvas");
    } finally {
      setIsCreatingCanvas(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
          <div className="text-sm text-muted-foreground">Loading canvases...</div>
        </div>
      </div>
    );
  }

  // Filter to only show public canvases
  const publicCanvases = canvases.filter(canvas => canvas.isPublic !== false);

  return (
    <div className="space-y-8 pb-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl text-center space-y-4"
      >
        <div className="flex items-center justify-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Educational AI Repository
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-[85%] mx-auto">
          Discover interactive AI learning resources, tutorials, and educational content
        </p>
      </motion.div>

      {/* New div for the button with horizontal lines */}
      {user && (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-full max-w-3xl border-t border-gray-300"></div>
          <Button
            className="bg-primary text-primary-foreground"
            onClick={handleCreateCanvas}
            disabled={isCreatingCanvas}
          >
            <Plus className="mr-2 h-4 w-4" />
            {isCreatingCanvas ? "Creating..." : "Create New Canvas"}
          </Button>
        
        <div className="w-full max-w-3xl border-t border-gray-300"></div>
      </div>)}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {publicCanvases.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium">No public canvases available</h3>
            <p className="mt-2 text-muted-foreground">
              Check back later or create your own canvas
            </p>
          </div>
        ) : (
          publicCanvases.map((canvas) => (
            <CanvasCard
              key={canvas.id}
              id={canvas.id}
              title={canvas.title}
              description={canvas.description}
              gradient={canvas.gradient}
            />
          ))
        )}
      </motion.div>
    </div>
  );
}