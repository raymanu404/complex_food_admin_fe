import { ProductFeI, ProductFormUpdate } from '@/api/interfaces/products'
import { Dialog, DialogContent, DialogProps, DialogTitle } from '@mui/material'
import { PropsWithChildren, useCallback } from 'react'
import ProductForm from './ProductForm'
import { transformFromFeToFormData } from '../utils/mapper'
import { useUpdateProduct, useUploadFile } from '@/api/hooks/productHooks'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'

interface PropsI extends Omit<DialogProps, 'open' | 'onClose'>, PropsWithChildren {
  product: ProductFeI | undefined
  isOpen: boolean
  close: () => void
  refetch: () => void
}

const EditProductModal = ({ refetch, close, product, isOpen, ...rest }: PropsI) => {
  const productObj = transformFromFeToFormData(product)

  const { mutateAsync, isPending: isUpdatingProduct } = useUpdateProduct()
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
          productId: product?.id ?? 0,
          productToUpdate: { ...data, image: imageUrl },
        }).then(() => {
          close()
          refetch()
        })
      } else {
        toast.error(`Unable to get file`)
      }
    },
    [close, mutateAsync, product?.id, refetch, uploadFileHandler]
  )
  return (
    <Dialog open={isOpen} onClose={close} fullWidth maxWidth="sm" {...rest}>
      <DialogTitle variant="h4">Edit Product Id:{product?.id}</DialogTitle>
      <DialogContent sx={{ padding: '20px 0' }}>
        <ProductForm
          onCloseHandler={close}
          defaultData={productObj}
          onSubmitHandler={onSubmit}
          isLoading={isUpdatingProduct}
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditProductModal
