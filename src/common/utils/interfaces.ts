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

type PathRecord = Record<string, string>

export { PathEnum }
export type { PathRecord }
