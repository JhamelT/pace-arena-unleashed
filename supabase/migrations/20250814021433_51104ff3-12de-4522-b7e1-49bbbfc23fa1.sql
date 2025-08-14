-- Add missing tables for social features and location-based events

-- Create posts table for club social feed
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  image_url TEXT,
  training_type TEXT,
  intensity TEXT,
  distance TEXT,
  pace TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create likes table
CREATE TABLE public.likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Enable RLS on all new tables
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- RLS policies for posts
CREATE POLICY "Users can view all posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts for their clubs" ON public.posts 
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND 
    EXISTS (SELECT 1 FROM public.club_memberships WHERE user_id = auth.uid() AND club_id = posts.club_id)
  );
CREATE POLICY "Users can update their own posts" ON public.posts 
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts" ON public.posts 
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for comments
CREATE POLICY "Users can view all comments" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create comments" ON public.comments 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments" ON public.comments 
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON public.comments 
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for likes
CREATE POLICY "Users can view all likes" ON public.likes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create likes" ON public.likes 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own likes" ON public.likes 
  FOR DELETE USING (auth.uid() = user_id);

-- Add location coordinates to events table for location-based querying
ALTER TABLE public.events ADD COLUMN latitude DECIMAL(10, 8);
ALTER TABLE public.events ADD COLUMN longitude DECIMAL(11, 8);
ALTER TABLE public.events ADD COLUMN address TEXT;
ALTER TABLE public.events ADD COLUMN city TEXT;
ALTER TABLE public.events ADD COLUMN state TEXT;
ALTER TABLE public.events ADD COLUMN zipcode TEXT;

-- Add location coordinates to profiles for location-based features
ALTER TABLE public.profiles ADD COLUMN latitude DECIMAL(10, 8);
ALTER TABLE public.profiles ADD COLUMN longitude DECIMAL(11, 8);
ALTER TABLE public.profiles ADD COLUMN city TEXT;
ALTER TABLE public.profiles ADD COLUMN state TEXT;

-- Create function to calculate distance between two points (Haversine formula)
CREATE OR REPLACE FUNCTION public.calculate_distance(
  lat1 DECIMAL, lon1 DECIMAL, lat2 DECIMAL, lon2 DECIMAL
) RETURNS DECIMAL AS $$
BEGIN
  RETURN (
    3959 * acos(
      cos(radians(lat1)) * cos(radians(lat2)) * 
      cos(radians(lon2) - radians(lon1)) + 
      sin(radians(lat1)) * sin(radians(lat2))
    )
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create function to get nearby events
CREATE OR REPLACE FUNCTION public.get_nearby_events(
  user_lat DECIMAL, user_lon DECIMAL, radius_miles DECIMAL DEFAULT 25
) RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  event_type public.event_type,
  date DATE,
  time TIME,
  location TEXT,
  distance TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  address TEXT,
  city TEXT,
  state TEXT,
  max_participants INTEGER,
  registration_deadline DATE,
  distance_miles DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.id,
    e.name,
    e.description,
    e.event_type,
    e.date,
    e.time,
    e.location,
    e.distance,
    e.latitude,
    e.longitude,
    e.address,
    e.city,
    e.state,
    e.max_participants,
    e.registration_deadline,
    public.calculate_distance(user_lat, user_lon, e.latitude, e.longitude) as distance_miles
  FROM public.events e
  WHERE 
    e.is_club_event = false 
    AND e.latitude IS NOT NULL 
    AND e.longitude IS NOT NULL
    AND public.calculate_distance(user_lat, user_lon, e.latitude, e.longitude) <= radius_miles
    AND e.date >= CURRENT_DATE
  ORDER BY distance_miles ASC, e.date ASC;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_posts_club_id ON public.posts(club_id);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX idx_comments_post_id ON public.comments(post_id);
CREATE INDEX idx_likes_post_id ON public.likes(post_id);
CREATE INDEX idx_likes_user_post ON public.likes(user_id, post_id);
CREATE INDEX idx_events_location ON public.events(latitude, longitude) WHERE latitude IS NOT NULL;
CREATE INDEX idx_events_date ON public.events(date) WHERE date >= CURRENT_DATE;

-- Insert sample location-based events for testing
INSERT INTO public.events (name, description, event_type, date, time, location, distance, latitude, longitude, address, city, state, is_club_event, max_participants, registration_deadline) VALUES
('Cherry Blossom 10K', 'Annual spring race around the Tidal Basin', 'training', '2024-04-15', '08:00', 'Tidal Basin, Washington DC', '10K', 38.8853, -77.0386, 'Tidal Basin', 'Washington', 'DC', false, 5000, '2024-04-10'),
('Marine Corps Marathon', 'The People''s Marathon in our nation''s capital', 'marathon', '2024-10-27', '07:55', 'Arlington, VA', 'Marathon', 38.8816, -77.0910, 'Arlington Cemetery', 'Arlington', 'VA', false, 30000, '2024-05-01'),
('Rock n Roll Half Marathon DC', 'Half marathon through the monuments', 'half_marathon', '2024-03-16', '07:30', 'National Mall, Washington DC', 'Half Marathon', 38.8899, -77.0091, 'National Mall', 'Washington', 'DC', false, 15000, '2024-03-10'),
('Alexandria Turkey Trot', 'Thanksgiving morning 5K run', '5k', '2024-11-28', '09:00', 'Old Town Alexandria, VA', '5K', 38.8048, -77.0469, 'Market Square', 'Alexandria', 'VA', false, 2000, '2024-11-25'),
('Clarendon Day 5K', 'Community 5K race in Arlington', '5k', '2024-09-21', '08:30', 'Clarendon, Arlington VA', '5K', 38.8951, -77.0946, 'Clarendon Blvd', 'Arlington', 'VA', false, 1500, '2024-09-18'),
('Georgetown 10K', 'Scenic run through historic Georgetown', 'training', '2024-05-18', '08:00', 'Georgetown Waterfront', '10K', 38.9048, -77.0632, 'Georgetown Waterfront Park', 'Washington', 'DC', false, 3000, '2024-05-15'),
('Bethesda Fun Run', 'Family-friendly 5K in downtown Bethesda', '5k', '2024-06-08', '09:00', 'Downtown Bethesda, MD', '5K', 38.9847, -77.0947, 'Bethesda Metro Plaza', 'Bethesda', 'MD', false, 1200, '2024-06-05');