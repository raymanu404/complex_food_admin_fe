import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { FlexBox } from '@/common/styles/styled-components'
import { useApplicationContext } from '@/contexts/ApplicationContext'
import Drawer from './Drawer'
import { useAuthContext } from '@/contexts/AuthContext'

const Header = () => {
  const { isOpenDrawer, closeDrawer, openDrawer } = useApplicationContext()
  const { session } = useAuthContext()
  return (
    <FlexBox>
      <AppBar position="static">
        <Toolbar>
          <Box>
            {session && (
              <IconButton
                size="large"
                edge="start"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={() => {
                  if (isOpenDrawer) {
                    closeDrawer()
                  } else {
                    openDrawer()
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
        <Drawer />
      </AppBar>
    </FlexBox>
  )
}

export default Header
