
/**
 * Service for handling canvas-related API operations with Supabase
 */

import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Canvas, CanvasContent } from '@/types/canvas.types';

/**
 * Fetch public canvases
 */
export const fetchCanvases = async (): Promise<Canvas[]> => {
  try {
    const { data, error } = await supabase
      .from('canvases')
      .select('*')
      .eq('is_public', true);

    if (error) {
      console.error('Error fetching canvases:', error);
      toast.error('Failed to load canvases');
      return [];
    }

    return data.map(canvas => ({
      id: canvas.id,
      title: canvas.title,
      description: canvas.description,
      gradient: canvas.gradient,
      userId: canvas.user_id,
      domain: canvas.domain || '',
      potentialUseCase: canvas.potential_use_case || '',
      domainData: canvas.domain_data || '',
      implications: canvas.implications || '',
      resources: canvas.resources || '',
      learners: canvas.learners || '',
      instructors: canvas.instructors || '',
      support: canvas.support || '',
      outcomes: canvas.outcomes || '',
      assessment: canvas.assessment || '',
      activities: canvas.activities || '',
      createdAt: canvas.created_at,
      updatedAt: canvas.updated_at,
      version: canvas.version || '1.0',
      isPublic: canvas.is_public,
      originalCanvasId: canvas.original_canvas_id,
    }));
  } catch (error) {
    console.error('Error in fetchCanvases:', error);
    toast.error('Failed to load canvases');
    return [];
  }
};

/**
 * Fetch canvases for a specific user
 */
export const fetchUserCanvases = async (userId: string): Promise<Canvas[]> => {
  try {
    // Validate that userId is a valid UUID format since Supabase requires it
    if (!isValidUuid(userId)) {
      console.error('Invalid user ID format:', userId);
      toast.error('Invalid user ID format');
      return [];
    }

    const { data, error } = await supabase
      .from('canvases')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user canvases:', error);
      toast.error('Failed to load your canvases');
      return [];
    }

    return data.map(canvas => ({
      id: canvas.id,
      title: canvas.title,
      description: canvas.description,
      userId: canvas.user_id,
      gradient: canvas.gradient,
      domain: canvas.domain || '',
      potentialUseCase: canvas.potential_use_case || '',
      domainData: canvas.domain_data || '',
      implications: canvas.implications || '',
      resources: canvas.resources || '',
      learners: canvas.learners || '',
      instructors: canvas.instructors || '',
      support: canvas.support || '',
      outcomes: canvas.outcomes || '',
      assessment: canvas.assessment || '',
      activities: canvas.activities || '',
      createdAt: canvas.created_at,
      updatedAt: canvas.updated_at,
      version: canvas.version || '1.0',
      isPublic: canvas.is_public,
      originalCanvasId: canvas.original_canvas_id,
    }));
  } catch (error) {
    console.error('Error in fetchUserCanvases:', error);
    toast.error('Failed to load your canvases');
    return [];
  }
};

/**
 * Fetch content for a specific canvas
 * This now just returns the canvas data fields as CanvasContent for compatibility
 */
export const fetchCanvasContent = async (canvasId: string): Promise<CanvasContent | null> => {
  try {
    const { data, error } = await supabase
      .from('canvases')
      .select('*')
      .eq('id', canvasId)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') { // Not found error
        console.error('Error fetching canvas content:', error);
        toast.error('Failed to load canvas content');
      }
      return null;
    }

    return {
      id: data.id,
      canvasId: data.id,
      domain: data.domain || '',
      potentialUseCase: data.potential_use_case || '',
      domainData: data.domain_data || '',
      implications: data.implications || '',
      resources: data.resources || '',
      learners: data.learners || '',
      instructors: data.instructors || '',
      support: data.support || '',
      outcomes: data.outcomes || '',
      assessment: data.assessment || '',
      activities: data.activities || '',
      originalCanvasId: data.original_canvas_id || '',
    };
  } catch (error) {
    console.error('Error in fetchCanvasContent:', error);
    toast.error('Failed to load canvas content');
    return null;
  }
};

/**
 * Save content for a specific canvas
 * For public canvases, this will create a copy with a count in the title if the user already has copies
 */
export const saveCanvasContent = async (content: CanvasContent, userId?: string, isPublic?: boolean): Promise<CanvasContent | null> => {
  try {
    if (!content.canvasId) {
      toast.error('Canvas ID is missing');
      return null;
    }

    // First check if this is a public canvas and user is authenticated
    if (userId) {
      // Validate that userId is a valid UUID format
      if (!isValidUuid(userId)) {
        console.error('Invalid user ID format:', userId);
        toast.error('User ID format is invalid, cannot create a copy');
        return null;
      }

      const { data: canvasData } = await supabase
        .from('canvases')
        .select('user_id, title, is_public')
        .eq('id', content.canvasId)
        .single();

      // If canvas doesn't belong to the user, always create a new copy
      if (canvasData && canvasData.user_id !== userId) {
        console.log("Creating a copy of canvas for user:", userId);

        // Check if user already has copies of this canvas by checking for similar titles
        const originalTitle = canvasData.title;
        const baseTitle = `Copy of ${originalTitle}`;

        const { data: existingCopies } = await supabase
          .from('canvases')
          .select('title')
          .eq('user_id', userId)
          .ilike('title', `${baseTitle}%`);


        // Determine the title for the new copy
        let newTitle = baseTitle;


        if (existingCopies && existingCopies.length > 0) {
          // Find the highest number in existing copies
          let highestCount = 0;

          for (const copy of existingCopies) {
            // Check if title contains a count in format "Copy of X (#)"
            const match = copy.title.match(/Copy of .+? \((\d+)\)$/);
            if (match && match[1]) {
              const count = parseInt(match[1], 10);
              if (!isNaN(count) && count > highestCount) {
                highestCount = count;
              }
            }
          }

          // Set the new title with incremented count
          newTitle = `${baseTitle} (${highestCount + 1})`;
        }
          

        const clonedCanvas = await cloneCanvas(
          content.canvasId,
          userId,
          content,
          newTitle,
          typeof isPublic !== 'undefined' ? isPublic : false // Default to private for new copies
        );

        if (clonedCanvas) {
          toast.success('Created your own copy of the canvas');
          return {
            id: clonedCanvas.id,
            canvasId: clonedCanvas.id,
            domain: clonedCanvas.domain || '',
            potentialUseCase: clonedCanvas.potentialUseCase || '',
            domainData: clonedCanvas.domainData || '',
            implications: clonedCanvas.implications || '',
            resources: clonedCanvas.resources || '',
            learners: clonedCanvas.learners || '',
            instructors: clonedCanvas.instructors || '',
            support: clonedCanvas.support || '',
            outcomes: clonedCanvas.outcomes || '',
            assessment: clonedCanvas.assessment || '',
            activities: clonedCanvas.activities || '',
            originalCanvasId: clonedCanvas.originalCanvasId || '',
          };
        }
        return null;
      }
    }

    // Regular update if it's the user's canvas
    const payload: any = {
      domain: content.domain,
      potential_use_case: content.potentialUseCase,
      domain_data: content.domainData,
      implications: content.implications,
      resources: content.resources,
      learners: content.learners,
      instructors: content.instructors,
      support: content.support,
      outcomes: content.outcomes,
      assessment: content.assessment,
      activities: content.activities,
      updated_at: new Date().toISOString(),
    };

    // Update isPublic if provided
    if (typeof isPublic !== 'undefined') {
      payload.is_public = isPublic;
    }

    const { data, error } = await supabase
      .from('canvases')
      .update(payload)
      .eq('id', content.canvasId)
      .select();

    if (error) {
      console.error('Error saving canvas content:', error);
      toast.error('Failed to save canvas content');
      return null;
    }

    toast.success('Canvas saved successfully');

    if (data && data[0]) {
      return {
        id: data[0].id,
        canvasId: data[0].id,
        domain: data[0].domain || '',
        potentialUseCase: data[0].potential_use_case || '',
        domainData: data[0].domain_data || '',
        implications: data[0].implications || '',
        resources: data[0].resources || '',
        learners: data[0].learners || '',
        instructors: data[0].instructors || '',
        support: data[0].support || '',
        outcomes: data[0].outcomes || '',
        assessment: data[0].assessment || '',
        activities: data[0].activities || '',
        originalCanvasId: data[0].original_canvas_id || '',
      };
    }

    return null;
  } catch (error) {
    console.error('Error in saveCanvasContent:', error);
    toast.error('Failed to save canvas content');
    return null;
  }
};

/**
 * Helper function to check if a string is a valid UUID
 */
const isValidUuid = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Clone a canvas for a specific user with optional content updates
 */
export const cloneCanvas = async (
  sourceCanvasId: string,
  userId: string,
  contentUpdates?: CanvasContent,
  customTitle?: string,
  isPublic: boolean = false
): Promise<Canvas | null> => {
  try {
    // Validate that userId is a valid UUID format
    if (!isValidUuid(userId)) {
      console.error('Invalid user ID format:', userId);
      toast.error('User ID format is invalid, cannot create a copy');
      return null;
    }

    // Fetch the source canvas
    const { data: sourceCanvas, error: fetchError } = await supabase
      .from('canvases')
      .select('*')
      .eq('id', sourceCanvasId)
      .single();

    if (fetchError) {
      console.error('Error fetching source canvas:', fetchError);
      toast.error('Failed to copy canvas');
      return null;
    }

    // Create a new canvas based on the source
    const newCanvas = {
      title: customTitle || `Copy of ${sourceCanvas.title}`,
      description: sourceCanvas.description,
      gradient: sourceCanvas.gradient,
      user_id: userId,
      version: sourceCanvas.version || '1.0',
      is_public: isPublic,
      domain: contentUpdates?.domain || sourceCanvas.domain || '',
      potential_use_case: contentUpdates?.potentialUseCase || sourceCanvas.potential_use_case || '',
      domain_data: contentUpdates?.domainData || sourceCanvas.domain_data || '',
      implications: contentUpdates?.implications || sourceCanvas.implications || '',
      resources: contentUpdates?.resources || sourceCanvas.resources || '',
      learners: contentUpdates?.learners || sourceCanvas.learners || '',
      instructors: contentUpdates?.instructors || sourceCanvas.instructors || '',
      support: contentUpdates?.support || sourceCanvas.support || '',
      outcomes: contentUpdates?.outcomes || sourceCanvas.outcomes || '',
      assessment: contentUpdates?.assessment || sourceCanvas.assessment || '',
      activities: contentUpdates?.activities || sourceCanvas.activities || '',
      original_canvas_id: sourceCanvasId // Add the original_canvas_id field
    };

    // Insert the new canvas
    const { data, error } = await supabase
      .from('canvases')
      .insert(newCanvas)
      .select();

    if (error) {
      console.error('Error cloning canvas:', error);
      toast.error('Failed to copy canvas');
      return null;
    }

    if (!data || !data[0]) {
      toast.error('Failed to copy canvas');
      return null;
    }

    // Return the new canvas
    return {
      id: data[0].id,
      title: data[0].title,
      description: data[0].description,
      userId: data[0].user_id,
      gradient: data[0].gradient,
      domain: data[0].domain || '',
      potentialUseCase: data[0].potential_use_case || '',
      domainData: data[0].domain_data || '',
      implications: data[0].implications || '',
      resources: data[0].resources || '',
      learners: data[0].learners || '',
      instructors: data[0].instructors || '',
      support: data[0].support || '',
      outcomes: data[0].outcomes || '',
      assessment: data[0].assessment || '',
      activities: data[0].activities || '',
      createdAt: data[0].created_at,
      updatedAt: data[0].updated_at,
      version: data[0].version || '1.0',
      isPublic: data[0].is_public,
      originalCanvasId: data[0].original_canvas_id // Include the original_canvas_id in the returned object
    };
  } catch (error) {
    console.error('Error in cloneCanvas:', error);
    toast.error('Failed to copy canvas');
    return null;
  }
};

/**
 * Add a new canvas
 */
export const addCanvas = async (canvas: Canvas): Promise<Canvas | null> => {
  try {
    const payload = {
      title: canvas.title,
      description: canvas.description,
      gradient: canvas.gradient,
      user_id: canvas.userId || null,
      version: canvas.version || '1.0',
      is_public: typeof canvas.isPublic !== 'undefined' ? canvas.isPublic : true,
      domain: canvas.domain || '',
      potential_use_case: canvas.potentialUseCase || '',
      domain_data: canvas.domainData || '',
      implications: canvas.implications || '',
      resources: canvas.resources || '',
      learners: canvas.learners || '',
      instructors: canvas.instructors || '',
      support: canvas.support || '',
      outcomes: canvas.outcomes || '',
      assessment: canvas.assessment || '',
      activities: canvas.activities || ''
    };

    const { data, error } = await supabase
      .from('canvases')
      .insert(payload)
      .select();

    if (error) {
      console.error('Error adding canvas:', error);
      toast.error('Failed to create canvas');
      return null;
    }

    toast.success('Canvas created successfully');

    return {
      id: data[0].id,
      title: data[0].title,
      description: data[0].description,
      userId: data[0].user_id,
      gradient: data[0].gradient,
      domain: data[0].domain || '',
      potentialUseCase: data[0].potential_use_case || '',
      domainData: data[0].domain_data || '',
      implications: data[0].implications || '',
      resources: data[0].resources || '',
      learners: data[0].learners || '',
      instructors: data[0].instructors || '',
      support: data[0].support || '',
      outcomes: data[0].outcomes || '',
      assessment: data[0].assessment || '',
      activities: data[0].activities || '',
      createdAt: data[0].created_at,
      updatedAt: data[0].updated_at,
      version: data[0].version || '1.0',
      isPublic: data[0].is_public,
      originalCanvasId: data[0].original_canvas_id,
    };
  } catch (error) {
    console.error('Error in addCanvas:', error);
    toast.error('Failed to create canvas');
    return null;
  }
};

/**
 * Remove a canvas
 */
export const removeCanvas = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('canvases')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error removing canvas:', error);
      toast.error('Failed to delete canvas');
      return false;
    }

    toast.success('Canvas deleted successfully');
    return true;
  } catch (error) {
    console.error('Error in removeCanvas:', error);
    toast.error('Failed to delete canvas');
    return false;
  }
};

/**
 * Update a canvas title
 */
export const updateCanvasTitle = async (id: string, title: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('canvases')
      .update({ title, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating canvas title:', error);
      toast.error('Failed to update canvas title');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateCanvasTitle:', error);
    toast.error('Failed to update canvas title');
    return false;
  }
};

/**
 * Update a canvas version
 */
export const updateCanvasVersion = async (id: string, version: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('canvases')
      .update({ version, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating canvas version:', error);
      toast.error('Failed to update canvas version');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateCanvasVersion:', error);
    toast.error('Failed to update canvas version');
    return false;
  }
};

/**
 * Update the public/private status of a canvas
 */
export const updateCanvasVisibility = async (id: string, isPublic: boolean): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('canvases')
      .update({
        is_public: isPublic,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating canvas visibility:', error);
      toast.error('Failed to update canvas visibility');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateCanvasVisibility:', error);
    toast.error('Failed to update canvas visibility');
    return false;
  }
};