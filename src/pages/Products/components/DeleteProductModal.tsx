import { useDeleteProduct } from '@/api/hooks/productHooks'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material'

interface PropsI {
  isOpen: boolean
  close: () => void
  productId: number
  refetch: () => void
}

const DeleteProductModal = ({ productId, close, isOpen, refetch }: PropsI) => {
  const { mutateAsync } = useDeleteProduct()

  const onSubmit = async () => {
    await mutateAsync({
      productId,
    })

    close()
    refetch()
  }
  return (
    <Dialog open={isOpen} onClose={close} fullWidth maxWidth="sm">
      <DialogTitle variant="h4">Delete Product Id: {productId}</DialogTitle>
      <DialogContent sx={{ padding: '20px 30px' }}>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="h4">Are you sure you want to delete this product?</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 30px' }}>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={onSubmit}>Delete</Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteProductModal
