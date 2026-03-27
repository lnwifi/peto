import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User, Session } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Dynamically import supabase to prevent build errors
    import('../lib/supabase').then(({ supabase }) => {
      if (!supabase) {
        setLoading(false)
        return
      }

      supabase.auth.getSession().then(({ data }: any) => {
        setSession(data.session)
        setUser(data.session?.user ?? null)
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })

      const { data } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      })

      return () => {
        if (data?.subscription?.unsubscribe) {
          data.subscription.unsubscribe()
        }
      }
    }).catch(() => {
      setLoading(false)
    })
  }, [])

  const signUp = async (email: string, password: string, fullName: string) => {
    const { supabase } = await import('../lib/supabase')
    if (!supabase) throw new Error('Supabase not configured')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    })
    if (error) throw error
  }

  const signIn = async (email: string, password: string) => {
    const { supabase } = await import('../lib/supabase')
    if (!supabase) throw new Error('Supabase not configured')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signInWithGoogle = async () => {
    const { supabase } = await import('../lib/supabase')
    if (!supabase) throw new Error('Supabase not configured')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { supabase } = await import('../lib/supabase')
    if (!supabase) return
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
