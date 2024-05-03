import { Box, IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { ProductFeI } from '@/api/interfaces/products'
import { MRT_Row } from 'material-react-table'

interface PropsI {
  row: MRT_Row<ProductFeI>
}
const ActionsCell = ({ row }: PropsI) => {
  console.log(row.original.id)
  return (
    <>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  )
}

export default ActionsCell
