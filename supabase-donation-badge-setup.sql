-- MyTrabzon Destekçi Etiket Sistemi
-- Ödeme yapan kullanıcılara otomatik "Destekçi" etiketi ekleme

-- 1. Kullanıcı etiketleri tablosu
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_type VARCHAR(50) NOT NULL, -- 'supporter', 'district', vb.
  badge_name VARCHAR(100) NOT NULL,
  badge_icon VARCHAR(50), -- İkon adı
  badge_color VARCHAR(20), -- Renk kodu
  is_visible BOOLEAN DEFAULT true, -- Kullanıcı etiketi gizleyebilir
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_type)
);

-- 2. Bağış kayıtları tablosu
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'TRY',
  stripe_session_id VARCHAR(255),
  stripe_payment_intent_id VARCHAR(255),
  donor_name VARCHAR(255),
  donation_type VARCHAR(50) DEFAULT 'mytrabzon-support',
  status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB
);

-- 3. Index'ler
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_type ON user_badges(badge_type);
CREATE INDEX IF NOT EXISTS idx_donations_user_id ON donations(user_id);
CREATE INDEX IF NOT EXISTS idx_donations_session_id ON donations(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);

-- 4. Destekçi etiketi ekleme fonksiyonu
CREATE OR REPLACE FUNCTION add_supporter_badge(p_user_id UUID, p_amount DECIMAL)
RETURNS void AS $$
BEGIN
  -- Eğer kullanıcı zaten destekçi etiketine sahipse, güncelle
  INSERT INTO user_badges (user_id, badge_type, badge_name, badge_icon, badge_color, is_visible)
  VALUES (
    p_user_id,
    'supporter',
    'Destekçi',
    'heart',
    'pink',
    true
  )
  ON CONFLICT (user_id, badge_type) 
  DO UPDATE SET
    updated_at = NOW(),
    is_visible = COALESCE(user_badges.is_visible, true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Etiket görünürlüğünü değiştirme fonksiyonu
CREATE OR REPLACE FUNCTION toggle_badge_visibility(p_user_id UUID, p_badge_type VARCHAR, p_is_visible BOOLEAN)
RETURNS void AS $$
BEGIN
  UPDATE user_badges
  SET is_visible = p_is_visible,
      updated_at = NOW()
  WHERE user_id = p_user_id AND badge_type = p_badge_type;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Kullanıcının etiketlerini getirme fonksiyonu
CREATE OR REPLACE FUNCTION get_user_badges(p_user_id UUID)
RETURNS TABLE (
  badge_type VARCHAR,
  badge_name VARCHAR,
  badge_icon VARCHAR,
  badge_color VARCHAR,
  is_visible BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ub.badge_type,
    ub.badge_name,
    ub.badge_icon,
    ub.badge_color,
    ub.is_visible
  FROM user_badges ub
  WHERE ub.user_id = p_user_id AND ub.is_visible = true
  ORDER BY ub.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. RLS (Row Level Security) Politikaları
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar kendi etiketlerini görebilir
CREATE POLICY "Users can view their own badges"
  ON user_badges FOR SELECT
  USING (auth.uid() = user_id);

-- Kullanıcılar kendi etiketlerinin görünürlüğünü değiştirebilir
CREATE POLICY "Users can update their own badge visibility"
  ON user_badges FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Kullanıcılar kendi bağışlarını görebilir
CREATE POLICY "Users can view their own donations"
  ON donations FOR SELECT
  USING (auth.uid() = user_id);

-- Service role tüm işlemleri yapabilir (webhook için)
CREATE POLICY "Service role can do everything"
  ON user_badges FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can do everything on donations"
  ON donations FOR ALL
  USING (true)
  WITH CHECK (true);

-- 8. Trigger: Bağış tamamlandığında otomatik etiket ekleme
CREATE OR REPLACE FUNCTION handle_donation_completed()
RETURNS TRIGGER AS $$
BEGIN
  -- Eğer bağış tamamlandıysa ve user_id varsa, destekçi etiketi ekle
  IF NEW.status = 'completed' AND NEW.user_id IS NOT NULL THEN
    PERFORM add_supporter_badge(NEW.user_id, NEW.amount);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER donation_completed_trigger
  AFTER UPDATE OF status ON donations
  FOR EACH ROW
  WHEN (NEW.status = 'completed' AND OLD.status != 'completed')
  EXECUTE FUNCTION handle_donation_completed();

-- 9. Örnek ilçe etiketi ekleme (opsiyonel - manuel eklenebilir)
-- INSERT INTO user_badges (user_id, badge_type, badge_name, badge_icon, badge_color)
-- VALUES ('user-uuid-here', 'district', 'Ortahisar', 'map-pin', 'blue')
-- ON CONFLICT DO NOTHING;

