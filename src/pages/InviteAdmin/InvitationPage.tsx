import { FlexBoxCentered, FlexCard } from '@/common/styles/styled-components'
import { useTextField } from '@/common/utils/hooks/useValidField'
import { useAuthContext } from '@/contexts/AuthContext'
import { Button, TextField, Typography } from '@mui/material'
import { toast } from 'react-toastify'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const InvitationPage = () => {
  const { value, error, helperText, handleChange, validate } = useTextField({
    fieldRegex: emailRegex,
    errorMessage: 'Invalid email address!',
  })
  const { sendMagicLinkHandler } = useAuthContext()

  const handleBlur = () => {
    validate()
  }

  const sendInvitationLinkHandler = async () => {
    const result = await sendMagicLinkHandler(value, !error)
    if (result) {
      const { data, error } = result
      if (error) {
        toast.error(`${error.message}`)
      }
    } else {
      toast.error('Email is invalid!')
    }
  }

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

        <Button onClick={sendInvitationLinkHandler} disabled={error || value.length === 0}>
          Invite
        </Button>
      </FlexCard>
    </FlexBoxCentered>
  )
}

export default InvitationPage
