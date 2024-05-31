import StorefrontIcon from '@mui/icons-material/Storefront'
import HomeIcon from '@mui/icons-material/Home'
import ListAltIcon from '@mui/icons-material/ListAlt'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { DrawerListItem, NavRouterTypeEnum } from './interfaces'

const drawerList = ({ onClick }: { onClick: (id: string) => void }): DrawerListItem[] => [
  {
    text: 'Home',
    icon: <HomeIcon className="custom-icon-drawer-class" />,
    value: NavRouterTypeEnum.Home,
    onClick: onClick,
  },
  {
    text: 'Products',
    icon: <StorefrontIcon className="custom-icon-drawer-class" />,
    value: NavRouterTypeEnum.Products,
    onClick: onClick,
  },
  {
    text: 'Orders',
    icon: <ListAltIcon className="custom-icon-drawer-class" />,
    value: NavRouterTypeEnum.Orders,
    onClick: onClick,
  },
  {
    text: 'Invite Admin',
    icon: <ForwardToInboxIcon className="custom-icon-drawer-class" />,
    value: NavRouterTypeEnum.Invite_admin,
    onClick: onClick,
  },
  {
    text: 'Logout',
    icon: <LogoutOutlinedIcon className="custom-icon-drawer-class" />,
    value: NavRouterTypeEnum.Logout,
    onClick: onClick,
  },
]

export { drawerList }
