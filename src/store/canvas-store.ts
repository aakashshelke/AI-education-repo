
import { create } from 'zustand';
import { toast } from 'sonner';
import { Canvas, CanvasContent } from '@/types/canvas.types';
import * as CanvasService from '@/services/canvas.service';

interface CanvasState {
  canvases: Canvas[];
  userCanvases: Canvas[];
  currentCanvasContent: CanvasContent | null;
  isLoading: boolean;
  fetchCanvases: () => Promise<void>;
  fetchUserCanvases: (userId: string) => Promise<void>;
  fetchCanvasContent: (canvasId: string) => Promise<CanvasContent | null>;
  saveCanvasContent: (content: CanvasContent, userId?: string, isPublic?: boolean) => Promise<CanvasContent | null>;
  // addCanvas: (canvas: Canvas) => Promise<void>;
  addCanvas: (canvas: Canvas) => Promise<Canvas | null>;
  removeCanvas: (id: string) => Promise<void>;
  getCanvas: (id: string) => Canvas | undefined;
  getUserCanvases: (userId: string) => Canvas[];
  updateCanvasTitle: (id: string, title: string) => Promise<boolean>;
  updateCanvasVersion: (id: string, version: string) => Promise<boolean>;
  updateCanvasVisibility: (id: string, isPublic: boolean) => Promise<boolean>;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  canvases: [],
  userCanvases: [],
  currentCanvasContent: null,
  isLoading: false,
  
  fetchCanvases: async () => {
    try {
      set({ isLoading: true });
      const canvases = await CanvasService.fetchCanvases();
      set({ canvases, isLoading: false });
    } catch (error) {
      console.error('Error in fetchCanvases:', error);
      toast.error('Failed to load canvases');
      set({ isLoading: false });
    }
  },
  
  fetchUserCanvases: async (userId) => {
    try {
      set({ isLoading: true });
      const userCanvases = await CanvasService.fetchUserCanvases(userId);
      set({ userCanvases, isLoading: false });
    } catch (error) {
      console.error('Error in fetchUserCanvases:', error);
      toast.error('Failed to load your canvases');
      set({ isLoading: false });
    }
  },
  
  fetchCanvasContent: async (canvasId) => {
    try {
      const content = await CanvasService.fetchCanvasContent(canvasId);
      if (content) {
        set({ currentCanvasContent: content });
      }
      return content;
    } catch (error) {
      console.error('Error in fetchCanvasContent:', error);
      toast.error('Failed to load canvas content');
      return null;
    }
  },
  
  saveCanvasContent: async (content, userId, isPublic) => {
    try {
      const updatedContent = await CanvasService.saveCanvasContent(content, userId, isPublic);
      
      if (updatedContent) {
        set({ currentCanvasContent: updatedContent });
        
        if (userId) {
          const userCanvases = await CanvasService.fetchUserCanvases(userId);
          set({ userCanvases });
        }
      }
      
      return updatedContent;
    } catch (error) {
      console.error('Error in saveCanvasContent:', error);
      toast.error('Failed to save canvas content');
      return null;
    }
  },
  
  addCanvas: async (canvas) => {
    try {
      const newCanvas = await CanvasService.addCanvas(canvas);
      if (newCanvas) {
        set((state) => {
          if (canvas.userId) {
            return { userCanvases: [...state.userCanvases, newCanvas] };
          }
          return { canvases: [...state.canvases, newCanvas] };
        });
        return newCanvas;
      }
      return null;
    } catch (error) {
      console.error('Error in addCanvas:', error);
      toast.error('Failed to create canvas');
    }
    return null;

    
  },
  
  removeCanvas: async (id) => {
    try {
      const success = await CanvasService.removeCanvas(id);
      if (success) {
        set((state) => ({
          canvases: state.canvases.filter((c) => c.id !== id),
          userCanvases: state.userCanvases.filter((c) => c.id !== id),
        }));
      }
    } catch (error) {
      console.error('Error in removeCanvas:', error);
      toast.error('Failed to delete canvas');
    }
  },
  
  getCanvas: (id) => {
    const { canvases, userCanvases } = get();
    return [...canvases, ...userCanvases].find((c) => c.id === id);
  },
  
  getUserCanvases: (userId) => {
    return get().userCanvases.filter((c) => c.userId === userId);
  },
  
  updateCanvasTitle: async (id, title) => {
    try {
      const success = await CanvasService.updateCanvasTitle(id, title);
      if (success) {
        set((state) => ({
          canvases: state.canvases.map((c) => 
            c.id === id ? { ...c, title } : c
          ),
          userCanvases: state.userCanvases.map((c) => 
            c.id === id ? { ...c, title } : c
          ),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error in updateCanvasTitle:', error);
      toast.error('Failed to update canvas title');
      return false;
    }
  },
  
  updateCanvasVersion: async (id, version) => {
    try {
      const success = await CanvasService.updateCanvasVersion(id, version);
      if (success) {
        set((state) => ({
          canvases: state.canvases.map((c) => 
            c.id === id ? { ...c, version } : c
          ),
          userCanvases: state.userCanvases.map((c) => 
            c.id === id ? { ...c, version } : c
          ),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error in updateCanvasVersion:', error);
      toast.error('Failed to update canvas version');
      return false;
    }
  },
  
  updateCanvasVisibility: async (id, isPublic) => {
    try {
      const success = await CanvasService.updateCanvasVisibility(id, isPublic);
      if (success) {
        set((state) => ({
          canvases: state.canvases.map((c) => 
            c.id === id ? { ...c, isPublic } : c
          ),
          userCanvases: state.userCanvases.map((c) => 
            c.id === id ? { ...c, isPublic } : c
          ),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error in updateCanvasVisibility:', error);
      toast.error('Failed to update canvas visibility');
      return false;
    }
  },
}));

export type { Canvas, CanvasContent };