import { ProductFeI } from '@/api/interfaces/products'
import { DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { MRT_EditActionButtons, MRT_Row, MRT_TableInstance } from 'material-react-table'
import { PropsWithChildren } from 'react'

interface PropsI extends PropsWithChildren {
  table: MRT_TableInstance<ProductFeI>
  row: MRT_Row<ProductFeI>
}

const EditProductModal = ({ row, table, children }: PropsI) => {
  return (
    <>
      <DialogTitle variant="h3">Edit Product</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>{children}</DialogContent>
      <DialogActions>
        <MRT_EditActionButtons variant="text" table={table} row={row} />
      </DialogActions>
    </>
  )
}

export default EditProductModal
