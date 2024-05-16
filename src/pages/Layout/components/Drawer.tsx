import { useApplicationContext } from '@/contexts/ApplicationContext'
import {
  Box,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material'
import { drawerList } from '../utils/mapper'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '@/common/utils/hooks/useModal'
import { NavRouterTypeEnum } from '../utils/interfaces'
import { Modal } from '@/common/components'
import { useAuthContext } from '@/contexts/AuthContext'

const Drawer = () => {
  const theme = useTheme()
  const { isOpenDrawer, closeDrawer, openDrawer } = useApplicationContext()
  const { signOutHandler } = useAuthContext()
  const { openModal: openModalLogout, closeModal: closeModalLogout, isOpen: isOpenLogout } = useModal()
  const navigate = useNavigate()

  const onClickDrawerItemHandler = useCallback(
    async (id: string) => {
      console.log(id)
      if (id === NavRouterTypeEnum.Logout) {
        openModalLogout()
        return
      }
      const closePromise = new Promise((resolve) => {
        closeDrawer()
        resolve('OK')
      }).then(() => {
        navigate(`/${id}`)
      })

      await closePromise
    },
    [closeDrawer, navigate, openModalLogout]
  )

  const logoutHandler = useCallback(() => {
    signOutHandler()
    console.log('call logout')
  }, [signOutHandler])

  return (
    <Box>
      <SwipeableDrawer open={isOpenDrawer} onClose={closeDrawer} onOpen={openDrawer} disableBackdropTransition>
        <Box sx={{ width: '250px' }} role="presentation">
          <List>
            {drawerList({ onClick: onClickDrawerItemHandler }).map((item, index) => {
              return (
                <ListItem
                  key={`${index}-${item.value}`}
                  disablePadding
                  disableGutters
                  sx={{
                    color: theme.customPalette.utility.black,
                    ':hover': {
                      backgroundColor: theme.customPalette.primary.light,
                      color: theme.customPalette.utility.white,
                    },
                  }}
                >
                  <ListItemButton
                    id={item.value}
                    onClick={(ev: React.MouseEvent<HTMLDivElement>) => {
                      const { id } = ev.currentTarget
                      onClickDrawerItemHandler(id)
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ':hover': {
                          '.custom-icon-drawer-class': {
                            fill: '#FFF',
                          },
                        },
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </SwipeableDrawer>
      <Modal
        isOpen={isOpenLogout}
        onClose={closeModalLogout}
        onConfirm={logoutHandler}
        titleMessage="Logout"
        contentMessage="Are you sure you want to logout?"
      />
    </Box>
  )
}

export default Drawer
