import { Theme } from '@mui/material'

export const cardSx = (theme: Theme) => ({
  backgroundColor: theme.customPalette.utility.background,
  borderRadius: '20px',
  boxShadow: '0px 2px 4px 0px rgba(0,0,0, .15)',
  flexGrow: 1,
})
