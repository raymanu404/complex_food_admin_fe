import { Accordion, AccordionDetails, AccordionSummary, Box, BoxProps, useTheme } from '@mui/material'
import { PropsWithChildren } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface PropsI extends PropsWithChildren {
  title: string | React.ReactNode
  parentProps?: BoxProps
}

const ParentContainer = ({ title, children, parentProps }: PropsI) => {
  const theme = useTheme()
  return (
    <Box {...parentProps}>
      <Accordion sx={{ width: '90vw' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{ backgroundColor: theme.customPalette.utility.background }}
        >
          {title}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default ParentContainer
