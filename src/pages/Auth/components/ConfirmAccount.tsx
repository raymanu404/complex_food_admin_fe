import { FlexBoxCentered, FlexCard } from '@/common/styles/styled-components'
import { useTextField } from '@/common/utils/hooks/useValidField'
import { Button, TextField, Typography } from '@mui/material'

const ConfirmAccount = () => {
  const {
    value: password,
    error: errorPassword,
    helperText: helperTextPassword,
    handleChange: handleChangePassword,
    validate: validatePassword,
  } = useTextField({})
  const {
    value: RePassword,
    error: errorRePassword,
    helperText: helperTextRePassword,
    handleChange: handleChangeRePassword,
    validate: validateRePassword,
  } = useTextField({})

  const handlePasswordOnBlur = () => {
    validatePassword()
  }

  const handleRePasswordOnBlur = () => {
    validateRePassword()
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
        <Typography variant="h4">Confirm your account</Typography>

        <TextField
          label="Password"
          value={password}
          onChange={handleChangePassword}
          onBlur={handlePasswordOnBlur}
          error={errorPassword}
          helperText={helperTextPassword}
          fullWidth
        />

        <TextField
          label="Confirm Password"
          value={RePassword}
          onChange={handleChangeRePassword}
          onBlur={handleRePasswordOnBlur}
          error={errorRePassword}
          helperText={helperTextRePassword}
          fullWidth
        />

        <Button onClick={() => {}} disabled={errorPassword || errorRePassword}>
          Sign up
        </Button>
      </FlexCard>
    </FlexBoxCentered>
  )
}

export default ConfirmAccount
