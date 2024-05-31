import { Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'

interface PropsI extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  titleMessage: string
  contentMessage?: string
  dialogProps?: Omit<DialogProps, 'open' | 'onClose'>
}

const Modal = ({ onClose, onConfirm, dialogProps, isOpen, contentMessage, titleMessage, children }: PropsI) => {
  const { ...rest } = dialogProps ?? {}

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm" {...rest}>
      <DialogTitle variant="h3">{titleMessage}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {children ?? (
          <Box>
            <Typography variant="body2">{contentMessage}</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={onConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal
