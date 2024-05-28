import { FlexCard } from '@/common/styles/styled-components'
import { useTextField } from '@/common/utils/hooks/useValidField'
import { TextField, Typography } from '@mui/material'
import { useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import { toast } from 'react-toastify'
import { PrimaryButton, Spinner } from '@/common/components'
import { useMagicLink, useMagicLinkAdminByEmail } from '@/api/hooks/usersHooks'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emailSentMessage = 'This email is already sent!'
interface PropsI {
  disableSentButton: boolean
  refetch: () => void
  emailList: string[]
}

const InvitationPage = ({ disableSentButton, refetch, emailList }: PropsI) => {
  const { value, error, helperText, handleChange, validate, resetState, setError, setHelperText } = useTextField({
    fieldRegex: emailRegex,
    errorMessage: 'Invalid email address!',
  })

  const [isLoading, setIsLoading] = useState(false)
  const { mutateAsync: sendMagicLinkHandler } = useMagicLinkAdminByEmail()

  // const sendMagicLinkHandler = useMagicLinkAdminByEmail()

  const handleDuplicateEmail = () => {
    setError(true)
    setHelperText(emailSentMessage)
    toast.error(emailSentMessage)
  }

  const handleBlur = () => {
    validate()
  }

  const sendInvitationLinkHandler = async () => {
    const checkEmailBoolean = emailList.some((item) => item === value)
    if (checkEmailBoolean) {
      handleDuplicateEmail()
    } else {
      setIsLoading(true)
      const result = await sendMagicLinkHandler({ email: value, isEmailValid: !error })
      if (result) {
        const { error } = result
        if (error) {
          toast.error(`${error.message}`)
          setIsLoading(false)
          return
        }

        toast.success(`You send an invitation to ${value}`)
        resetState()
        refetch()
      } else {
        toast.error('Email is invalid!')
      }
    }

    setIsLoading(false)
  }

  return (
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

      <PrimaryButton
        text={'Invite'}
        icon={isLoading ? <Spinner size={'1.2rem'} /> : <SendIcon />}
        isDisabled={error || value.length === 0 || isLoading || disableSentButton}
        onClickHandler={sendInvitationLinkHandler}
      />
    </FlexCard>
  )
}

export default InvitationPage
