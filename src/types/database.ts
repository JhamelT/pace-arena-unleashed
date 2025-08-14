// Database types for the running club app
export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          name: string;
          description: string;
          event_type: string;
          date: string;
          time: string;
          location: string;
          distance: string;
          latitude?: number;
          longitude?: number;
          address?: string;
          city?: string;
          state?: string;
          zipcode?: string;
          is_club_event: boolean;
          club_id?: string;
          max_participants?: number;
          registration_deadline?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          event_type: string;
          date: string;
          time: string;
          location: string;
          distance: string;
          latitude?: number;
          longitude?: number;
          address?: string;
          city?: string;
          state?: string;
          zipcode?: string;
          is_club_event?: boolean;
          club_id?: string;
          max_participants?: number;
          registration_deadline?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          event_type?: string;
          date?: string;
          time?: string;
          location?: string;
          distance?: string;
          latitude?: number;
          longitude?: number;
          address?: string;
          city?: string;
          state?: string;
          zipcode?: string;
          is_club_event?: boolean;
          club_id?: string;
          max_participants?: number;
          registration_deadline?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      event_registrations: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          full_name: string;
          phone_number: string;
          registration_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          user_id: string;
          full_name: string;
          phone_number: string;
          registration_date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          user_id?: string;
          full_name?: string;
          phone_number?: string;
          registration_date?: string;
          created_at?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          event_id?: string;
          post_id?: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id?: string;
          post_id?: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          post_id?: string;
          user_id?: string;
          created_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          event_id?: string;
          post_id?: string;
          user_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id?: string;
          post_id?: string;
          user_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          post_id?: string;
          user_id?: string;
          content?: string;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {
      get_nearby_events: {
        Args: {
          user_lat: number;
          user_lng: number;
          radius_miles: number;
        };
        Returns: Array<{
          id: string;
          name: string;
          description: string;
          event_type: string;
          date: string;
          time: string;
          location: string;
          distance: string;
          latitude?: number;
          longitude?: number;
          address?: string;
          city?: string;
          state?: string;
          is_club_event: boolean;
          max_participants?: number;
          registration_deadline?: string;
          created_at: string;
        }>;
      };
    };
    Enums: {};
    CompositeTypes: {};
  };
}