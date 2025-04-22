
import { useState, useEffect } from "react";
import { 
  Users, BookOpen, GraduationCap, Database, Code, CircleHelp,
  ShieldAlert, Library, Target, Cog, Route, PaintBucket,
  Edit, Save, EyeIcon, EyeOffIcon,
  ExternalLink
} from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { CanvasSection } from "./CanvasSection";
import { CanvasItem } from "./CanvasItem";
import { useCanvasStore, CanvasContent } from "@/store/canvas-store";
import { useAuth } from "@/context/auth-context";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/utils/supabase";

interface AICoursePlanningCanvasProps {
  isEditing?: boolean;
  onSave?: (content: CanvasContent, title?: string, version?: string, isPublic?: boolean) => void;
  onTitleChange?: (title: string) => void;
  onVersionChange?: (version: string) => void;
  onVisibilityChange?: (isPublic: boolean) => void;
}

export function AICoursePlanningCanvas({ 
  isEditing = false, 
  onSave,
  onTitleChange,
  onVersionChange,
  onVisibilityChange
}: AICoursePlanningCanvasProps) {
  const { id } = useParams<{ id: string }>();
  const { fetchCanvasContent, saveCanvasContent, currentCanvasContent, getCanvas } = useCanvasStore();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [canvasData, setCanvasData] = useState<ReturnType<typeof getCanvas>>(undefined);
  const [values, setValues] = useState<CanvasContent>({
    canvasId: id || '',
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
    originalCanvasId: "",
  });
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [currentVersion, setCurrentVersion] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [authorName, setAuthorName] = useState<string>("");

  useEffect(() => {
    if (id) {
      const loadCanvasContent = async () => {
        setIsLoading(true);
        try {
          const content = await fetchCanvasContent(id);
          if (content) {
            setValues(content);
          }
          
          const canvas = getCanvas(id);
          setCanvasData(canvas);
          
          if (canvas) {
            setCurrentTitle(canvas.title || "");
            setCurrentVersion(canvas.version || "1.0");
            setIsPublic(canvas.isPublic !== undefined ? canvas.isPublic : true);
          }
          console.log(canvas)
        } catch (error) {
          console.error("Error loading canvas content:", error);
          toast.error("Failed to load canvas content");
        } finally {
          setIsLoading(false);
        }
      };
      
      loadCanvasContent();
    }
  }, [id, fetchCanvasContent, getCanvas]);

  useEffect(() => {
    const fetchAuthorName = async () => {
      if (canvasData) {
        try {
          const { data: userData, error } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', canvasData.userId)
            .single();

          if (userData?.name) {
            setAuthorName(userData.name);
          } else if (error) {
            console.error('Error fetching author name:', error);
          }
        } catch (error) {
          console.error('Error fetching author name:', error);
        }
      }
    };

    fetchAuthorName();
  }, [canvasData?.userId]);

  const handleValueChange = (key: keyof CanvasContent, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleTitleChange = (newTitle: string) => {
    setCurrentTitle(newTitle);
    if (onTitleChange) {
      onTitleChange(newTitle);
    }
    setHasUnsavedChanges(true);
  };

  const handleVersionChange = (newVersion: string) => {
    setCurrentVersion(newVersion);
    if (onVersionChange) {
      onVersionChange(newVersion);
    }
    setHasUnsavedChanges(true);
  };

  const handleVisibilityChange = (newIsPublic: boolean) => {
    setIsPublic(newIsPublic);
    if (onVisibilityChange) {
      onVisibilityChange(newIsPublic);
    }
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    if (id && hasUnsavedChanges) {
      try {
        if (onSave) {
          onSave(values, currentTitle, currentVersion, isPublic);
        } else {
          await saveCanvasContent({
            ...values,
            canvasId: id
          }, user?.id, isPublic);
        }
        setHasUnsavedChanges(false);
      } catch (error) {
        console.error("Error saving canvas content:", error);
        toast.error("Failed to save canvas content");
      }
    }
  };

  useEffect(() => {
    if (!isEditing && !isLoading && id && hasUnsavedChanges) {
      handleSave();
    }
  }, [isEditing, id, isLoading, hasUnsavedChanges]);

  if (isLoading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
          <div className="text-sm text-muted-foreground">Loading canvas content...</div>
        </div>
      </div>
    );
  }

  const formattedDate = canvasData?.createdAt 
    ? format(new Date(canvasData.createdAt), 'yyyy-MM-dd')
    : undefined;
    console.log(canvasData.originalCanvasId)

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Integrated Canvas Header */}
      <div className="canvas-header mb-8 p-4 bg-muted/30 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">The AI Course Design Planning Framework</h1>
          </div>
          {isEditing && (
            <div className="mt-2 md:mt-0 flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <div className="space-y-2">
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Course</span>
                {isEditing ? (
                  <Input
                    type="text"
                    value={currentTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter course title"
                    className="h-9"
                  />
                ) : (
                  <span className="font-medium">{currentTitle || canvasData?.title || "Introduction to AI"}</span>
                )}
              </div>
              
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Author</span>
                <span className="font-medium">{authorName || "Anonymous"}</span>
              </div>
              
              
              {isEditing && user && (
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="canvas-visibility"
                    checked={isPublic}
                    onCheckedChange={handleVisibilityChange}
                  />
                  <Label htmlFor="canvas-visibility" className="flex items-center cursor-pointer">
                    {isPublic ? (
                      <>
                        <EyeIcon className="h-4 w-4 mr-1" />
                        <span>Public</span>
                      </>
                    ) : (
                      <>
                        <EyeOffIcon className="h-4 w-4 mr-1" />
                        <span>Private</span>
                      </>
                    )}
                  </Label>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="space-y-2">
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Version</span>
                {isEditing ? (
                  <Input
                    type="text"
                    value={currentVersion}
                    onChange={(e) => handleVersionChange(e.target.value)}
                    placeholder="Enter version"
                    className="h-9"
                  />
                ) : (
                  <span className="font-medium">{currentVersion || canvasData?.version || "1.0"}</span>
                )}
              </div>
              
              {formattedDate && (
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <span className="font-medium">{formattedDate}</span>
                </div>
              )}
              
              {!isEditing && user && canvasData?.userId === user?.id && (
                <div className="flex items-center space-x-2 pt-2">
                  <div className="flex items-center space-x-1 text-sm">
                    <span className="text-muted-foreground">Visibility:</span>
                    {canvasData?.isPublic ? (
                      <span className="flex items-center">
                        <EyeIcon className="h-4 w-4 mr-1 text-green-500" />
                        Public
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <EyeOffIcon className="h-4 w-4 mr-1 text-amber-500" />
                        Private
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-4">
          <CanvasSection
            title="AI in the Domain"
            number="1"
            icon={<Code size={18} />}
          >
            <CanvasItem
              title="Domain"
              description="With which domain is the course associated?"
              icon={<PaintBucket size={16} />}
              isEditing={isEditing}
              value={values.domain}
              onChange={(value) => handleValueChange("domain", value)}
            />
            
            <CanvasItem
              title="Potential AI Use Cases"
              description="What are potential use cases of using AI in the domain?"
              icon={<CircleHelp size={16} />}
              isEditing={isEditing}
              value={values.potentialUseCase}
              onChange={(value) => handleValueChange("potentialUseCase", value)}
            />

            <CanvasItem
              title="Data in the Domain"
              description="What type of data is most common in the domain? Is data in the domain abundant or scarce?"
              icon={<Database size={16} />}
              isEditing={isEditing}
              value={values.domainData}
              onChange={(value) => handleValueChange("domainData", value)}
            />

            <CanvasItem
              title="Implications of using AI in the Domain"
              description="What implications (ethical, legal, social) does the use of AI have in the domain / the use case?"
              icon={<ShieldAlert size={16} />}
              isEditing={isEditing}
              value={values.implications}
              onChange={(value) => handleValueChange("implications", value)}
            />

            <CanvasItem
              title="Additional Learning Resources"
              description="What additional (external) material or resources could be used? What Open Educational Resources could be helpful?"
              icon={<Library size={16} />}
              isEditing={isEditing}
              value={values.resources}
              onChange={(value) => handleValueChange("resources", value)}
            />
          </CanvasSection>
        </div>

        <div className="space-y-4">
          <CanvasSection
            title="Learning Environment"
            number="2"
            icon={<BookOpen size={18} />}
          >
            <CanvasItem
              title="Learners and their Interaction with AI"
              description="What existing AI knowledge and skills do the learners have? What other related skills and knowledge do the learners have? What role in the AI interaction are learners supposed to take after completing the course?"
              icon={<Users size={16} />}
              isEditing={isEditing}
              value={values.learners}
              onChange={(value) => handleValueChange("learners", value)}
            />

            <CanvasItem
              title="Instructors"
              description="What AI-related skills and competencies do the instructors have?"
              icon={<GraduationCap size={16} />}
              isEditing={isEditing}
              value={values.instructors}
              onChange={(value) => handleValueChange("instructors", value)}
            />

            <CanvasItem
              title="Internal Support"
              description="What time and AI-related resources are available? What AI-related data is available for the course? What support does the institution or the network provide?"
              icon={<Cog size={16} />}
              isEditing={isEditing}
              value={values.support}
              onChange={(value) => handleValueChange("support", value)}
            />
          </CanvasSection>
        </div>

        <div className="space-y-4">
          <CanvasSection
            title="Course Implementation"
            number="3"
            icon={<Route size={18} />}
          >
            <CanvasItem
              title="Learning Outcomes"
              description="What are the relevant learning outcomes of the course?"
              icon={<Target size={16} />}
              isEditing={isEditing}
              value={values.outcomes}
              onChange={(value) => handleValueChange("outcomes", value)}
            />

            <CanvasItem
              title="Assessment"
              description="How will the learning outcomes be assessed?"
              icon={<BookOpen size={16} />}
              isEditing={isEditing}
              value={values.assessment}
              onChange={(value) => handleValueChange("assessment", value)}
            />

            <CanvasItem
              title="Learning Activities"
              description="What learning activities will be included in the course? What didactical approach will be taken?"
              icon={<BookOpen size={16} />}
              isEditing={isEditing}
              value={values.activities}
              onChange={(value) => handleValueChange("activities", value)}
            />
          </CanvasSection>
        </div>
      </div>

      {canvasData.originalCanvasId ? (<div className="flex items-center justify-center mt-8 text-sm text-muted-foreground">
          <p>
            This is a copy of{" "}
            <a
              href={`/canvas/${canvasData.originalCanvasId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center"
            >
              
              {/* {originalCanvasTitle} */}
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </p>
          
        </div>) : (<div></div>)
        }
      
        
    </div>
  );
}