/* eslint-disable react-refresh/only-export-components */
import { supabaseClient } from '@/common/config/application_config'
import { Session } from '@supabase/supabase-js'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

interface AuthContextI {
  session: Session | null
  signOutHandler: () => void
}

const DefaultContext: AuthContextI = {
  session: null,
  signOutHandler: () => ({}),
}

const AuthContext = createContext<AuthContextI>(DefaultContext)

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOutHandler = async () => {
    const { error } = await supabaseClient.auth.signOut()
    console.log(error)
  }

  return <AuthContext.Provider value={{ session, signOutHandler }}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('You need to put Provider in your root tree')
  }

  return context
}

export { AuthContextProvider, useAuthContext }
