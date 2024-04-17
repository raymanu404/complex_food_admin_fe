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

const Drawer = () => {
  const theme = useTheme()
  const { isOpenDrawer, closeDrawer, openDrawer } = useApplicationContext()
  const navigate = useNavigate()

  const onClickDrawerItemHandler = useCallback(
    (id: string) => {
      console.log(id)
      navigate(`/${id}`)
    },
    [navigate]
  )

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
    </Box>
  )
}

export default Drawer
