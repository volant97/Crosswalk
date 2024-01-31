export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chat_room: {
        Row: {
          flirting_list_id: number
          id: string
        }
        Insert: {
          flirting_list_id: number
          id?: string
        }
        Update: {
          flirting_list_id?: number
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_room_flirting_list_id_fkey"
            columns: ["flirting_list_id"]
            isOneToOne: true
            referencedRelation: "flirting_list"
            referencedColumns: ["id"]
          }
        ]
      }
      contact: {
        Row: {
          category: string | null
          content: string | null
          created_at: string
          email: string | null
          email_agree: boolean | null
          gender: Database["public"]["Enums"]["GenderType"] | null
          id: number
          is_solved: boolean
          name: string | null
          uid: string | null
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string
          email?: string | null
          email_agree?: boolean | null
          gender?: Database["public"]["Enums"]["GenderType"] | null
          id?: number
          is_solved?: boolean
          name?: string | null
          uid?: string | null
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string
          email?: string | null
          email_agree?: boolean | null
          gender?: Database["public"]["Enums"]["GenderType"] | null
          id?: number
          is_solved?: boolean
          name?: string | null
          uid?: string | null
        }
        Relationships: []
      }
      custom_users: {
        Row: {
          age: number | null
          avatar: number | null
          gender: Database["public"]["Enums"]["GenderType"] | null
          height: number | null
          information_agreement: boolean | null
          information_use_period: string | null
          interest: Json | null
          mbti: string | null
          name: string | null
          uid: string
          user_img: string | null
        }
        Insert: {
          age?: number | null
          avatar?: number | null
          gender?: Database["public"]["Enums"]["GenderType"] | null
          height?: number | null
          information_agreement?: boolean | null
          information_use_period?: string | null
          interest?: Json | null
          mbti?: string | null
          name?: string | null
          uid: string
          user_img?: string | null
        }
        Update: {
          age?: number | null
          avatar?: number | null
          gender?: Database["public"]["Enums"]["GenderType"] | null
          height?: number | null
          information_agreement?: boolean | null
          information_use_period?: string | null
          interest?: Json | null
          mbti?: string | null
          name?: string | null
          uid?: string
          user_img?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_users_uid_fkey"
            columns: ["uid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      flirting_list: {
        Row: {
          created_at: string
          first_message_trigger: boolean | null
          flirting_message: string
          id: number
          receiver_is_read_in_noti: boolean | null
          receiver_uid: string
          sender_is_read_in_noti: boolean | null
          sender_uid: string
          status: Database["public"]["Enums"]["STATUS Type"]
        }
        Insert: {
          created_at: string
          first_message_trigger?: boolean | null
          flirting_message: string
          id?: number
          receiver_is_read_in_noti?: boolean | null
          receiver_uid: string
          sender_is_read_in_noti?: boolean | null
          sender_uid: string
          status?: Database["public"]["Enums"]["STATUS Type"]
        }
        Update: {
          created_at?: string
          first_message_trigger?: boolean | null
          flirting_message?: string
          id?: number
          receiver_is_read_in_noti?: boolean | null
          receiver_uid?: string
          sender_is_read_in_noti?: boolean | null
          sender_uid?: string
          status?: Database["public"]["Enums"]["STATUS Type"]
        }
        Relationships: [
          {
            foreignKeyName: "flirting_list_receiver_uid_fkey"
            columns: ["receiver_uid"]
            isOneToOne: false
            referencedRelation: "custom_users"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "flirting_list_sender_uid_fkey"
            columns: ["sender_uid"]
            isOneToOne: false
            referencedRelation: "custom_users"
            referencedColumns: ["uid"]
          }
        ]
      }
      message: {
        Row: {
          another_continual_count: number
          another_score: number
          created_at: string
          favorable_rating: number
          id: number
          is_read: boolean
          message: string
          subscribe_room_id: string
          user_continual_count: number
          user_score: number
          user_uid: string
        }
        Insert: {
          another_continual_count?: number
          another_score?: number
          created_at?: string
          favorable_rating?: number
          id?: number
          is_read?: boolean
          message: string
          subscribe_room_id: string
          user_continual_count?: number
          user_score?: number
          user_uid?: string
        }
        Update: {
          another_continual_count?: number
          another_score?: number
          created_at?: string
          favorable_rating?: number
          id?: number
          is_read?: boolean
          message?: string
          subscribe_room_id?: string
          user_continual_count?: number
          user_score?: number
          user_uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_subscribe_room_id_fkey"
            columns: ["subscribe_room_id"]
            isOneToOne: false
            referencedRelation: "chat_room"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      GenderType: "M" | "F"
      "STATUS Type": "UNREAD" | "READ" | "DECLINE" | "ACCEPT" | "SOULMATE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
