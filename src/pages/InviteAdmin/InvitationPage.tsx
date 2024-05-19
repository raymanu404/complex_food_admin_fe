import { FlexBoxCentered, FlexCard } from '@/common/styles/styled-components'
import { useEmailField } from '@/common/utils/hooks/useValidField'
import { Box, Button, TextField, Typography } from '@mui/material'

const InvitationPage = () => {
  const { value, error, helperText, handleChange, validate } = useEmailField()

  const handleBlur = () => {
    validate()
  }

  const sendInvitationLinkHandler = () => {}

  return (
    <FlexBoxCentered>
      <FlexCard
        sx={{
          height: '20rem',
          width: '30rem',
          padding: '20px 20px',
          gap: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4">Invite admin by email</Typography>

        <TextField
          label="Email"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={error}
          helperText={helperText}
          fullWidth
        />

        <Button onClick={sendInvitationLinkHandler}>Invite</Button>
      </FlexCard>
    </FlexBoxCentered>
  )
}

export default InvitationPage
