-- Urgent Causes (Donation Campaigns) for Shelters
-- These are campaigns that shelters create to raise funds for specific needs

CREATE TABLE public.urgent_causes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shelter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL, -- "Comida para 30 días"
  description TEXT, -- Descripción detallada de la causa
  goal_amount INTEGER NOT NULL, -- Monto objetivo en centavos (ej: 15000000 = $150.000)
  current_amount INTEGER DEFAULT 0, -- Monto actualraise到目前为止
  image_url TEXT, -- Imagen de la campaña
  is_active BOOLEAN DEFAULT TRUE,
  is_urgent BOOLEAN DEFAULT FALSE, -- Marcar como urgente (aparece primero)
  expires_at TIMESTAMPTZ, -- Cuándo termina la campaña (NULL = sin límite)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Donations to urgent causes
CREATE TABLE public.cause_donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cause_id UUID REFERENCES public.urgent_causes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL, -- Monto donado en centavos
  mercado_pago_payment_id TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  message TEXT, -- Mensaje del donante (opcional)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add social media fields to profiles for shelters (reuse from businesses)
-- Actually, let's add them to profiles directly so all users can have them
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS instagram_url TEXT,
ADD COLUMN IF NOT EXISTS facebook_url TEXT,
ADD COLUMN IF NOT EXISTS whatsapp_phone TEXT,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS cover_image_url TEXT;

-- RLS Policies
ALTER TABLE public.urgent_causes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cause_donations ENABLE ROW LEVEL SECURITY;

-- Anyone can view active causes
CREATE POLICY "Active causes are viewable by everyone"
  ON public.urgent_causes FOR SELECT USING (is_active = TRUE);

-- Shelters can manage their own causes
CREATE POLICY "Shelters can manage their causes"
  ON public.urgent_causes FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = shelter_id 
      AND (role = 'shelter' OR role = 'admin')
      AND auth.uid() = id
    )
  );

-- Anyone can donate to causes
CREATE POLICY "Authenticated users can donate"
  ON public.cause_donations FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Shelters can view donations to their causes
CREATE POLICY "Shelters can view donations to their causes"
  ON public.cause_donations FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.urgent_causes c
      JOIN public.profiles p ON p.id = c.shelter_id
      WHERE c.id = cause_id AND p.id = auth.uid()
    )
  );

-- Public can view donations (anonymized)
CREATE POLICY "Donations are publicly viewable"
  ON public.cause_donations FOR SELECT USING (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS urgent_causes_updated_at ON public.urgent_causes;
CREATE TRIGGER urgent_causes_updated_at BEFORE UPDATE ON public.urgent_causes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Function to update cause amount when a donation is made
CREATE OR REPLACE FUNCTION public.update_cause_amount()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.urgent_causes
  SET current_amount = current_amount + NEW.amount
  WHERE id = NEW.cause_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_donation_made ON public.cause_donations;
CREATE TRIGGER on_donation_made
  AFTER INSERT ON public.cause_donations
  FOR EACH ROW EXECUTE FUNCTION public.update_cause_amount();

-- Function to get progress percentage
CREATE OR REPLACE FUNCTION public.get_cause_progress(p_cause_id UUID)
RETURNS TABLE(current_amount INTEGER, goal_amount INTEGER, percentage NUMERIC) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(c.current_amount, 0),
    c.goal_amount,
    CASE 
      WHEN c.goal_amount > 0 THEN 
        ROUND((COALESCE(c.current_amount, 0)::NUMERIC / c.goal_amount::NUMERIC) * 100, 1)
      ELSE 0
    END as percentage
  FROM public.urgent_causes c
  WHERE c.id = p_cause_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
