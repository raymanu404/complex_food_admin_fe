import { ProductFeI } from '@/api/interfaces/products'
import { Dialog, DialogContent, DialogProps, DialogTitle } from '@mui/material'
import { PropsWithChildren } from 'react'
import ProductForm from './ProductForm'
import { transformFromFeToFormData } from '../utils/mapper'

interface PropsI extends Omit<DialogProps, 'open' | 'onClose'>, PropsWithChildren {
  product: ProductFeI | undefined
  isOpen: boolean
  close: () => void
  refetch: () => void
}

const EditProductModal = ({ refetch, close, product, isOpen, ...rest }: PropsI) => {
  const productObj = transformFromFeToFormData(product)

  return (
    <Dialog open={isOpen} onClose={close} fullWidth maxWidth="sm" {...rest}>
      <DialogTitle variant="h4">Edit Product Id:{product?.id}</DialogTitle>
      <DialogContent sx={{ padding: '20px 0' }}>
        <ProductForm onCloseHandler={close} productId={product?.id ?? 0} defaultData={productObj} refetch={refetch} />
      </DialogContent>
    </Dialog>
  )
}

export default EditProductModal
