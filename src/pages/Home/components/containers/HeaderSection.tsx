import { Box, Typography } from '@mui/material'

const HeaderSection = () => {
  return (
    <Box
      sx={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        margin: '16px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        // position: 'fixed',
        // width: '100%',
        // top: 50,
        // left: 0,
        // right: 0,
        padding: '0 20px',
      }}
    >
      <Typography variant="h2">Welcome in ComplexFood Admin Dashboard</Typography>
    </Box>
  )
}

export default HeaderSection
