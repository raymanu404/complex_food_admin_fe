/* eslint-disable react-refresh/only-export-components */
import { supabaseClient } from '@/common/config/application_config'
import { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApplicationContext } from './ApplicationContext'
import { PATHS } from '@/common/utils/constants'
import { PathEnum } from '@/common/utils/interfaces'

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
  const navigate = useNavigate()
  const { closeDrawer } = useApplicationContext()

  const authContextChangingHandler = () => {
    closeDrawer()
  }

  const switchAuthEventActionHandler = useCallback((typeEvent: AuthChangeEvent) => {
    console.log(typeEvent)
    switch (typeEvent) {
      case 'INITIAL_SESSION': {
        break
      }
      case 'USER_UPDATED': {
        break
      }
      case 'MFA_CHALLENGE_VERIFIED': {
        break
      }
      case 'SIGNED_IN': {
        break
      }
      case 'SIGNED_OUT': {
        break
      }
      case 'PASSWORD_RECOVERY': {
        break
      }
      case 'TOKEN_REFRESHED': {
        break
      }
      default: {
        break
      }
    }
  }, [])

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      switchAuthEventActionHandler(_event)
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [switchAuthEventActionHandler])

  const signOutHandler = async () => {
    await supabaseClient.auth.signOut()
    authContextChangingHandler()
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
