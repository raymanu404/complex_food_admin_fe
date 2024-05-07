import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material'
import ProductForm from './ProductForm'
import { useCallback } from 'react'
import { ProductFormUpdate } from '@/api/interfaces/products'
import { SubmitHandler } from 'react-hook-form'
import { useCreateProduct } from '@/api/hooks/productHooks'

interface PropsI extends Omit<DialogProps, 'open' | 'onClose'> {
  isOpen: boolean
  close: () => void
  refetch: () => void
}
const CreateProductModal = ({ close, isOpen, refetch, ...rest }: PropsI) => {
  const { mutateAsync, isPending: isCreatingProduct } = useCreateProduct()

  const onSubmit: SubmitHandler<ProductFormUpdate> = useCallback(
    async (data) => {
      await mutateAsync({
        productToCreate: { ...data },
      }).then(() => {
        close()
        refetch()
      })
    },
    [close, mutateAsync, refetch]
  )

  return (
    <Dialog open={isOpen} onClose={close} fullWidth maxWidth="sm" {...rest}>
      <DialogTitle variant="h3">Create Product</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <ProductForm onCloseHandler={close} onSubmitHandler={onSubmit} isLoading={isCreatingProduct} />
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  )
}

export default CreateProductModal
