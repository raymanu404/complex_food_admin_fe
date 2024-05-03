import { Box, IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { ProductFeI } from '@/api/interfaces/products'
import { MRT_Row, MRT_TableInstance } from 'material-react-table'

interface PropsI {
  row: MRT_Row<ProductFeI>
  table: MRT_TableInstance<ProductFeI>
}
const ActionsCell = ({ row, table }: PropsI) => {
  return (
    <>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit" onClick={() => table.setEditingRow(row)}>
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
