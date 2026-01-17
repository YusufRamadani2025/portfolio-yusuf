-- 1. Create the Profile table
CREATE TABLE IF NOT EXISTS public.profile (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Insert the initial default row (We only need one row for a single-user portfolio)
INSERT INTO public.profile (id, full_name, avatar_url)
VALUES (1, 'Yusuf Ramadani', NULL)
ON CONFLICT (id) DO NOTHING;

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies (Allow Public Read, Allow Authenticated Update)
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.profile FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile." 
ON public.profile FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Note: We assume the storage bucket 'project-images' already exists.
-- If you want a specific 'profiles' bucket, you can create it in the Supabase Dashboard.



