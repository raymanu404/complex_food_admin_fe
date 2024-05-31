import { useUpdateAdminPassword } from '@/api/hooks/usersHooks'
import { FlexBoxCentered, FlexCard } from '@/common/styles/styled-components'
import { useRedirect } from '@/common/utils/hooks/useRedirect'
import { ValidatorI, usePasswordField } from '@/common/utils/hooks/useValidField'
import { useAuthContext } from '@/contexts/AuthContext'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import ValidatorsList from './ValidatorsList'

const errorsMessages = {
  NOT_EQUAL: 'Passwords are different!',
}

const ConfirmAccount = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const {
    password,
    handleClickShowPassword,
    handlePasswordChange,
    showPassword,
    validation: validationPassword,
  } = usePasswordField()
  const {
    password: rePassword,
    handlePasswordChange: handleChangeRePassword,
    showPassword: showRePassword,
    handleClickShowPassword: handleClickShowRePassword,
    validation: validationRePassword,
  } = usePasswordField()

  const { navigateToHome } = useRedirect()

  const { mutateAsync, isPending } = useUpdateAdminPassword()
  const { session } = useAuthContext()

  const handlePasswordOnBlur = () => {
    setErrorMessage('')
  }

  const handleRePasswordOnBlur = () => {
    setErrorMessage('')
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const areEqualPasswords = useMemo(() => password === rePassword, [password, rePassword])

  const isCleanPassword = useMemo(() => {
    const validationPassArray = Object.values(validationPassword) as ValidatorI[]
    const validationRePassArray = Object.values(validationRePassword) as ValidatorI[]

    const isValidPassword = validationPassArray.every((x) => x.value)
    const isValidRePassword = validationRePassArray.every((x) => x.value)

    if (isValidPassword && isValidRePassword && password.length > 0 && rePassword.length > 0) {
      return true
    }

    return false
  }, [password.length, rePassword.length, validationPassword, validationRePassword])

  const signUpHandler = async () => {
    if (!areEqualPasswords) {
      setErrorMessage(errorsMessages.NOT_EQUAL)
      toast.error(errorsMessages.NOT_EQUAL)

      return
    }

    if (isCleanPassword && areEqualPasswords) {
      const id = session?.user.id ?? ''
      const result = await mutateAsync({ newPassword: password, userId: id })
      if (result) {
        const { error, data } = result

        if (data) {
          toast.success(`You have confirmed your account!`)
          navigateToHome()
        }

        if (error) {
          toast.error(`${error.message}`)
        }
      } else {
        toast.error('Something went wrong!')
      }
    }
  }
  return (
    <FlexBoxCentered>
      <FlexCard
        sx={{
          width: '30rem',
          padding: '20px 20px',
          gap: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'auto',
        }}
      >
        <Typography variant="h4">Confirm your account</Typography>

        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordOnBlur}
            name={'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {!showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <ValidatorsList validation={validationPassword} />
        </FormControl>

        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            label="Confirm Password"
            value={rePassword}
            onChange={handleChangeRePassword}
            onBlur={handleRePasswordOnBlur}
            type={showRePassword ? 'text' : 'password'}
            name={'re_password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle re-password visibility"
                  onClick={handleClickShowRePassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {!showRePassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <ValidatorsList validation={validationRePassword} />
        </FormControl>
        <Typography id="component-helper-text-pasword" sx={(theme) => ({ color: theme.palette.error.main })}>
          {errorMessage}
        </Typography>

        <Button onClick={signUpHandler} disabled={isPending || !isCleanPassword}>
          Sign up
        </Button>
      </FlexCard>
    </FlexBoxCentered>
  )
}

export default ConfirmAccount
