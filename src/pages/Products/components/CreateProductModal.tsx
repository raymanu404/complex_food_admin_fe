import { ProductFeI } from '@/api/interfaces/products'
import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material'
import { MRT_EditActionButtons, MRT_Row, MRT_TableInstance } from 'material-react-table'

interface PropsI extends Omit<DialogProps, 'open' | 'onClose'> {
  row: MRT_Row<ProductFeI>
  table: MRT_TableInstance<ProductFeI>
  isOpen: boolean
  close: () => void
}
const CreateProductModal = ({ close, isOpen, row, table, ...rest }: PropsI) => {
  const { original } = row
  return (
    <Dialog open={isOpen} onClose={close} {...rest}>
      <DialogTitle variant="h3">Create Product</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>//content</DialogContent>
      <DialogActions>
        <MRT_EditActionButtons variant="text" table={table} row={row} />
      </DialogActions>
    </Dialog>
  )
}

export default CreateProductModal
