/* eslint-disable @typescript-eslint/no-explicit-any */
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { getItemByPartialKey } from '../helpers'

/**
 *
 * @description this hook is used for get auth session from LocalStorage

 */

const useAuthLocalStorage = () => {
  const partiallyAuthKey = 'auth-token'
  const [session, setSession] = useState<Session | null>(null)
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    console.log({ isEnabled })
    const getDataFromLocalStorage = () => {
      try {
        const jsonString = getItemByPartialKey(partiallyAuthKey)
        const sessionData = jsonString ? (JSON.parse(jsonString) as Session) : null

        setSession(sessionData)
      } catch (error) {
        console.error('Error parsing JSON from localStorage', error)
        setSession(null)
      }
    }
    if (isEnabled) getDataFromLocalStorage()
  }, [isEnabled])

  return { session, setSession, setIsEnabled }
}

export { useAuthLocalStorage }
