import { AuthError, User } from '@supabase/supabase-js'

enum PathEnum {
  HOME = 'HOME',
  ORDERS = 'ORDERS',
  PRODUCTS = 'PRODUCTS',
  LOGIN = 'LOGIN',
  NOT_FOUND = 'NOT_FOUND',
  EVERYTHING = 'EVERYTHING',
  DEFAULT = 'DEFAULT',
  USERS = 'USERS',
  INVITE_ADMIN = 'INVITE_ADMIN',
}

type ReturnAuthData = {
  user?: User | null
  error?: AuthError | null
}

type PathRecord = Record<string, string>

export { PathEnum }
export type { PathRecord, ReturnAuthData }
