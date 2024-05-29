import { useState } from 'react'

interface FieldState {
  value: string
  error: boolean
  helperText: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  validate: () => boolean
  resetState: () => void
  setError: React.Dispatch<React.SetStateAction<boolean>>
  setHelperText: React.Dispatch<React.SetStateAction<string>>
}

interface PropsI {
  fieldRegex?: RegExp
  errorMessage?: string
}

interface ValidatorI {
  value: boolean
  readonly errorMessage?: string
}

interface PasswordValidatorI {
  length: ValidatorI
  uppercase: ValidatorI
  number: ValidatorI
}

const defaultValidator: PasswordValidatorI = {
  length: {
    value: false,
    errorMessage: 'At least 8 characters',
  },
  uppercase: {
    value: false,
    errorMessage: 'At least 1 uppercase letter',
  },
  number: {
    value: false,
    errorMessage: 'At least 1 number',
  },
}

const useTextField = ({ fieldRegex, errorMessage = 'Invalid field.' }: PropsI): FieldState => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setValue(newValue)
    validate(newValue)
  }

  const validate = (field: string = value): boolean => {
    if (fieldRegex) {
      if (fieldRegex.test(field)) {
        setError(false)
        setHelperText('')
        return true
      } else {
        setError(true)
        setHelperText(errorMessage)
        return false
      }
    }

    setError(false)
    setHelperText('')
    return true
  }

  const resetState = () => {
    setValue('')
    setError(false)
    setHelperText('')
  }

  return {
    value,
    error,
    helperText,
    handleChange,
    validate,
    resetState,
    setError,
    setHelperText,
  }
}

const usePasswordField = () => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [validation, setValidation] = useState<PasswordValidatorI>(defaultValidator)

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setPassword(value)
    validatePassword(value)
  }

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const validatePassword = (value: string) => {
    const lengthValue = value.length >= 8
    const upperCaseValue = /[A-Z]/.test(value)
    const numberValue = /\d/.test(value)

    setValidation((prev) => ({
      length: {
        ...prev.length,
        value: lengthValue,
      },
      number: {
        ...prev.number,
        value: numberValue,
      },
      uppercase: {
        ...prev.uppercase,
        value: upperCaseValue,
      },
    }))
  }

  return {
    password,
    showPassword,
    validation,
    handlePasswordChange,
    handleClickShowPassword,
  }
}

export type { PasswordValidatorI, ValidatorI }
export { useTextField, usePasswordField }
