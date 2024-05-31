/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { supabaseClient } from '@/common/config/application_config'
import { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { useApplicationContext } from './ApplicationContext'
import { useAuthLocalStorage } from '@/common/utils/hooks/useAuthLocalStorage'
import { useRedirect } from '@/common/utils/hooks/useRedirect'

interface AuthContextI {
  session: Session | null
  signOutHandler: () => void
  isSessionLoading: boolean
}

const DefaultContext: AuthContextI = {
  session: null,
  signOutHandler: () => ({}),
  isSessionLoading: true,
}

const AuthContext = createContext<AuthContextI>(DefaultContext)

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const { session, setIsEnabled, setSession } = useAuthLocalStorage()
  const [isSessionLoading, setIsSessionLoading] = useState(true)

  const { closeDrawer, isOpenDrawer } = useApplicationContext()
  const { navigateToHome, navigateToLogin } = useRedirect()

  const switchAuthEventActionHandler = (typeEvent: AuthChangeEvent, session: Session | null) => {
    switch (typeEvent) {
      case 'INITIAL_SESSION': {
        setIsSessionLoading(false)
        break
      }
      case 'USER_UPDATED': {
        navigateToHome()
        break
      }
      case 'MFA_CHALLENGE_VERIFIED': {
        break
      }
      case 'SIGNED_IN': {
        setIsSessionLoading(false)
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
  }

  useEffect(() => {
    supabaseClient.auth.getSession().then(() => {
      setIsEnabled(true)
    })

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => {
        setSession(session)
        switchAuthEventActionHandler(_event, session)
      }, 1)
    })

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signOutHandler = async () => {
    await supabaseClient.auth.signOut()
    if (isOpenDrawer) {
      closeDrawer()
    }
    setIsEnabled(false)
    navigateToLogin()
  }

  return <AuthContext.Provider value={{ session, signOutHandler, isSessionLoading }}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('You need to put Provider in your root tree')
  }

  return context
}

export { AuthContextProvider, useAuthContext }
