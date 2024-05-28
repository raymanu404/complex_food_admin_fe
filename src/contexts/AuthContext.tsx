/* eslint-disable react-refresh/only-export-components */
import { supabaseClient } from '@/common/config/application_config'
import { AuthChangeEvent, Session, UserResponse } from '@supabase/supabase-js'
import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApplicationContext } from './ApplicationContext'
import { CLIENT_APP_URL, PATHS } from '@/common/utils/constants'
import { PathEnum, ReturnMagicLinkData } from '@/common/utils/interfaces'
import { useAuthLocalStorage } from '@/common/utils/hooks/useAuthLocalStorage'

interface AuthContextI {
  session: Session | null
  signOutHandler: () => void
  isSessionLoading: boolean
  sessionTypeEvent: AuthChangeEvent | null
  sendMagicLinkHandler: (email: string, isEmailValid?: boolean) => Promise<ReturnMagicLinkData>
  updateUserPassword: (password: string) => Promise<UserResponse>
}

const DefaultContext: AuthContextI = {
  session: null,
  signOutHandler: () => ({}),
  isSessionLoading: true,
  sessionTypeEvent: null,
  sendMagicLinkHandler: () => new Promise(() => null),
  updateUserPassword: (password: string) => new Promise(() => password),
}

const AuthContext = createContext<AuthContextI>(DefaultContext)

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const { session, setIsEnabled, setSession } = useAuthLocalStorage()
  const [isSessionLoading, setIsSessionLoading] = useState(true)
  const [sessionTypeEvent, setSessionTypeEvent] = useState<AuthChangeEvent | null>(null)
  const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false)

  const navigate = useNavigate()
  const { closeDrawer, isOpenDrawer } = useApplicationContext()

  const navigateToHome = useCallback(() => navigate(`${PATHS[PathEnum.HOME]}`), [navigate])
  const navigateToLogin = useCallback(() => navigate(`${PATHS[PathEnum.LOGIN]}`), [navigate])

  const switchAuthEventActionHandler = (typeEvent: AuthChangeEvent, session: Session | null) => {
    setSessionTypeEvent(typeEvent)

    console.log({ typeEvent })
    console.log({ sessionTypeEvent })
    // console.log({ session })

    //TODO: fix this, how to handle redirect when user is sign in only
    // if (typeEvent === 'SIGNED_IN' && session && !isFirstSignInRef.current) {
    //   isFirstSignInRef.current = true
    //   navigateToHome()
    //   console.log(`isFirstSignInRef.current ${isFirstSignInRef.current}`)
    // }

    // console.log({ session })

    console.log({ session })
    switch (typeEvent) {
      case 'INITIAL_SESSION': {
        // setIsUserSignedIn(true)
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
        // setIsSessionLoading(true)
        // authContextChangingHandler()
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

  //this method is used to invite usual users, not with admin role
  const sendMagicLinkHandler = async (email: string, isEmailValid = true) => {
    if (isEmailValid) {
      const { data, error } = await supabaseClient.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${CLIENT_APP_URL}${PATHS[PathEnum.CONFIRM_ACCOUNT]}`,
        },
      })

      return { data, error }
    }

    return null
  }

  const updateUserPassword = async (newPassword: string) => {
    return await supabaseClient.auth.updateUser({ password: newPassword })
  }

  return (
    <AuthContext.Provider
      value={{ session, signOutHandler, isSessionLoading, sessionTypeEvent, sendMagicLinkHandler, updateUserPassword }}
    >
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
