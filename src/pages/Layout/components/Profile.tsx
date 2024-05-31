import { useCallback, useState } from 'react'
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import Logout from '@mui/icons-material/Logout'
import { Modal } from '@/common/components'
import { useAuthContext } from '@/contexts/AuthContext'
import { useModal } from '@/common/utils/hooks/useModal'

interface PropsI {
  alt?: string
  source?: string
  email?: string
}
const Profile = ({ alt, source, email }: PropsI) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { signOutHandler } = useAuthContext()
  const { openModal: openModalLogout, closeModal: closeModalLogout, isOpen: isOpenLogout } = useModal()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const onLogoutHandler = useCallback(() => {
    signOutHandler()
    handleClose()
  }, [signOutHandler])

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar alt={alt} src={source} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>{email}</MenuItem>
        <MenuItem onClick={openModalLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Modal
        isOpen={isOpenLogout}
        onClose={closeModalLogout}
        onConfirm={onLogoutHandler}
        titleMessage="Logout"
        contentMessage="Are you sure you want to logout?"
      />
    </>
  )
}

export default Profile
