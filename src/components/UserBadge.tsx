import { useState, useEffect } from 'react'
import { Heart, MapPin, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface Badge {
  badge_type: string
  badge_name: string
  badge_icon: string
  badge_color: string
  is_visible: boolean
}

interface UserBadgeProps {
  userId: string
  showToggle?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function UserBadge({ userId, showToggle = false, size = 'md' }: UserBadgeProps) {
  const [badges, setBadges] = useState<Badge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId || !supabase) return

    const fetchBadges = async () => {
      if (!supabase) {
        setLoading(false)
        return
      }
      
      try {
        const { data, error } = await supabase
          .from('user_badges')
          .select('*')
          .eq('user_id', userId)
          .eq('is_visible', true)
          .order('created_at', { ascending: false })

        if (error) throw error
        setBadges(data || [])
      } catch (error) {
        console.error('Error fetching badges:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBadges()
  }, [userId])

  const toggleBadgeVisibility = async (badgeType: string, currentVisibility: boolean) => {
    if (!supabase) return

    try {
      const { error } = await supabase
        .from('user_badges')
        .update({ is_visible: !currentVisibility })
        .eq('user_id', userId)
        .eq('badge_type', badgeType)

      if (error) throw error

      // Local state'i güncelle
      setBadges(badges.map(badge => 
        badge.badge_type === badgeType 
          ? { ...badge, is_visible: !currentVisibility }
          : badge
      ))
    } catch (error) {
      console.error('Error toggling badge:', error)
    }
  }

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'heart':
        return <Heart className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      case 'map-pin':
        return <MapPin className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      default:
        return null
    }
  }

  const getBadgeColor = (color: string) => {
    const colors: Record<string, string> = {
      pink: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      green: 'bg-green-500/20 text-green-300 border-green-500/30',
      amber: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    }
    return colors[color] || colors.pink
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  if (loading) {
    return <div className="animate-pulse bg-white/5 rounded-full h-6 w-20"></div>
  }

  if (badges.length === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {badges.map((badge) => (
        <div
          key={badge.badge_type}
          className={`inline-flex items-center gap-1.5 rounded-full border ${getBadgeColor(badge.badge_color)} ${sizeClasses[size]} transition-all hover:scale-105`}
        >
          {getBadgeIcon(badge.badge_icon)}
          <span className="font-medium">{badge.badge_name}</span>
          {showToggle && (
            <button
              onClick={() => toggleBadgeVisibility(badge.badge_type, badge.is_visible)}
              className="ml-1 hover:opacity-70 transition-opacity"
              title={badge.is_visible ? 'Etiketi gizle' : 'Etiketi göster'}
            >
              {badge.is_visible ? (
                <EyeOff className="w-3 h-3" />
              ) : (
                <Eye className="w-3 h-3" />
              )}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

