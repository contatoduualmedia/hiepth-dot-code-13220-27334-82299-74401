export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      artist_mercado_pago_accounts: {
        Row: {
          access_token: string
          artist_id: string
          created_at: string | null
          id: string
          is_active: boolean | null
          mercado_pago_user_id: string
          updated_at: string | null
        }
        Insert: {
          access_token: string
          artist_id: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          mercado_pago_user_id: string
          updated_at?: string | null
        }
        Update: {
          access_token?: string
          artist_id?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          mercado_pago_user_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artist_mercado_pago_accounts_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          message_type: string | null
          show_id: string | null
          song_title: string | null
          tip_amount: number | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          message_type?: string | null
          show_id?: string | null
          song_title?: string | null
          tip_amount?: number | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          message_type?: string | null
          show_id?: string | null
          song_title?: string | null
          tip_amount?: number | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_show_id_fkey"
            columns: ["show_id"]
            isOneToOne: false
            referencedRelation: "shows"
            referencedColumns: ["id"]
          },
        ]
      }
      followers: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "followers_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "followers_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mercado_pago_credentials: {
        Row: {
          access_token: string | null
          artist_id: string | null
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          refresh_token: string | null
          updated_at: string
          user_id_mp: string | null
        }
        Insert: {
          access_token?: string | null
          artist_id?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          refresh_token?: string | null
          updated_at?: string
          user_id_mp?: string | null
        }
        Update: {
          access_token?: string | null
          artist_id?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          refresh_token?: string | null
          updated_at?: string
          user_id_mp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mercado_pago_credentials_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          artist_amount: number | null
          artist_id: string | null
          created_at: string
          id: string
          payment_id: string | null
          payment_method: string | null
          platform_fee_amount: number | null
          processed_at: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          artist_amount?: number | null
          artist_id?: string | null
          created_at?: string
          id?: string
          payment_id?: string | null
          payment_method?: string | null
          platform_fee_amount?: number | null
          processed_at?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          artist_amount?: number | null
          artist_id?: string | null
          created_at?: string
          id?: string
          payment_id?: string | null
          payment_method?: string | null
          platform_fee_amount?: number | null
          processed_at?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pix_split_transactions: {
        Row: {
          artist_amount: number | null
          artist_id: string
          created_at: string | null
          expires_at: string | null
          external_reference: string | null
          id: string
          paid_at: string | null
          payer_email: string | null
          payer_name: string | null
          payment_method: string | null
          platform_fee: number | null
          qr_code: string | null
          qr_code_base64: string | null
          show_id: string | null
          status: string | null
          total_amount: number
          txid: string
          updated_at: string | null
        }
        Insert: {
          artist_amount?: number | null
          artist_id: string
          created_at?: string | null
          expires_at?: string | null
          external_reference?: string | null
          id?: string
          paid_at?: string | null
          payer_email?: string | null
          payer_name?: string | null
          payment_method?: string | null
          platform_fee?: number | null
          qr_code?: string | null
          qr_code_base64?: string | null
          show_id?: string | null
          status?: string | null
          total_amount: number
          txid: string
          updated_at?: string | null
        }
        Update: {
          artist_amount?: number | null
          artist_id?: string
          created_at?: string | null
          expires_at?: string | null
          external_reference?: string | null
          id?: string
          paid_at?: string | null
          payer_email?: string | null
          payer_name?: string | null
          payment_method?: string | null
          platform_fee?: number | null
          qr_code?: string | null
          qr_code_base64?: string | null
          show_id?: string | null
          status?: string | null
          total_amount?: number
          txid?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pix_split_transactions_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pix_split_transactions_show_id_fkey"
            columns: ["show_id"]
            isOneToOne: false
            referencedRelation: "shows"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_payment_settings: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          mercado_pago_user_id: string | null
          platform_fee_percentage: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          mercado_pago_user_id?: string | null
          platform_fee_percentage?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          mercado_pago_user_id?: string | null
          platform_fee_percentage?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      platform_settings: {
        Row: {
          created_at: string
          id: string
          mercado_pago_access_token: string | null
          setting_key: string
          setting_value: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          mercado_pago_access_token?: string | null
          setting_key: string
          setting_value?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          mercado_pago_access_token?: string | null
          setting_key?: string
          setting_value?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      playlist_songs: {
        Row: {
          created_at: string
          id: string
          playlist_id: string | null
          position: number | null
          song_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          playlist_id?: string | null
          position?: number | null
          song_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          playlist_id?: string | null
          position?: number | null
          song_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "playlist_songs_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_songs_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["id"]
          },
        ]
      }
      playlists: {
        Row: {
          artist_id: string | null
          created_at: string
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          artist_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          artist_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "playlists_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          bio: string | null
          city: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          location: string | null
          mercado_pago_access_token: string | null
          phone: string | null
          pix_key: string | null
          role: string | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          location?: string | null
          mercado_pago_access_token?: string | null
          phone?: string | null
          pix_key?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          location?: string | null
          mercado_pago_access_token?: string | null
          phone?: string | null
          pix_key?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          artist_id: string
          comment: string | null
          created_at: string | null
          id: string
          rating: number | null
          user_id: string
        }
        Insert: {
          artist_id: string
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          user_id: string
        }
        Update: {
          artist_id?: string
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      shows: {
        Row: {
          artist_id: string | null
          created_at: string
          date_time: string | null
          description: string | null
          id: string
          is_live: boolean | null
          live_code: string | null
          location: string | null
          name: string | null
          started_at: string | null
          status: string | null
          title: string
          updated_at: string
          username_code: string | null
          venue: string | null
        }
        Insert: {
          artist_id?: string | null
          created_at?: string
          date_time?: string | null
          description?: string | null
          id?: string
          is_live?: boolean | null
          live_code?: string | null
          location?: string | null
          name?: string | null
          started_at?: string | null
          status?: string | null
          title: string
          updated_at?: string
          username_code?: string | null
          venue?: string | null
        }
        Update: {
          artist_id?: string | null
          created_at?: string
          date_time?: string | null
          description?: string | null
          id?: string
          is_live?: boolean | null
          live_code?: string | null
          location?: string | null
          name?: string | null
          started_at?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          username_code?: string | null
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shows_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      song_requests: {
        Row: {
          created_at: string
          custom_song_title: string | null
          id: string
          message: string | null
          position_in_queue: number | null
          requested_at: string | null
          requester_name: string | null
          show_id: string | null
          song_id: string | null
          status: string | null
          tip_amount: number | null
        }
        Insert: {
          created_at?: string
          custom_song_title?: string | null
          id?: string
          message?: string | null
          position_in_queue?: number | null
          requested_at?: string | null
          requester_name?: string | null
          show_id?: string | null
          song_id?: string | null
          status?: string | null
          tip_amount?: number | null
        }
        Update: {
          created_at?: string
          custom_song_title?: string | null
          id?: string
          message?: string | null
          position_in_queue?: number | null
          requested_at?: string | null
          requester_name?: string | null
          show_id?: string | null
          song_id?: string | null
          status?: string | null
          tip_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "song_requests_show_id_fkey"
            columns: ["show_id"]
            isOneToOne: false
            referencedRelation: "shows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "song_requests_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["id"]
          },
        ]
      }
      songs: {
        Row: {
          album: string | null
          artist: string
          artist_id: string | null
          chords: string | null
          cover_url: string | null
          created_at: string
          deezer_id: string | null
          duration: number | null
          genre: string | null
          id: string
          is_available: boolean | null
          key: string | null
          lyrics: string | null
          original_key: string | null
          preview_url: string | null
          spotify_id: string | null
          title: string
          updated_at: string
          user_id: string | null
          youtube_url: string | null
        }
        Insert: {
          album?: string | null
          artist: string
          artist_id?: string | null
          chords?: string | null
          cover_url?: string | null
          created_at?: string
          deezer_id?: string | null
          duration?: number | null
          genre?: string | null
          id?: string
          is_available?: boolean | null
          key?: string | null
          lyrics?: string | null
          original_key?: string | null
          preview_url?: string | null
          spotify_id?: string | null
          title: string
          updated_at?: string
          user_id?: string | null
          youtube_url?: string | null
        }
        Update: {
          album?: string | null
          artist?: string
          artist_id?: string | null
          chords?: string | null
          cover_url?: string | null
          created_at?: string
          deezer_id?: string | null
          duration?: number | null
          genre?: string | null
          id?: string
          is_available?: boolean | null
          key?: string | null
          lyrics?: string | null
          original_key?: string | null
          preview_url?: string | null
          spotify_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string | null
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "songs_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      split_transactions: {
        Row: {
          amount: number
          artist_amount: number | null
          artist_id: string | null
          created_at: string
          expires_at: string | null
          id: string
          mercado_pago_payment_id: string | null
          paid_at: string | null
          payer_cpf: string | null
          payer_email: string | null
          payer_name: string | null
          payment_method: string | null
          payment_url: string | null
          platform_fee: number | null
          qr_code: string | null
          qr_code_base64: string | null
          show_id: string | null
          status: string | null
          total_amount: number | null
          txid: string
          updated_at: string
        }
        Insert: {
          amount: number
          artist_amount?: number | null
          artist_id?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          mercado_pago_payment_id?: string | null
          paid_at?: string | null
          payer_cpf?: string | null
          payer_email?: string | null
          payer_name?: string | null
          payment_method?: string | null
          payment_url?: string | null
          platform_fee?: number | null
          qr_code?: string | null
          qr_code_base64?: string | null
          show_id?: string | null
          status?: string | null
          total_amount?: number | null
          txid: string
          updated_at?: string
        }
        Update: {
          amount?: number
          artist_amount?: number | null
          artist_id?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          mercado_pago_payment_id?: string | null
          paid_at?: string | null
          payer_cpf?: string | null
          payer_email?: string | null
          payer_name?: string | null
          payment_method?: string | null
          payment_url?: string | null
          platform_fee?: number | null
          qr_code?: string | null
          qr_code_base64?: string | null
          show_id?: string | null
          status?: string | null
          total_amount?: number | null
          txid?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "split_transactions_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "split_transactions_show_id_fkey"
            columns: ["show_id"]
            isOneToOne: false
            referencedRelation: "shows"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_show_code: {
        Args: { artist_username: string; show_name: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
