import { ProductFeI } from '@/api/interfaces/products'
import { Box, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material'
import { PropsWithChildren } from 'react'

interface PropsI extends Omit<DialogProps, 'open' | 'onClose'>, PropsWithChildren {
  product: ProductFeI | null
  isOpen: boolean
  close: () => void
}

const EditProductModal = ({ close, product, isOpen, children, ...rest }: PropsI) => {
  return (
    <Dialog open={isOpen} onClose={close} {...rest}>
      <DialogTitle variant="h3">Edit Product</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Box>{product?.title}</Box>
        {children}
      </DialogContent>
      <DialogActions>{/* <MRT_EditActionButtons variant="text" table={table} row={row} /> */}</DialogActions>
    </Dialog>
  )
}

export default EditProductModal
