-- Insert sample location-based events for testing
INSERT INTO public.events (name, description, event_type, date, time, location, distance, is_club_event, max_participants, registration_deadline) VALUES
('Cherry Blossom 10K', 'Annual spring race around the Tidal Basin', 'training', '2024-04-15', '08:00', 'Tidal Basin, Washington DC', '10K', false, 5000, '2024-04-10'),
('Marine Corps Marathon', 'The People''s Marathon in our nation''s capital', 'marathon', '2024-10-27', '07:55', 'Arlington, VA', 'Marathon', false, 30000, '2024-05-01'),
('Rock n Roll Half Marathon DC', 'Half marathon through the monuments', 'half_marathon', '2024-03-16', '07:30', 'National Mall, Washington DC', 'Half Marathon', false, 15000, '2024-03-10'),
('Alexandria Turkey Trot', 'Thanksgiving morning 5K run', '5k', '2024-11-28', '09:00', 'Old Town Alexandria, VA', '5K', false, 2000, '2024-11-25'),
('Clarendon Day 5K', 'Community 5K race in Arlington', '5k', '2024-09-21', '08:30', 'Clarendon, Arlington VA', '5K', false, 1500, '2024-09-18'),
('Georgetown 10K', 'Scenic run through historic Georgetown', 'training', '2024-05-18', '08:00', 'Georgetown Waterfront', '10K', false, 3000, '2024-05-15'),
('Bethesda Fun Run', 'Family-friendly 5K in downtown Bethesda', '5k', '2024-06-08', '09:00', 'Downtown Bethesda, MD', '5K', false, 1200, '2024-06-05');

-- Update events with location coordinates
UPDATE public.events SET 
  latitude = 38.8853, 
  longitude = -77.0386, 
  address = 'Tidal Basin', 
  city = 'Washington', 
  state = 'DC'
WHERE name = 'Cherry Blossom 10K';

UPDATE public.events SET 
  latitude = 38.8816, 
  longitude = -77.0910, 
  address = 'Arlington Cemetery', 
  city = 'Arlington', 
  state = 'VA'
WHERE name = 'Marine Corps Marathon';

UPDATE public.events SET 
  latitude = 38.8899, 
  longitude = -77.0091, 
  address = 'National Mall', 
  city = 'Washington', 
  state = 'DC'
WHERE name = 'Rock n Roll Half Marathon DC';

UPDATE public.events SET 
  latitude = 38.8048, 
  longitude = -77.0469, 
  address = 'Market Square', 
  city = 'Alexandria', 
  state = 'VA'
WHERE name = 'Alexandria Turkey Trot';

UPDATE public.events SET 
  latitude = 38.8951, 
  longitude = -77.0946, 
  address = 'Clarendon Blvd', 
  city = 'Arlington', 
  state = 'VA'
WHERE name = 'Clarendon Day 5K';

UPDATE public.events SET 
  latitude = 38.9048, 
  longitude = -77.0632, 
  address = 'Georgetown Waterfront Park', 
  city = 'Washington', 
  state = 'DC'
WHERE name = 'Georgetown 10K';

UPDATE public.events SET 
  latitude = 38.9847, 
  longitude = -77.0947, 
  address = 'Bethesda Metro Plaza', 
  city = 'Bethesda', 
  state = 'MD'
WHERE name = 'Bethesda Fun Run';