import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material'
import ProductForm from './ProductForm'

interface PropsI extends Omit<DialogProps, 'open' | 'onClose'> {
  isOpen: boolean
  close: () => void
  refetch: () => void
}
const CreateProductModal = ({ close, isOpen, refetch, ...rest }: PropsI) => {
  return (
    <Dialog open={isOpen} onClose={close} {...rest}>
      <DialogTitle variant="h3">Create Product</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <ProductForm onCloseHandler={close} refetch={refetch} />
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  )
}

export default CreateProductModal
