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
  isSessionLoading: boolean
  sessionTypeEvent: AuthChangeEvent | null
}

const DefaultContext: AuthContextI = {
  session: null,
  signOutHandler: () => ({}),
  isSessionLoading: true,
  sessionTypeEvent: null,
}

const AuthContext = createContext<AuthContextI>(DefaultContext)

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null)
  const [isSessionLoading, setIsSessionLoading] = useState(true)
  const [sessionTypeEvent, setSessionTypeEvent] = useState<AuthChangeEvent | null>(null)

  const navigate = useNavigate()
  const { closeDrawer } = useApplicationContext()

  const authContextChangingHandler = useCallback(() => {
    closeDrawer()
  }, [closeDrawer])

  const switchAuthEventActionHandler = useCallback(
    (typeEvent: AuthChangeEvent, session: Session | null) => {
      console.log(typeEvent)
      console.log(session)
      setSessionTypeEvent(typeEvent)
      console.log({ sessionTypeEvent })
      switch (typeEvent) {
        case 'INITIAL_SESSION': {
          setIsSessionLoading(false)
          break
        }
        case 'USER_UPDATED': {
          break
        }
        case 'MFA_CHALLENGE_VERIFIED': {
          break
        }
        case 'SIGNED_IN': {
          if (sessionTypeEvent === 'INITIAL_SESSION') {
            authContextChangingHandler()
            // navigate(`${PATHS[PathEnum.HOME]}`) //TODO: figure out how to redirect to home page when user is signup only!!!
          }
          setIsSessionLoading(false)

          break
        }
        case 'SIGNED_OUT': {
          // setIsSessionLoading(true)
          authContextChangingHandler()
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
    },
    [authContextChangingHandler, navigate, sessionTypeEvent]
  )

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      switchAuthEventActionHandler(_event, session)
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [switchAuthEventActionHandler])

  const signOutHandler = async () => {
    await supabaseClient.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ session, signOutHandler, isSessionLoading, sessionTypeEvent }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('You need to put Provider in your root tree')
  }

  return context
}

export { AuthContextProvider, useAuthContext }
