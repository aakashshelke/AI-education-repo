// export type Json =
//   | string
//   | number
//   | boolean
//   | null
//   | { [key: string]: Json | undefined }
//   | Json[]

// export type Database = {
//   public: {
//     Tables: {
//       canvas_content_old: {
//         Row: {
//           activities: string | null
//           assessment: string | null
//           canvas_id: string
//           created_at: string | null
//           domain: string | null
//           domain_data: string | null
//           id: string
//           implications: string | null
//           instructors: string | null
//           learners: string | null
//           outcomes: string | null
//           potential_use_case: string | null
//           resources: string | null
//           support: string | null
//           updated_at: string | null
//         }
//         Insert: {
//           activities?: string | null
//           assessment?: string | null
//           canvas_id: string
//           created_at?: string | null
//           domain?: string | null
//           domain_data?: string | null
//           id?: string
//           implications?: string | null
//           instructors?: string | null
//           learners?: string | null
//           outcomes?: string | null
//           potential_use_case?: string | null
//           resources?: string | null
//           support?: string | null
//           updated_at?: string | null
//         }
//         Update: {
//           activities?: string | null
//           assessment?: string | null
//           canvas_id?: string
//           created_at?: string | null
//           domain?: string | null
//           domain_data?: string | null
//           id?: string
//           implications?: string | null
//           instructors?: string | null
//           learners?: string | null
//           outcomes?: string | null
//           potential_use_case?: string | null
//           resources?: string | null
//           support?: string | null
//           updated_at?: string | null
//         }
//         Relationships: [
//           {
//             foreignKeyName: "canvas_content_canvas_id_fkey"
//             columns: ["canvas_id"]
//             isOneToOne: false
//             referencedRelation: "canvases_old"
//             referencedColumns: ["id"]
//           },
//         ]
//       }
//       canvases: {
//         Row: {
//           activities: string | null
//           assessment: string | null
//           created_at: string | null
//           description: string
//           domain: string | null
//           domain_data: string | null
//           gradient: number
//           id: string
//           implications: string | null
//           instructors: string | null
//           learners: string | null
//           outcomes: string | null
//           potential_use_case: string | null
//           resources: string | null
//           support: string | null
//           title: string
//           updated_at: string | null
//           user_id: string | null
//           version: string | null
//         }
//         Insert: {
//           activities?: string | null
//           assessment?: string | null
//           created_at?: string | null
//           description: string
//           domain?: string | null
//           domain_data?: string | null
//           gradient?: number
//           id?: string
//           implications?: string | null
//           instructors?: string | null
//           learners?: string | null
//           outcomes?: string | null
//           potential_use_case?: string | null
//           resources?: string | null
//           support?: string | null
//           title: string
//           updated_at?: string | null
//           user_id?: string | null
//           version?: string | null
//         }
//         Update: {
//           activities?: string | null
//           assessment?: string | null
//           created_at?: string | null
//           description?: string
//           domain?: string | null
//           domain_data?: string | null
//           gradient?: number
//           id?: string
//           implications?: string | null
//           instructors?: string | null
//           learners?: string | null
//           outcomes?: string | null
//           potential_use_case?: string | null
//           resources?: string | null
//           support?: string | null
//           title?: string
//           updated_at?: string | null
//           user_id?: string | null
//           version?: string | null
//         }
//         Relationships: []
//       }
//       canvases_old: {
//         Row: {
//           created_at: string | null
//           description: string
//           gradient: number
//           id: string
//           title: string
//           updated_at: string | null
//           user_id: string | null
//         }
//         Insert: {
//           created_at?: string | null
//           description: string
//           gradient?: number
//           id?: string
//           title: string
//           updated_at?: string | null
//           user_id?: string | null
//         }
//         Update: {
//           created_at?: string | null
//           description?: string
//           gradient?: number
//           id?: string
//           title?: string
//           updated_at?: string | null
//           user_id?: string | null
//         }
//         Relationships: []
//       }
//     }
//     Views: {
//       [_ in never]: never
//     }
//     Functions: {
//       [_ in never]: never
//     }
//     Enums: {
//       [_ in never]: never
//     }
//     CompositeTypes: {
//       [_ in never]: never
//     }
//   }
// }

// type DefaultSchema = Database[Extract<keyof Database, "public">]

// export type Tables<
//   DefaultSchemaTableNameOrOptions extends
//     | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
//     | { schema: keyof Database },
//   TableName extends DefaultSchemaTableNameOrOptions extends {
//     schema: keyof Database
//   }
//     ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
//         Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
//     : never = never,
// > = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
//   ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
//       Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
//       Row: infer R
//     }
//     ? R
//     : never
//   : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
//         DefaultSchema["Views"])
//     ? (DefaultSchema["Tables"] &
//         DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
//         Row: infer R
//       }
//       ? R
//       : never
//     : never

// export type TablesInsert<
//   DefaultSchemaTableNameOrOptions extends
//     | keyof DefaultSchema["Tables"]
//     | { schema: keyof Database },
//   TableName extends DefaultSchemaTableNameOrOptions extends {
//     schema: keyof Database
//   }
//     ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
//     : never = never,
// > = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
//   ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
//       Insert: infer I
//     }
//     ? I
//     : never
//   : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
//     ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
//         Insert: infer I
//       }
//       ? I
//       : never
//     : never

// export type TablesUpdate<
//   DefaultSchemaTableNameOrOptions extends
//     | keyof DefaultSchema["Tables"]
//     | { schema: keyof Database },
//   TableName extends DefaultSchemaTableNameOrOptions extends {
//     schema: keyof Database
//   }
//     ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
//     : never = never,
// > = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
//   ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
//       Update: infer U
//     }
//     ? U
//     : never
//   : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
//     ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
//         Update: infer U
//       }
//       ? U
//       : never
//     : never

// export type Enums<
//   DefaultSchemaEnumNameOrOptions extends
//     | keyof DefaultSchema["Enums"]
//     | { schema: keyof Database },
//   EnumName extends DefaultSchemaEnumNameOrOptions extends {
//     schema: keyof Database
//   }
//     ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
//     : never = never,
// > = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
//   ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
//   : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
//     ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
//     : never

// export type CompositeTypes<
//   PublicCompositeTypeNameOrOptions extends
//     | keyof DefaultSchema["CompositeTypes"]
//     | { schema: keyof Database },
//   CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
//     schema: keyof Database
//   }
//     ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
//     : never = never,
// > = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
//   : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
//     ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
//     : never

// export const Constants = {
//   public: {
//     Enums: {},
//   },
// } as const


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