import { useState } from 'react'

interface EmailFieldState {
  value: string
  error: boolean
  helperText: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  validate: () => boolean
}

const useEmailField = (): EmailFieldState => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState('')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setValue(newValue)
    if (error) {
      validate(newValue)
    }
  }

  const validate = (email: string = value): boolean => {
    if (emailRegex.test(email)) {
      setError(false)
      setHelperText('')
      return true
    } else {
      setError(true)
      setHelperText('Invalid email address.')
      return false
    }
  }

  return {
    value,
    error,
    helperText,
    handleChange,
    validate,
  }
}

export { useEmailField }
