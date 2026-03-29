import { supabase } from './supabase'

// Generate a validation code for a user to redeem at a business
export async function generateValidationCode(
  businessId: string,
  userId: string,
  discountId: string,
  couponCode: string
): Promise<{ code: string; expiresAt: Date } | null> {
  try {
    const { data, error } = await supabase.rpc('create_validation_code', {
      p_business_id: businessId,
      p_user_id: userId,
      p_discount_id: discountId,
      p_coupon_code: couponCode
    })

    if (error) throw error

    return {
      code: data[0].code,
      expiresAt: new Date(data[0].expires_at)
    }
  } catch (err) {
    console.error('Error generating validation code:', err)
    return null
  }
}

// Validate (use) a code from the business side
export async function useValidationCode(code: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc('use_validation_code', {
      p_code: code.toUpperCase()
    })

    if (error) throw error
    return data
  } catch (err) {
    console.error('Error using validation code:', err)
    return false
  }
}

// Get validation history for a business
export async function getValidationHistory(businessId: string, limit = 20) {
  try {
    const { data, error } = await supabase
      .from('validation_codes')
      .select(`
        *,
        profiles:user_id (full_name, email),
        discounts:discount_id (title)
      `)
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  } catch (err) {
    console.error('Error getting validation history:', err)
    return []
  }
}

// Check if a code is valid (exists, not expired, not used)
export async function checkCodeStatus(code: string) {
  try {
    const { data, error } = await supabase
      .from('validation_codes')
      .select('*, discounts:discount_id (title)')
      .eq('code', code.toUpperCase())
      .single()

    if (error) return { valid: false, error: 'Código no encontrado' }

    if (data.is_used) {
      return { valid: false, error: 'Este código ya fue utilizado', usedAt: data.used_at }
    }

    if (new Date(data.expires_at) < new Date()) {
      return { valid: false, error: 'Este código ha expirado', expiresAt: data.expires_at }
    }

    return {
      valid: true,
      code: data.code,
      couponTitle: data.discounts?.title,
      expiresAt: data.expires_at,
      remainingMinutes: Math.ceil((new Date(data.expires_at).getTime() - Date.now()) / 60000)
    }
  } catch (err) {
    console.error('Error checking code status:', err)
    return { valid: false, error: 'Error al verificar el código' }
  }
}

// Get business QR data
export async function getBusinessQR(businessId: string) {
  try {
    const { data, error } = await supabase
      .from('business_qr')
      .select('*')
      .eq('business_id', businessId)
      .single()

    if (error) throw error
    return data
  } catch (err) {
    console.error('Error getting business QR:', err)
    return null
  }
}

// Generate QR data URL for printing
export function generateQRDataURL(businessToken: string): string {
  // The QR contains a link to validate at this business
  return `${window.location.origin}/validar/${businessToken}`
}

// Format remaining time
export function formatRemainingTime(expiresAt: Date): string {
  const now = new Date()
  const diff = expiresAt.getTime() - now.getTime()
  
  if (diff <= 0) return 'Expirado'
  
  const minutes = Math.floor(diff / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
