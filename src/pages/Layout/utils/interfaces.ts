import { ReactNode } from 'react'

interface DrawerListItem {
  value: NavRouterTypeEnum
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
}

export type { DrawerListItem }
export { NavRouterTypeEnum }
