import { ReactNode } from 'react'

interface DrawerListItem {
  value: string
  icon: ReactNode
  onClick: (id: string) => void
  text: string
}

enum NavRouterTypeEnum {
  Products = 'products',
  Orders = 'orders',
  Home = 'home',
  Users = 'users',
  Invite_admin = 'invite_admin',
  Logout = 'logout',
}

export type { DrawerListItem }
export { NavRouterTypeEnum }
