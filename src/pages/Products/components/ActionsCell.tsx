import { Box, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { ProductFeI } from '@/api/interfaces/products'
import { MRT_Row } from 'material-react-table'

interface PropsI {
  row: MRT_Row<ProductFeI>
  openEditModal: (product: ProductFeI) => void
  openDeleteModal: (productId: number) => void
}
const ActionsCell = ({ row, openEditModal, openDeleteModal }: PropsI) => {
  const { original: data } = row
  return (
    <>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <IconButton
          onClick={() => {
            openEditModal(data)
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            openDeleteModal(data.id)
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </>
  )
}

export default ActionsCell
