export type Database = {
  public: {
    Tables: {
      canvas_content_old: {
        Row: {
          activities: string | null
          assessment: string | null
          canvas_id: string
          created_at: string | null
          domain: string | null
          domain_data: string | null
          id: string
          implications: string | null
          instructors: string | null
          learners: string | null
          outcomes: string | null
          potential_use_case: string | null
          resources: string | null
          support: string | null
          updated_at: string | null
        }
        Insert: {
          activities?: string | null
          assessment?: string | null
          canvas_id: string
          created_at?: string | null
          domain?: string | null
          domain_data?: string | null
          id?: string
          implications?: string | null
          instructors?: string | null
          learners?: string | null
          outcomes?: string | null
          potential_use_case?: string | null
          resources?: string | null
          support?: string | null
          updated_at?: string | null
        }
        Update: {
          activities?: string | null
          assessment?: string | null
          canvas_id?: string
          created_at?: string | null
          domain?: string | null
          domain_data?: string | null
          id?: string
          implications?: string | null
          instructors?: string | null
          learners?: string | null
          outcomes?: string | null
          potential_use_case?: string | null
          resources?: string | null
          support?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "canvas_content_canvas_id_fkey"
            columns: ["canvas_id"]
            isOneToOne: false
            referencedRelation: "canvases_old"
            referencedColumns: ["id"]
          },
        ]
      }
      canvases: {
        Row: {
          activities: string | null
          assessment: string | null
          created_at: string | null
          description: string
          domain: string | null
          domain_data: string | null
          gradient: number
          id: string
          implications: string | null
          instructors: string | null
          is_public: boolean
          learners: string | null
          original_canvas_id: string | null
          outcomes: string | null
          potential_use_case: string | null
          resources: string | null
          support: string | null
          title: string
          updated_at: string | null
          user_id: string | null
          version: string | null
        }
        Insert: {
          activities?: string | null
          assessment?: string | null
          created_at?: string | null
          description: string
          domain?: string | null
          domain_data?: string | null
          gradient?: number
          id?: string
          implications?: string | null
          instructors?: string | null
          is_public?: boolean
          learners?: string | null
          original_canvas_id?: string | null
          outcomes?: string | null
          potential_use_case?: string | null
          resources?: string | null
          support?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
          version?: string | null
        }
        Update: {
          activities?: string | null
          assessment?: string | null
          created_at?: string | null
          description?: string
          domain?: string | null
          domain_data?: string | null
          gradient?: number
          id?: string
          implications?: string | null
          instructors?: string | null
          is_public?: boolean
          learners?: string | null
          original_canvas_id?: string | null
          outcomes?: string | null
          potential_use_case?: string | null
          resources?: string | null
          support?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "canvases_original_canvas_id_fkey"
            columns: ["original_canvas_id"]
            isOneToOne: false
            referencedRelation: "canvases"
            referencedColumns: ["id"]
          },
        ]
      }
      canvases_old: {
        Row: {
          created_at: string | null
          description: string
          gradient: number
          id: string
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          gradient?: number
          id?: string
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          gradient?: number
          id?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]
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
};