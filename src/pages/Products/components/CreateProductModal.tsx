import { Dialog, DialogContent, DialogProps, DialogTitle } from '@mui/material'
import ProductForm from './ProductForm'
import { useCallback } from 'react'
import { ProductFormUpdate } from '@/api/interfaces/products'
import { SubmitHandler } from 'react-hook-form'
import { useCreateProduct, useUploadFile } from '@/api/hooks/productHooks'
import { toast } from 'react-toastify'

interface PropsI extends Omit<DialogProps, 'open' | 'onClose'> {
  isOpen: boolean
  close: () => void
  refetch: () => void
}
const CreateProductModal = ({ close, isOpen, refetch, ...rest }: PropsI) => {
  const { mutateAsync, isPending: isCreatingProduct } = useCreateProduct()
  const { uploadFileHandler } = useUploadFile()

  const onSubmit: SubmitHandler<ProductFormUpdate> = useCallback(
    async (data) => {
      const result = await uploadFileHandler(data.file)
      if (result) {
        const { imageUrl, error } = result
        if (error) {
          toast.error(`Unable to upload file to storage. ${error.message}`)
          return
        }

        await mutateAsync({
          productToCreate: { ...data, image: imageUrl },
        }).then(() => {
          close()
          refetch()
        })
      } else {
        toast.error(`Unable to get file`)
      }
    },
    [close, mutateAsync, refetch, uploadFileHandler]
  )

  return (
    <Dialog open={isOpen} onClose={close} fullWidth maxWidth="sm" {...rest}>
      <DialogTitle variant="h3">Create Product</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <ProductForm onCloseHandler={close} onSubmitHandler={onSubmit} isLoading={isCreatingProduct} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateProductModal
