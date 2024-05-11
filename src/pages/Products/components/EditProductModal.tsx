import { ProductFeI, ProductFormUpdate } from '@/api/interfaces/products'
import { Dialog, DialogContent, DialogProps, DialogTitle } from '@mui/material'
import { PropsWithChildren, useCallback } from 'react'
import ProductForm from './ProductForm'
import { transformFromFeToFormData } from '../utils/mapper'
import { useUpdateProduct, useUploadFile } from '@/api/hooks/productHooks'
import { SubmitHandler } from 'react-hook-form'
import { createFullPathStorageFile } from '@/common/utils/helpers'

interface PropsI extends Omit<DialogProps, 'open' | 'onClose'>, PropsWithChildren {
  product: ProductFeI | undefined
  isOpen: boolean
  close: () => void
  refetch: () => void
}

const EditProductModal = ({ refetch, close, product, isOpen, ...rest }: PropsI) => {
  const productObj = transformFromFeToFormData(product)

  const { mutateAsync, isPending: isUpdatingProduct } = useUpdateProduct()
  const enableUploadFile = useUploadFile()

  const onSubmit: SubmitHandler<ProductFormUpdate> = useCallback(
    async (data) => {
      console.log(data.file)
      const imageUrl = data.file ? createFullPathStorageFile(data.file.name) : ''

      await mutateAsync({
        productId: product?.id ?? 0,
        productToUpdate: { ...data, image: imageUrl },
      }).then(() => {
        if (data.file) {
          enableUploadFile(true, data.file)
        }
        close()
        refetch()
      })
    },
    [close, enableUploadFile, mutateAsync, product?.id, refetch]
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
