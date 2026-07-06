'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallbackPage() {
  useEffect(() => {
    const run = async () => {
      const hash = window.location.hash.substring(1)
      const params = new URLSearchParams(hash)
      const type = params.get('type')

      if (
        type === 'recovery' ||
        type === 'invite' ||
        type === 'signup' ||
        type === 'magiclink'
      ) {
        const accessToken = params.get('access_token')
        const refreshToken = params.get('refresh_token')

        if (!accessToken || !refreshToken) {
          window.location.href = '/login'
          return
        }

        const supabase = createClient()
        const { data: { session }, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })

        if (error || !session?.user) {
          window.location.href = '/login'
          return
        }

        if (type === 'recovery') {
          window.location.href = '/auth/reset-password'
          return
        }

        const role =
          session.user.app_metadata?.role || session.user.user_metadata?.role
        const map: Record<string, string> = {
          owner: '/dashboard',
          manager: '/manager',
          client: '/client',
        }
        window.location.href = map[role as string] ?? '/client'
        return
      }

      window.location.href = window.location.pathname + window.location.search
    }

    run()
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-sm font-mono text-muted-foreground">
        <span className="text-terminal-comment">//</span> Обработка авторизации...
      </div>
    </div>
  )
}
