import { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { SecondaryCard } from '@/common/styles/styled-components'

interface PropsI {
  emailList: string[]
}

const EmailListContainer = ({ emailList }: PropsI) => {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(false)

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded)
  }

  return (
    <SecondaryCard sx={{ width: '30rem', padding: '20px 20px' }}>
      <Accordion
        expanded={expanded}
        disabled={emailList.length === 0}
        onChange={handleExpansion}
        slotProps={{ transition: { timeout: 400 } }}
        sx={{
          '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
          '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
          backgroundColor: theme.customPalette.primary.lightest,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography>List of email already sent</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense={true}>
            {emailList.map((item) => {
              return (
                <ListItem key={item}>
                  <ListItemText primary={`${item}`} />
                </ListItem>
              )
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    </SecondaryCard>
  )
}

export default EmailListContainer
