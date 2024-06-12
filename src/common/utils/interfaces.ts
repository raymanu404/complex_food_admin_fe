import { IconButtonProps } from '@mui/material'
import { AuthError } from '@supabase/supabase-js'

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
  CONFIRM_ACCOUNT = 'CONFIRM_ACCOUNT',
}

type ReturnMagicLinkData = {
  data:
    | {
        user: null
        session: null
        messageId?: string | null | undefined
      }
    | {
        user: null
        session: null
        messageId?: string | null | undefined
      }
  error: AuthError | null
} | null

type PathRecord = Record<string, string>

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

export { PathEnum }
export type { PathRecord, ReturnMagicLinkData, ExpandMoreProps }
