import { RO_CURRENCY } from '@/common/utils/constants'
import { forwardRef } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

interface CustomProps extends NumericFormatProps {
  onChange?: (event: { target: { name: string; value: string } }) => void
  name: string
}

const NumericInput = forwardRef<NumericFormatProps, CustomProps>(function NumericInput(props, ref) {
  const { onChange, ...other } = props

  return (
    <NumericFormat
      getInputRef={ref}
      onValueChange={(values) => {
        if (onChange) {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          })
        }
      }}
      decimalScale={2}
      decimalSeparator="."
      suffix={` ${RO_CURRENCY}`}
      {...other}
    />
  )
})

export default NumericInput
