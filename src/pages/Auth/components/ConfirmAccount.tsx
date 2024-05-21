import { FlexBoxCentered, FlexCard } from '@/common/styles/styled-components'
import { useTextField } from '@/common/utils/hooks/useValidField'
import { useAuthContext } from '@/contexts/AuthContext'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material'
import { useState } from 'react'

interface ShowPassword {
  password: boolean
  re_password: boolean
}

enum InputType {
  password = 'password',
  re_password = 're_password',
}

const ConfirmAccount = () => {
  const [showPassword, setShowPassword] = useState<ShowPassword>({
    password: false,
    re_password: false,
  })

  const {
    value: password,
    error: errorPassword,
    helperText: helperTextPassword,
    handleChange: handleChangePassword,
    validate: validatePassword,
  } = useTextField({})
  const {
    value: rePassword,
    error: errorRePassword,
    helperText: helperTextRePassword,
    handleChange: handleChangeRePassword,
    validate: validateRePassword,
  } = useTextField({})

  const { updateUserPassword } = useAuthContext()

  const handlePasswordOnBlur = () => {
    validatePassword()
  }

  const handleRePasswordOnBlur = () => {
    validateRePassword()
  }

  const handleClickShowPassword = (type: InputType) => {
    const typeString = InputType[type] as string
    console.log(InputType.password.toString())
    const booleanValue = typeString === InputType.password.toString() ? showPassword.password : showPassword.re_password
    setShowPassword((prev) => ({ ...prev, [typeString]: !booleanValue }))
  }
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const signUpHandler = async () => {
    // if (password === rePassword && !errorPassword && !errorRePassword) {
    const result = await updateUserPassword(password)
    console.log(result)
    // }
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

        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" error={errorPassword}>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword.password ? 'text' : 'password'}
            value={password}
            onChange={handleChangePassword}
            onBlur={handlePasswordOnBlur}
            name={'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword(InputType.password)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {!showPassword.password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText id="component-helper-text-password">{helperTextPassword}</FormHelperText>
        </FormControl>

        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" error={errorRePassword}>
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            label="Confirm Password"
            value={rePassword}
            onChange={handleChangeRePassword}
            onBlur={handleRePasswordOnBlur}
            type={showPassword.re_password ? 'text' : 'password'}
            name={'re_password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle re-password visibility"
                  onClick={() => handleClickShowPassword(InputType.re_password)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {!showPassword.re_password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id="component-helper-text-re-password">{helperTextRePassword}</FormHelperText>
        </FormControl>

        <Button onClick={signUpHandler} disabled={errorPassword || errorRePassword}>
          Sign up
        </Button>
      </FlexCard>
    </FlexBoxCentered>
  )
}

export default ConfirmAccount
