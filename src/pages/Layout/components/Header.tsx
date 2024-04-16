import { AppBar, IconButton, Toolbar, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { FlexBox } from '@/common/styles/styled-components'

const Header = () => {
  const theme = useTheme()

  return (
    <FlexBox>
      <AppBar color="primary" position="static">
        <Toolbar>
          <IconButton size="large" edge="start" aria-label="open drawer" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </FlexBox>
  )
}

export default Header
