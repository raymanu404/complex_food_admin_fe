import { Accordion, AccordionDetails, AccordionSummary, Box, BoxProps, Skeleton, useTheme } from '@mui/material'
import { PropsWithChildren } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface PropsI extends PropsWithChildren {
  title: string | React.ReactNode
  parentProps?: BoxProps
  isLoading?: boolean
}

const ParentContainer = ({ title, children, parentProps, isLoading }: PropsI) => {
  const theme = useTheme()

  return (
    <Box {...parentProps}>
      {isLoading ? (
        <Skeleton sx={{ width: '96%', height: '110px' }} animation="wave" />
      ) : (
        <Accordion sx={{ width: '90vw' }} defaultExpanded>
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
      )}
    </Box>
  )
}

export default ParentContainer
