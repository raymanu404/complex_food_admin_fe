import { ButtonProps, Button as ButtonMui } from '@mui/material'

interface PropsI extends Omit<ButtonProps, 'disabled' | 'onClick'> {
  text: string
  icon?: React.ReactNode
  onClickHandler?: () => void
  isDisabled?: boolean
}

const Button = ({ onClickHandler, text, icon, isDisabled, ...rest }: PropsI) => {
  return (
    <ButtonMui variant="contained" onClick={onClickHandler} disabled={isDisabled} startIcon={icon} {...rest}>
      {text}
    </ButtonMui>
  )
}

export default Button
