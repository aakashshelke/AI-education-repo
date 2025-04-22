
/**
 * Canvas data types for the application
 */

export type Canvas = {
  id: string;
  title: string;
  description: string;
  userId?: string;
  gradient: number;
  domain?: string;
  potentialUseCase?: string;
  domainData?: string;
  implications?: string;
  resources?: string;
  learners?: string;
  instructors?: string;
  support?: string;
  outcomes?: string;
  assessment?: string;
  activities?: string;
  createdAt?: string;
  updatedAt?: string;
  version?: string;
  isPublic?: boolean;
  originalCanvasId?: string;
};

// For backward compatibility with existing code
export type CanvasContent = {
  id?: string;
  canvasId: string;
  domain: string;
  potentialUseCase: string;
  domainData: string;
  implications: string;
  resources: string;
  learners: string;
  instructors: string;
  support: string;
  outcomes: string;
  assessment: string;
  activities: string;
  originalCanvasId: string;
};