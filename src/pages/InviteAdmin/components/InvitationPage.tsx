import { FlexCard } from '@/common/styles/styled-components'
import { useTextField } from '@/common/utils/hooks/useValidField'
import { TextField, Typography } from '@mui/material'
import { useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import { toast } from 'react-toastify'
import { PrimaryButton, Spinner } from '@/common/components'
import { LOCAL_STORAGE_EMAIL_ARRAY_KEY } from '@/common/utils/constants'
import { saveArrayToLocalStorage } from '@/common/utils/helpers'
import { useMagicLinkAdminByEmail } from '@/api/hooks/adminHooks'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface PropsI {
  emailList: string[]
  setEmailList: React.Dispatch<React.SetStateAction<string[]>>
}

const InvitationPage = ({ emailList, setEmailList }: PropsI) => {
  const { value, error, helperText, handleChange, validate, resetState } = useTextField({
    fieldRegex: emailRegex,
    errorMessage: 'Invalid email address!',
  })

  const [isLoading, setIsLoading] = useState(false)

  const sendMagicLinkHandler = useMagicLinkAdminByEmail()

  const handleBlur = () => {
    validate()
  }

  const sendInvitationLinkHandler = async () => {
    setIsLoading(true)
    const result = await sendMagicLinkHandler(value, !error)
    if (result) {
      const { error } = result
      if (error) {
        toast.error(`${error.message}`)
        return
      }

      toast.success(`You send an invitation to ${value}`)
      const newArray = [...emailList, value]
      setEmailList(newArray)
      saveArrayToLocalStorage(LOCAL_STORAGE_EMAIL_ARRAY_KEY, newArray)
      resetState()
    } else {
      toast.error('Email is invalid!')
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

      {/* TODO: disable this button if user input email is founded in list of emails, put toasts messages */}
      {/* TODO: disable this button if the user already sent email to, wait 60 seconds for next invitation ??? */}
      <PrimaryButton
        text={'Invite'}
        icon={isLoading ? <Spinner size={'1.2rem'} /> : <SendIcon />}
        isDisabled={error || value.length === 0 || isLoading}
        onClickHandler={sendInvitationLinkHandler}
      />
    </FlexCard>
  )
}

export default InvitationPage
