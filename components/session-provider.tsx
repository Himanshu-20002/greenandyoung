'use client'

import React, { createContext, useContext } from 'react'
import { authClient } from '@/lib/auth-client'

interface SessionContextType {
  session: any
  isPending: boolean
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  isPending: true,
})

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession()

  return (
    <SessionContext.Provider value={{ session, isPending }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionContext() {
  return useContext(SessionContext)
}
