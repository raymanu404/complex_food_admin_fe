import { Accordion, AccordionDetails, AccordionSummary, useTheme } from '@mui/material'
import { PropsWithChildren } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface PropsI extends PropsWithChildren {
  title: string | React.ReactNode
}

const ParentContainer = ({ title, children }: PropsI) => {
  const theme = useTheme()
  return (
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
  )
}

export default ParentContainer
