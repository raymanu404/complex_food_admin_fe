import { useState } from 'react'

interface EmailFieldState {
  value: string
  error: boolean
  helperText: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  validate: () => boolean
}

interface PropsI {
  fieldRegex?: RegExp
  errorMessage?: string
}

const useTextField = ({ fieldRegex, errorMessage = 'Invalid field.' }: PropsI): EmailFieldState => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setValue(newValue)
    if (error) {
      validate(newValue)
    }
  }

  const validate = (field: string = value): boolean => {
    if (fieldRegex)
      if (fieldRegex.test(field)) {
        setError(false)
        setHelperText('')
        return true
      } else {
        setError(true)
        setHelperText(errorMessage)
        return false
      }

    return true
  }

  return {
    value,
    error,
    helperText,
    handleChange,
    validate,
  }
}

export { useTextField }
