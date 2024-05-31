import { FlexBox } from '@/common/styles/styled-components'
import { PasswordValidatorI } from '@/common/utils/hooks/useValidField'
import { Check, Close } from '@mui/icons-material'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

interface PropsI {
  validation: PasswordValidatorI
}

const ValidatorsList = ({ validation }: PropsI) => {
  return (
    <FlexBox>
      <List>
        <ListItem disablePadding>
          <ListItemIcon>
            {validation.length.value ? <Check style={{ color: 'green' }} /> : <Close style={{ color: 'red' }} />}
          </ListItemIcon>
          <ListItemText primary={validation.length.errorMessage} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            {validation.uppercase.value ? <Check style={{ color: 'green' }} /> : <Close style={{ color: 'red' }} />}
          </ListItemIcon>
          <ListItemText primary={validation.uppercase.errorMessage} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            {validation.number.value ? <Check style={{ color: 'green' }} /> : <Close style={{ color: 'red' }} />}
          </ListItemIcon>
          <ListItemText primary={validation.number.errorMessage} />
        </ListItem>
      </List>
    </FlexBox>
  )
}

export default ValidatorsList
