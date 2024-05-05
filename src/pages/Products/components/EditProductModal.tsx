import { ProductBodyToUpdate, ProductFeI } from '@/api/interfaces/products'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from '@mui/material'
import { PropsWithChildren, useState } from 'react'
import ProductForm from './ProductForm'

interface PropsI extends Omit<DialogProps, 'open' | 'onClose'>, PropsWithChildren {
  product: ProductFeI
  isOpen: boolean
  close: () => void
}

const EditProductModal = ({ close, product, isOpen, ...rest }: PropsI) => {
  return (
    <Dialog open={isOpen} onClose={close} fullWidth maxWidth="sm" {...rest}>
      <DialogTitle variant="h3">Edit Product</DialogTitle>
      <DialogContent sx={{ padding: '20px 0' }}>
        <ProductForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditProductModal
